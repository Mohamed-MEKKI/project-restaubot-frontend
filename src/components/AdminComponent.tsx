import { checkRole } from "../utils/roles"
import { ShieldUser } from "lucide-react";

export default async function AdminComponent() {
  const isAdmin = await checkRole('admin')
  
    if (!isAdmin) {
        return null
    }
    return (
        <a 
            href="/administrator" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Admin</h2>
              <ShieldUser className="h-6 w-6 text-gray-700"/>

            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">7,856</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% this month
            </span>
      </a>
    
)}