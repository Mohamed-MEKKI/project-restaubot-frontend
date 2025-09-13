'use client'
import Link from 'next/link';
import OrderStatusSelect from '../../components/OrderStatusSelect';
import { useEffect, useState } from 'react';


export default function Orders() {
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
   useEffect(() => {
      setIsLoading(true);
      async function fetchItems() {
        
        try {
        const response = await fetch('http://127.0.0.1:8000/order/get-all/');
        const data = await response.json();
        setOrders(data);
        } catch (error) {
        console.error('Failed to fetch menu items:', error);
        } finally {
        setIsLoading(false);
        }
      }
  
      fetchItems();
    }, []);

    const [clicked, setClicked] = useState(false);
    const [deletingId, setDeletingID] = useState(0);

   useEffect(() => {
      setIsLoading(true);
      async function deleteItems() {
        if (clicked && deletingId) {
          try {
          const response = fetch(`http://127.0.0.1:8000/order/delete/${deletingId.toString()}`, {
            headers:{
              'Content-Type':"application/json"
            },
            method: 'DELETE'
          })
          console.log('Items deleted successfully');
          setClicked(false);
          
          window.location.reload();
          }
          catch(error){
            console.error('Error deleting items:', error);
            throw new Error('Failed to delete items');
          }
          finally {
            setIsLoading(false);
          }
        }else{
          console.log("No ID found");
          setClicked(false);
        }
      }
      deleteItems();
      
    }, [clicked, deletingId]);

 
  return (
    <>
    <div className="min-h-screen bg-orange-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            
              <div className="flex justify-between items-center mb-2">
                <Link href={`/orders/${order.order_id}`} className="space-y-1">
                <span className="text-sm text-gray-500">{order.items}</span>
                </Link>
                <OrderStatusSelect />
              </div>
            
            <h2 className="text-lg font-semibold">{order.image}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {order.name}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-bold">${order.total}</span>
              <span className="text-xs text-gray-400">{order.time}</span>
            </div>
            <div className="flex space-x-4 ml-auto">
                {/* Modify Button */}
                <button
                  
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
                >
                  <i className="fas fa-edit"></i>
                  <span>Modify</span>
                </button>

                {/* Delete Button */}
                <button
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2"
                  onClick={() => {
                    setClicked(true);
                    setDeletingID(order.order_id);
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                  <span>Delete</span>
                </button>
              </div>
          </div>
        ))}
        </div>
    </div>
    </>
  );
}


