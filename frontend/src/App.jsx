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

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>

      <Route path='/employee_dashboard' element={
        <PrivateRoute >
          <EmployeeDashboard />
        </PrivateRoute>
      }>

      <Route path='' element={<EmployeeHome />}></Route>
      <Route path='/employee_dashboard/employeedetail' element={<EmployeeDetail />}></Route>
      <Route path='/employee_dashboard/applyleave' element={<ApplyLeave />}></Route>
      <Route path='/employee_dashboard/leaverequests' element={<LeaveRequests />}></Route>
      <Route path='/employee_dashboard/editleaverequest/:id' element={<EditLeaveRequest />}></Route>
      </Route> 

      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>

        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/department' element={<Department />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/leavetype' element={< LeaveType />}></Route>
        <Route path='/dashboard/add_leavetype' element={<AddLeaveType />}></Route>
        <Route path='/dashboard/edit_leavetype/:id' element={<EditLeaveType />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App