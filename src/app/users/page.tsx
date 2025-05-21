import UserListSkeleton from '../../components/userListSkeleton';
import { getData } from '../../api/client';

export default async function UsersPage() {
  
  let users = await getData('user');
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      

  return (

    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      {!users ? <UserListSkeleton /> : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.user_id}
              className="p-4 bg-white rounded-xl shadow flex items-center"
            >
              <img
                src={`http://localhost:8000${user.image}`}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}