import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LogIn from '../LogIn/LogIn.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import Cart from '../Cart/Cart.jsx';
import Navbar from '../Home/Navbar.jsx';
import Home from '../LandingPage/Home.jsx';
import Products from '../LandingPage/Products.jsx';
import Product from '../LandingPage/Product.jsx';
import Footer from '../Home/Footer.jsx';
import Rider from '../LandingPage/Rider.jsx';
import User from '../LandingPage/User.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';
import AdminLoginForm from '../Admin/AdminLoginForm.jsx';
import AdminDashboard from '../Admin/AdminDashboard.jsx';
import AddRiders from '../Admin/AddRiders.jsx';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([
    // Add more orders as needed
  ]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleAdminLogin = () => {
    // Your authentication logic here (e.g., API call to validate admin credentials)
    // For simplicity, we are using a hardcoded admin login check.
    // Replace this with your actual authentication mechanism.
    // if (username === 'admin' && password === 'password') {
      setIsAdminLoggedIn(true);
      setShowNav(false)
      // navigate('admin/dashboard', {replace:true});
    // }
  };

  const addToCart = (product) => {
    // Your existing addToCart logic
  };

  const removeFromCart = (productId) => {
    // Your existing removeFromCart logic
  };

  const clearCart = () => {
    // Your existing clearCart logic
  };

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  };

  return (
    // <BrowserRouter>
      <div className="app-container">
        <Navbar  onSearch={handleSearch} user={user} setUser={setUser} showNav={showNav}/>
        <div className="content-container">
          <Routes>
            {/* Your existing routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  setCartItems={setCartItems}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/products/*"
              element={<Products addToCart={addToCart} searchTerm={searchTerm} />}
            />
            <Route
              path="/products/:id"
              element={<Product addToCart={addToCart} />}
            />
            <Route exact path="/" element={<Home />} />
            {/* Pass the 'user' object as a prop to the 'User' component */}
            {/* <Route path="/profile" element={<User setUser={setUser}/>} /> */}
            <Route path="/login" element={<LogIn onAddUser = {setUser}/>} />
            <Route path="/signup" element={<SignUp onAddUser = {setUser}/>} />
            <Route path="/profile" element={<UserProfile onAddUser = {setUser}/>} />
            {/* <Route path="/addrider" element={<SignUp onAddUser = {setUser}/>} /> */}
            <Route
              path="/rider"
              element={
                <Rider
                  orders={orders} // Make sure this prop is passed
                  setOrders={setOrders} // Make sure this prop is passed
                  cartItems={cartItems}
                />
              }
            />
            {/* Add routes for admin login and dashboard */}
            {/* {isAdminLoggedIn ? ( */}
              <Route path="/admin/dashboard" element={<AdminDashboard  isAdminLoggedIn={isAdminLoggedIn} />} />
            {/* ) : ( */}
            <Route path="/admin/login" element={<AdminLoginForm handleAdminLogin={handleAdminLogin}  isAdminLoggedIn={isAdminLoggedIn}/>} />
            {/* )} */}
          </Routes>
        </div>
        <Footer />
      </div>
    // </BrowserRouter>
  );
}

export default App;
