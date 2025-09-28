'use client';
import UserListSkeleton from '../../components/userListSkeleton';
import { getData } from '../../api/client';
import { useEffect, useState } from 'react';
import { Toast } from 'primereact/toast';
import Image from 'next/image';


export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState<any[]>([]);


  useEffect(() => {
      setIsLoading(true);
      async function fetchItems() {
        
        try {
        const response = await fetch('http://127.0.0.1:8000/user/get-all/');
        const data = await response.json();
        setUsers(data);
        /*if (!users || users.length === 0){
          return (<div className="min-h-screen bg-gray-50 p-8">
                    <h1 className="text-xl font-bold mb-4">No Users Found</h1>
                    <p className="text-gray-500">There are currently no users available.</p>
                  </div>
          )
        }*/
        } catch (error) {
        console.error('Failed to fetch menu items:', error);
        } finally {
        setIsLoading(false);
        }
      }
  
      fetchItems();
    }, []);

  useEffect(() => {
      setIsLoading(true);
      async function deleteItems() {
        if (clicked) {
          try {
            const response = fetch('http://127.0.0.1:8000/menuitem/delete/', {
              headers:{
                'Content-Type':"application/json"
              },
              method: 'DELETE'
            })
            console.log('Items deleted successfully');
            setChecked(false);
            setClicked(false);
            // Optionally, refetch items to update the list
            //await fetchItems();
            window.location.reload();
          }
          catch(error){
            console.error('Error deleting items:', error);
            throw new Error('Failed to delete items');
            /*toast.current?.show({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete items',
              life: 3000
            });*/
          }
          finally {
            setIsLoading(false);
          }
        }
      }
      deleteItems();
    }, [clicked]);
      

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
              <Image
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