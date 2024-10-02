import React from 'react'
import AdminSidebar from './AdminSidebar'
import CreateQuiz from './createQuiz/CreateQuiz'

function adminDashboard() {
  return (
    <>
      <AdminSidebar/>
      <CreateQuiz/>
    </>
  )
}

export default adminDashboard