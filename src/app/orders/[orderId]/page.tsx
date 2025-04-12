'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getItem } from '../../../api/client';

export default function OrderForm({ params }) {
  const { id } = params;
  //const [order, setOrder] = useState(null);

  const order = getItem('1')
  
  /*useEffect(() => {
    getItem('1')
    .then((data) => {
      console.log("Fetched order:", data);
      setOrder(data);
    })
    
  }, ['1']);*/

  if (!order) return <p className="p-8">Loading order...</p>;

  return (


    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Order #1</h1>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Table</label>
         
        </div>

        {/* Add more fields here as needed */}

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
}
