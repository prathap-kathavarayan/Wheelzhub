import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import Home from './components/homepage';
import Login from './components/LoginSignup';
import Signup from './components/SignupLogin';
import About from './components/about';
import Bikes from './components/bikeslot';
import CarRental from './components/carslot';
import Vans from './components/vanslot';
import Buses from './components/busslot';
import BikeDetails from './bikedetails';
import Cardetails from './carsdetalis';
import BusDetails from './busdetalis';
import VanDetails from './vansdetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
  <Route path="/bikes" element={<Bikes />} />
  <Route path="/cars" element={<CarRental />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/buses" element={<Buses />} />
  <Route path="/bike-details" element={<BikeDetails />} />
  <Route path="/car-details" element={<Cardetails />} />
  <Route path="/bus-details" element={<BusDetails />} />
  <Route path="/van-details" element={<VanDetails />} />

      </Routes>   
    </BrowserRouter>
  )
}

export default App