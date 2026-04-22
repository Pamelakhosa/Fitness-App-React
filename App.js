import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ExerciseLibrary from './components/ExerciseLibrary';
import WorkoutPlanner from './components/WorkoutPlanner';
import PlannerCalendar from './components/Calendar';

function App() {
  return (
    <BrowserRouter>  {/* Wrap everything inside BrowserRouter */}
      <Routes>
        {/* Use Home as a layout or main page */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exerciselibrary" element={<ExerciseLibrary />} />
        <Route path="/workoutplanner" element={<WorkoutPlanner />} />
        <Route path="/calendar" element={<PlannerCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
