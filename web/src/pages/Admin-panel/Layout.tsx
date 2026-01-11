import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const Layout = () => {
  return (
    
        <div className='flex h-screen'>
            <Sidebar/>
            <main className='flex-1'>
                <Outlet/>
                
            </main>
        </div>
    
  )
}

export default Layout