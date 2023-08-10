import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
const Navbar = ({ onSearch, user,setUser, showNav }) => {
  console.log(user)

  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Checking if the JWT token is expired
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000; // Converting expiration time to milliseconds
      if (expirationTime < Date.now()) {
        // Token is expired, perform logout action
        handleLogout();
      } else {
        // Token is still valid, set the user state
        // Note: You might want to store more user information in the token and extract it here
        setUser({ username: decodedToken.username });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    const searchQuery = searchTerm.trim();
    const searchPath = searchQuery ? `/products?search=${searchQuery}` : '/products';
    if (location.pathname !== searchPath) {
      navigate(searchPath);
      setSearchTerm('');
    }
  };
  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('jwt');
    // Reset the user state
    setUser(null)
    // After logout, redirect the user to the login page
    navigate('/login');
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setTimeout(() => {
      setShowDropdown(false);
    }, 5000);
  };
  return (
    showNav? (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo">
          EAZY BAZAAR
        </Link>
      </div>
      <div className="options-container">
        <ul className="options">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div className="actions-container">
          {user ? (
          <React.Fragment>
            <button className="account-button" onClick={toggleDropdown}>
              {user.username} {/* Display the user's name */}
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Profile</Link> {/* Change the dropdown option to "Profile" */}
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button> {/* Add a Logout button */}
                </li>
              </ul>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Show the default "Account" button and dropdown options for non-authenticated users */}
            <button className="account-button" onClick={toggleDropdown}>
              Account
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </ul>
            )}
          </React.Fragment>
        )}
        <Link to="/rider" className="rider-button">
          Riders
        </Link>
      </div>
    </nav>):(<></>)
  );
};
export default Navbar;