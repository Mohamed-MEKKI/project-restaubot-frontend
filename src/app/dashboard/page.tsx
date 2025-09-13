import AdminComponent from '../../components/AdminComponent';

export default function Home() {
  return (
    <>
      <div className="bg-orange-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-[url(/.svg)] bg-center bg-repeat-y ...">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-red-800 font-mono text-5xl text-center">Welcome to <img src="restaubot_logo.png" alt="Restobot Logo" className="inline-block h-12 w-auto ml-2" />🍔</h1>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            
            <div className="bg-yellow-500 p-6 rounded-2xl shadow-md">
              <a className="text-xl font-semibold text-gray-700" href="/orders">Orders</a>
              <p className="mt-2 text-3xl font-bold text-purple-600">312</p>
              <p className="text-sm text-gray-500 mt-1">-1.2% compared to yesterday</p>
            </div>

            <div className="bg-yellow-500 p-6 rounded-2xl shadow-md">       
              <a className="text-xl font-semibold text-gray-700" href="/menu">Menu Management</a>
              
            </div>
            
            <div className="bg-yellow-500 p-6 rounded-2xl shadow-md">       
              <a className="text-xl font-semibold text-gray-700" href="/analytics">Analytics</a>
              <p className="mt-2 text-3xl font-bold text-green-600">$12,450</p>
              <p className="text-sm text-gray-500 mt-1">+8.4% this month</p>
            </div>

            <div className="bg-green-500 p-6 rounded-2xl shadow-md">       
              <a className="text-xl font-semibold " href="https://web.whatsapp.com/">Whatsupp Bot</a>
              <p className="mt-2 text-3xl font-bold ">Use it now !</p>
              <p className="text-sm text-gray-500 mt-1">*100 responsive this month</p>
            </div>

            
            <div className="bg-yellow-500 p-6 rounded-2xl shadow-md">
              <a className="text-xl font-semibold text-gray-700" href="/users">Users</a>
              <p className="mt-2 text-3xl font-bold text-blue-600">1,230</p>
              <p className="text-sm text-gray-500 mt-1">+5% from last week</p>
            </div>
            
            <AdminComponent />
            
          </div>
        </div>
      </div>
    </>
  );
}
