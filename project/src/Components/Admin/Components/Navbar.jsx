import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='w-full p-10'>
        <div className="w-full flex flex-row gap-x-52 mb-14">
            <p>
                Loop
            </p>
            <div className="w-full flex flex-row justify-between">
                <p>Dashboard</p>
                <div className="flex flex-row gap-x-4">
                    <img src="" alt="status" />
                    <p>Admin Name</p>
                    <img src="" alt="admin img" />
                </div>
            </div>
        </div>
        <p>
            <NavLink to='/admin'>Overview</NavLink>
        </p>
        <p>
            <NavLink to='manage-product'>Product</NavLink>
        </p>
        <p>
            <NavLink to='manage-user'>User</NavLink>
        </p>
        <p>
            <NavLink to='admin-dashboard'>Orders</NavLink>
        </p>
        <p>
            <NavLink to='admin-dashboard'>Reports</NavLink>
        </p>
        <p>
            <NavLink to='admin-dashboard'>Messages</NavLink>
        </p>
        <p>
            <NavLink to='admin-dashboard'>Settings</NavLink>
        </p>
        <p>
            <NavLink to='admin-dashboard'>Logout</NavLink>
        </p>
    </nav>
  )
}
