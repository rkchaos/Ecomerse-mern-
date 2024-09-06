import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from "./Commponents/Home"
import Login from './Commponents/Login'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ALLnaav from './Commponents/ALLnaav';
import Profile from './pages/Profile';
import Footer from './Commponents/Footer';
import Allproduct from './pages/Allproduct';
import Customer from './pages/Customer';
import Productbyname from './pages/Productbyname';
import Productbyid from './pages/Productbyid';
import Productbyrandom from './pages/Productbyrandom';
import Whishlist from './pages/Whishlist';
import CheckoutStepper from './Commponents/Streeper';
import Myorder from './pages/Myorder';
import Faild from './pages/Faild';
import Invoice from './pages/Invoice';



function App() {
  return (
    <>
      <ALLnaav />

      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ALLproducts' element={<Allproduct />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/products/:name' element={<Productbyname />} />
          <Route path='/products/by/:id' element={<Productbyid />} />
          <Route path='/products/byrandom/:id' element={<Productbyrandom />}/>
          <Route path='/like-products' element={<Whishlist />} />
          <Route path='/Cart' element={<CheckoutStepper />} />
          <Route path='//My-order' element={<Myorder />} />
          <Route path='/payemtfaild'element={<Faild/>}/>
          <Route path='/order/:id'element={<Invoice/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App