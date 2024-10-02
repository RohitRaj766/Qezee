import React from 'react'
import AdminSidebar from './adminSidebar/AdminSidebar'
import CreateQuiz from './createQuiz/CreateQuiz'


function AdminDashboard() {
  return (
    <div>
        <AdminSidebar/>
        <CreateQuiz/>
    </div>
  )
}

export default AdminDashboard