import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

import Loader from '../components/Loader'
import Login from './Login'
import { useSelector } from 'react-redux'

function Layout() {
    const { user, loading } = useSelector(state => state.auth)
    if (loading) {
        return <Loader />
    }
   return (
        <div>
            {
                user ? (
                    // If user is authenticated, show Navbar and render child routes
                    <div className='min-h-screen bg-gray-50'>
                        <Navbar />
                        <Outlet />
                    </div>
                ) : (
                    <Login />
                )
            }

        </div>
    )
}

export default Layout
