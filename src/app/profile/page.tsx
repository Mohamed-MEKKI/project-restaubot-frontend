'use client';
import { useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';


export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  
  const clerk = useClerk();
  useEffect(() => {
    clerk.redirectToUserProfile()
  },);

  
  return (
     <div className="max-w-3xl mx-auto p-6 bg-yellow rounded-2xl shadow-md">
      {/* Header */}
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold text-gray-900">Restaurant Information</h3>
        <p className="mt-1 text-sm text-gray-500">Manage your restaurant's details.</p>
      </div>

      {/* Content */}
      <div className="mt-6 border-t border-gray-100 pt-6 bg-yellow-300">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <svg
              className="animate-spin h-6 w-6 text-red-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="text-gray-600 text-sm">Loading Profile...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {/* Add your profile fields here */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">Profile content here</div>
          </div>
        )}
      </div>
    </div>
  )
}