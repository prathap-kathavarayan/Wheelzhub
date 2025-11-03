import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/LoginSignup'
import Signup from './components/SignupLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>   
    </BrowserRouter>
  )
}

export default App