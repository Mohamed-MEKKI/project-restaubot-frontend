'use client'

import { FormEvent, useEffect, useState } from "react"

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const requiredFields = ['name', 'email', 'message'];
    
    const validate = (formData) => {
        return requiredFields.reduce((acc, field) => {
        const value = formData.get(field);
        if (!value) {
            acc[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
        return acc;
        }, {});
    };


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const validationErrors = validate(formData);
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setIsLoading(false);
          return;
        }
    
        setErrors({}); // Clear errors if all fields are valid
    
        try {
          const response = await fetch('http://127.0.0.1:8000/restaurants/contact/', {
            method: 'POST',
            body: formData,
          });
    
        } catch (error) {
          //showToast('Error', 'Network or server error');
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    return (
    <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Send
                {isLoading ? 'Submitting...' : 'Submit'}

            </button>
        </form>
    </div>
    )
}