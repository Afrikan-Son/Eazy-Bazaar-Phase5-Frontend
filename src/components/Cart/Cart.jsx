import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  updateCartItems,
  clearCart,
} from '../../features/cart/cartSlice'
import { useEffect } from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  console.log(cartItems)
   useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      dispatch(updateCartItems(JSON.parse(storedCartItems)));
    }
  }, [dispatch]);

  // ... rest of your component code

  // Whenever the cart items change, update the local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const getTotalQuantity = () => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return totalQuantity;
  };

  const getTotalAmount = () => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return totalAmount;
  };
  const handleDelivery = () => {
    if (cartItems.length > 0) {
      const selectedIds = cartItems.map((item) => item.id);
      window.location.href = `/rider?ids=${selectedIds.join(',')}`;
    }
  };
  return (
    <div id="cart-wrapper">
      <div className="container py-5">
        <div className="row py-5">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center mb-4 name">Shopping Cart</h1>
            <div id="cart-table-container">
              <table id="cart-table" className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Quantity</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems && cartItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No items in the cart
                      </td>
                    </tr>
                  ) : (
                    cartItems &&
                    cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className='item-name' style={{width: '20px'}}>{item.name}</td>
                        <td>
                          <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <button
                            className="btn btn-outline-dark btn-sm me-2"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className="btn btn-outline-dark btn-sm ms-2"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </td>
                        <td>${item.price * item.quantity}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {cartItems && cartItems.length > 0 && (
              <div className="text-center">
                <button className="btn btn-outline-danger me-2" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-outline-dark">Checkout</button>
                <button className="btn btn-outline-dark" onClick={handleDelivery}>
                  Deliver
                </button>
                <hr />
                <p>Total Quantity: {getTotalQuantity()}</p>
                <p>Total Amount: ${getTotalAmount()}.00</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;