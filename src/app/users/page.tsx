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
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}