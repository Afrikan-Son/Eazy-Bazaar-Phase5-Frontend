import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Product.css';

const Product = ({ addToCart }) => {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
   // State to store the product data and loading status
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch product data based on the 'id' parameter
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]); // Add 'id' as a dependency so that the effect runs when the 'id' changes

  // Loading component to display while fetching data
  const Loading = () => {
    return <div>Loading...</div>;
  };

  // Handle adding the current product to the cart
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Display the product details
  const ShowProduct = () => {
    return (
      <div className="product-container">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="product-details">
          <h4 className="product-category">{product.category}</h4>
          <h1 className="product-title">{product.title}</h1>
          <p className="product-rating">
            Rating: {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="product-price">$ {product.price}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-buttons">
            <button className="btn btn-outline-dark" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <NavLink to="/cart" className="btn btn-dark ms-2">
              Go to Cart
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
