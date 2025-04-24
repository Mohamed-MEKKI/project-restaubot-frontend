export default function Analytics() {
  return (
        <>
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              
              <div className="bg-amber-600 p-6 rounded-2xl shadow-md">
                <a className="text-xl font-semibold text-gray-700" >Orders</a>
                <p className="mt-2 text-3xl font-bold text-purple-600">312</p>
                <p className="text-sm text-gray-500 mt-1">-1.2% compared to yesterday</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <a className="text-xl font-semibold text-gray-700">Customers</a>
                <p className="mt-2 text-3xl font-bold text-blue-600">1,230</p>
                <p className="text-sm text-gray-500 mt-1">+5% from last week</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">       
                <a className="text-xl font-semibold text-gray-700" >Revenues</a>
                <p className="mt-2 text-3xl font-bold text-green-600">$12,450</p>
                <p className="text-sm text-gray-500 mt-1">+8.4% this month</p>
              </div>
              
            </div>
          </div>
        </div>
      </>
    
  );
}