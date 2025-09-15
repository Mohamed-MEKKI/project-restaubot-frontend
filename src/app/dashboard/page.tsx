import AdminComponent from '../../components/AdminComponent';
import { MessageCircleIcon, ShoppingCartIcon, Hamburger, ChartNoAxesCombined } from "lucide-react";
export default function Home() {
  return (
    <>
      <div className="bg-orange-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-[url(/.svg)] bg-center bg-repeat-y ...">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-red-800 font-mono text-5xl text-center">Welcome to <img src="restaubot_logo.png" alt="Restobot Logo" className="inline-block h-12 w-auto ml-2" />🍔</h1>

          </div>
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

            <a 
            href="/menu" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Menu Management</h2>
              <Hamburger className="h-6 w-6 text-gray-700"/>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">312</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% vs yesterday
            </span>
          </a>
            <a 
            href="/orders" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">312</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% vs yesterday
            </span>
          </a>
            
            <a 
            href="/analytics" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Analytics</h2>
              <ChartNoAxesCombined className="h-6 w-6 text-gray-700" />

            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">$12,450</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% this month
            </span>
          </a>

            <a 
            href="https://web.whatsapp.com/" 
            className="block bg-green-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Whatsapp Ai chatBot</h2>
              <MessageCircleIcon className="h-6 w-6" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">Use it now !</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 100 responsive this month
            </span>
          </a>
            
            <AdminComponent />
            
          </div>
        </div>
      </div>
    </>
  );
}
