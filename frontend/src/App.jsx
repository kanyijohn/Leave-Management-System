import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Department from './Components/Department'
import Profile from './Components/Profile'
import AddDepartment from './Components/AddDepartment'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import LeaveType from './Components/LeaveType'
import AddLeaveType from './Components/AddLeaveType'
import EditLeaveType from './Components/EditLeaveType'
import EmployeeDashboard from './Components/EmployeeDashboard'
import ApplyLeave from './Components/ApplyLeave'
import LeaveRequests from './Components/LeaveRequests'
import EmployeeHome from './Components/EmployeeHome'
import EditLeaveRequest from './Components/EditLeaveRequest'
import LeaveManagement from './Components/LeaveManagement'
import Approve from './Components/Approve'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/employee_login' element={<EmployeeLogin />} />

        <Route path="/employee_dashboard" element={
          <PrivateRoute>
            <EmployeeDashboard />
          </PrivateRoute>
        }>
          <Route index element={<EmployeeHome />} />
          <Route path="employeedetail" element={<EmployeeDetail />} />
          <Route path="applyleave" element={<ApplyLeave />} />
          <Route path="leaverequests" element={<LeaveRequests />} />
          <Route path="editleaverequest/:id" element={<EditLeaveRequest />} />
        </Route>

        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route index element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="department" element={<Department />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add_department" element={<AddDepartment />} />
          <Route path="add_employee" element={<AddEmployee />} />
          <Route path="edit_employee/:id" element={<EditEmployee />} />
          <Route path="leavetype" element={<LeaveType />} />
          <Route path="add_leavetype" element={<AddLeaveType />} />
          <Route path="edit_leavetype/:id" element={<EditLeaveType />} />
          <Route path="leavemanagement" element={<LeaveManagement />} />
          <Route path="approve" element={<Approve />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App