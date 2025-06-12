import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Loop | Manage Users';
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost/loop_backend/admin/users/fetchusers.php', {
          withCredentials: true, 
        });

        if (response.data.success) {
          setUsers(response.data.users); 
          console.log(response.data.users);
        } else {
          throw new Error(response.data.message || 'Failed to fetch users');
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); 
  }, []); 

  const retryFetch = () => {
    setLoading(true);
    setError(null);

    axios.get('http://localhost/loop_backend/admin/users/fetchusers.php', {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    })
    .catch((error) => setError(error.message))
    .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-800">Error: {error}</p>
        <button
          onClick={retryFetch}
          className="px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
    
    <div className="flex items-center justify-center w-full px-12 py-4 text-gray-700 font-roboto">
      <div className="flex flex-col mt-[2rem] w-full max-w-8xl overflow-x-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs font-semibold text-white uppercase bg-[#7E62FF]">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Contact Number</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.contact_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dayjs(user.created_at).format('MMMM D, YYYY')}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700 hover:text-white">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
