import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './main.scss'
import Main from './components/Main';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Staff from './components/Staff';
import AddEmployer from './components/AddEmployer';
import DisplayEmployeeList from './components/DisplayEmployeeList';
import Planner from './components/Planner';
import HolidayEntitlement from './components/HolidayEntitlement';
import CalendarHoliday from './components/CalendarHoliday';


function App() {
return (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/addemployer" element={<AddEmployer />}  />
      <Route path="/displayemployeelist" element={<DisplayEmployeeList />}  />
      <Route path="/holidayentitlement" element={<HolidayEntitlement />}  />
      <Route path="/planner" element={<CalendarHoliday />}  />
    </Routes>
  </Router>
)
}

export default App
