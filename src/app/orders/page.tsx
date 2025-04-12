import Link from 'next/link';
import {getData} from '../../api/client'



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
    {
      id: "#ORD1024",
      customer: "Sarah Smith",
      items: ["Pizza", "Salad"],
      total: "$22.50",
      status: "Delivered",
      time: "9:15 AM",
    },
    {
      id: "#ORD104",
      customer: "Semah Smith",
      items: ["Pizza", "Salad"],
      total: "$22.50",
      status: "Pending",
      time: "9:15 AM",
    },
    // Add more orders here...
  ];*/

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Preparing: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Modify
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            <Link href={`/orders/${order.id}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{order.id}</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${statusColor[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </Link>
            <h2 className="text-lg font-semibold">{order.image}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {order.name}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-bold">{order.total}</span>
              <span className="text-xs text-gray-400">{order.time}</span>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}


