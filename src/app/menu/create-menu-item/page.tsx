'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';


export default function MenuItemForm({ params }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  //const order = getItem('1')


  //if (!order) return <p className="p-8">Loading order...</p>;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true) // Set loading to true when the request starts
    console.log('Submitting form...')
    console.log(event.currentTarget)
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('http://127.0.0.1:8000/menuitem/create/', {
        method: 'POST',
        body: formData,
      })
      console.log(response)
      // Handle response if necessary
      const data = await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }

  return (


    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Create new menu item</h1>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={onSubmit}>
        
        <label className="bg-white-600 block text-sm font-medium text-gray-700">Name</label> 
        <input type="text" name="name" placeholder='Menu item name' /><br />
        <label className="bg-white-600 block text-sm font-medium text-gray-700">Items</label>
        <input type="text" name="items" placeholder='Items' /><br />
        <label className="bg-white-600 block text-sm font-medium text-gray-700">Price</label>
        <input type="text" name="price" placeholder='Price' /><br />  
        <label className="bg-white-600 block text-sm font-medium text-gray-700">Image</label>
        <input type="text" name="image" placeholder='Image' /><br />
        <label className="bg-white-600 block text-sm font-medium text-gray-700">Cuisine</label>
        <input type="text" name="cuisine" placeholder='Cuisine' /><br />
        <label className="bg-white-600 block text-sm font-medium text-gray-700">Description</label>
        <input type="text" name="description" placeholder='Description' /><br />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" type="submit" disabled={isLoading} onClick={() => router.push('/menu')}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
    </form>
    </div>
  );
}
