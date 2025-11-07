import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import Home from './components/homepage';
import Login from './components/LoginSignup';
import Signup from './components/SignupLogin';
import About from './components/about';
import BikeRental from './components/bikeslot';
import CarRental from './components/carslot';
import Vans from './components/vanslot';
import Buses from './components/busslot';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/bikes" element={<BikeRental />} />
        <Route path="/Cars" element={<CarRental />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/buses" element={<Buses />} />

      </Routes>   
    </BrowserRouter>
  )
}

export default App