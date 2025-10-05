'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent, use, useState } from 'react';
import { getItem } from '../../../api/client';
import { Message } from 'primereact/message';
import { Validate } from '../../../utils/utilsFunctions';


export default function SingleMenuItemForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const parm  = useParams<{menuItemId: string}>();

  const requiredFields = ['name', 'cuisine', 'price', 'inventory_status', 'description'];

  const validate = (formData) => Validate(requiredFields, formData);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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

      const response = await fetch(`http://127.0.0.1:8000/menuitem/update/${parm.menuItemId}`, {
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
    <div className="bg-orange-100 min-h-screen p-6 flex justify-center items-start">
      <form
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md space-y-6"
        onSubmit={onSubmit}
        noValidate
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Edit Menu Item         
          <span className="text-blue-600">{parm.menuItemId}</span>
        </h1>

        {['name', 'cuisine', 'price', 'inventory_status', 'description'].map((field) => (
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
            {errors[field] && <Message severity="error" text={errors[field]} />}
          </div>
          
        ))}
           <label
              htmlFor={'image'}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              image
            </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          placeholder='Upload image'
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors['image'] && <Message severity="error" text={errors['image']} />}

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
