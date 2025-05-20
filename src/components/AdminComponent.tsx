import { checkRole } from "../utils/roles"

export default async function AdminComponent() {
  const isAdmin = await checkRole('admin')
  
    if (!isAdmin) {
        return null
    }
    return (
    <div className="bg-amber-100 p-6 rounded-2xl shadow-md">
              <a className="text-xl font-semibold text-gray-700" href="/administrator">Admin</a>
              <p className="mt-2 text-3xl font-bold text-yellow-500">7,856</p>
              <p className="text-sm text-gray-500 mt-1">Stable</p>
    </div>
    
)}