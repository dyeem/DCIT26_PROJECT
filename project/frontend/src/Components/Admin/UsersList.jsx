import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import RefreshIcon from '@mui/icons-material/Refresh';
import loading from '../../Assets/Animations/loading.mp4'
import toast, { Toaster } from 'react-hot-toast'

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [toastError, setToastError] = useState(
    {
      message: '',
      isOpen: false,
    },
  );

  useEffect(() => {
    document.title = 'Loop | Manage Users';
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsRefreshing(true);
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
        setIsRefreshing(false);
      }
    };
    fetchUsers(); 
  }, []); 

  const retryFetch = () => {
    setIsRefreshing(true);
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
    .catch((error) => {
      setError(error.message)
      toast.error('Failed to refresh orders.');
    })
    .finally(() => {
        setTimeout(() => setIsRefreshing(false), 1000); 
    });
  }
  const handleDeleteUser = async (userId) => {
    setIsRefreshing(true);
    try {
      const response = await axios.delete(`http://localhost/loop_backend/admin/users/deleteuser.php?id=${userId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        // Filter by user_id instead of id
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
        toast.success('User deleted successfully.');
      } else {
        throw new Error(response.data.message || 'Failed to delete user');
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete user.');
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };


  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      /> 
    {isRefreshing && (
      <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex flex-col items-center justify-center">
          <p className="mb-4 text-lg font-medium text-gray-700">Hang tight, fetching the latest data...</p>
          <video
              autoPlay
              loop
              muted
              playsInline
              className="w-32 h-32 object-contain"
              >
              <source src={loading} type="video/webm" />
          </video>
      </div>
    )}
    <div className="flex items-center justify-center w-full px-12 py-4 text-gray-700 font-roboto">
      <div className="flex flex-col mt-[2rem] w-full max-w-8xl overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">User List</h1>
          <button
            onClick={retryFetch}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 rounded-lg shadow text-white hover:bg-green-600"
          >
            <RefreshIcon fontSize="small" />
            Refresh List
          </button>
        </div>
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
                <tr key={user.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.contact_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dayjs(user.created_at).format('MMMM D, YYYY')}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeleteUser(user.user_id)}
                        className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700 hover:text-white">Delete</button>
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
