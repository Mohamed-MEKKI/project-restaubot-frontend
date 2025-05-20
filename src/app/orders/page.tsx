import Link from 'next/link';
import OrderStatusSelect from '../../components/OrderStatusSelect';
import { getData } from '../../api/client';


export default async function Orders() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  const orders = await getData('order')
  /*
  const orders = [
    {
      id: "#ORD1023",
      customer: "John Doe",
      items: ["Burger", "Fries", "Coke"],
      total: "$18.99",
      status: "Preparing",
      time: "10:32 AM",
    },
    // Add more orders here...
  ];*/

 
  return (
    <>
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            
              <div className="flex justify-between items-center mb-2">
                <Link href={`/orders/${order.id}`}>
                <span className="text-sm text-gray-500">{order.id}</span>
                <span className="text-sm text-gray-500">{order.items}</span>
                </Link>
                <OrderStatusSelect />
            
              </div>
            
            <h2 className="text-lg font-semibold">{order.image}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {order.name}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-bold">{order.total}</span>
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
                  //onClick={() => handleDelete(user.user_id)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2"
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


