'use client';
import { useRouter } from 'next/navigation';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormEvent, useEffect, useState } from 'react';

export default function OrderForm({ params }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState({})
  const toastRef = useRef(null)
  const router = useRouter()
  
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
    event.preventDefault()
    setIsLoading(true) // Set loading to true when the request starts
    console.log('Submitting form...')
    console.log(event.currentTarget)
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('http://127.0.0.1:8000/user/update/1', {
        method: 'PUT',
        body: formData,
      })
      
      if (response.ok) {
        const data = await response.json();
        router.push('/user?toast=success');
      } else {
        showToast('Submission Failed', 'Server responded with an error.');
      }
    } catch (error) {
      setErrors({ general: 'An error occurred while submitting the form.' })
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }

  return (

  <>
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Edit user info</h1>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={onSubmit} noValidate>
        {['name', 'email', 'phone'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        placeholder={`Enter ${field}`}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors[field] && <Message severity="error" text={errors[field]} />}
                    </div>
                  ))}
        
          <Toast ref={toastRef} position="top-right" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" type="submit" disabled={isLoading} onClick={() => router.push('/users')}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
    </form>
    </div>
  </>
  );
}
