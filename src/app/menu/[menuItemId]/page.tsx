'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getItem } from '../../../api/client';

export default function SingleMenuItemForm({ params }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`http://127.0.0.1:8000/menuitem/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      // Optionally handle response
      router.push('/menu'); // move this after successful submit
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center items-start">
      <form
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md space-y-6"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Edit Menu Item #{id}</h1>

        {['name', 'items', 'price', 'cuisine', 'description'].map((field) => (
          <div key={field} className="space-y-1">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {field}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              placeholder={field === 'items' ? 'Comma separated items' : `Enter ${field}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
        <input
          type="file"
          name="image"
          accept="image/*"
          placeholder='Upload image'
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
