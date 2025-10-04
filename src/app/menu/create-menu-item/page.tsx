'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useRef } from 'react';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

export default function MenuItemForm({ params }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);
  const router = useRouter();

  const requiredFields = ['name', 'price', 'cuisine', 'description', 'image'];

  const validate = (formData) => {
    return requiredFields.reduce((acc, field) => {
      const value = formData.get(field);
      if (!value || (field === 'image' && value.size === 0)) {
        acc[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
      return acc;
    }, {});
  };

  const showToast = (summary, detail, severity = 'error') => {
    setTimeout(() => {
      toastRef.current?.show({
        severity,
        summary,
        detail,
      });
    }, 1000);
  };

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
      const response = await fetch('http://127.0.0.1:8000/menuitem/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/menu?toast=success');
      } else {
        showToast('Submission Failed', 'Server responded with an error.');
      }
    } catch (error) {
      showToast('Error', 'Network or server error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
  <>
    <div className="bg-orange-100 min-h-screen p-6">
      <h1 className="text-5xl font-extrabold dark:text-white p-8">Create New Menu Item</h1>

      <div className="w-full max-w-xl bg-orange-400 p-8 rounded-lg shadow-md mx-auto flex flex-col items-center ">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          {['name', 'price', 'cuisine', 'description'].map((field) => (
            <div key={field}>
              <label  className="block text-sm font-semibold text-primary-600 dark:text-primary-400 tracking-wide mb-1 capitalize text-xl">
                {field}
              </label>
              <input
                type="text"
                name={field}
                placeholder={`Enter ${field}`}
                className="mt-1 block w-full text-xl border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors[field] && <Message severity="error" text={errors[field]} />}
            </div>
          ))}

          <div>
            <label  className="block text-sm font-semibold text-primary-600 dark:text-primary-400 tracking-wide mb-1 capitalize text-xl">image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="mt-1 block w-full bg-black text-gray-400 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors['image'] && <Message severity="error" text={errors['image']} />}

          </div>

          <Toast ref={toastRef} position="top-right" />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  </>
  );
}
