import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Products.css';
const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch('https://eazy-bazaar-ecommerce-app.onrender.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  const Loading = () => {
    return <div>Loading...</div>;
  };
  const filterProducts = (category) => {
    const updatedList = products.filter((product) => product.category.trim().toLowerCase() === category.trim().toLowerCase());
    setFilteredProducts(updatedList);
  };
  const ShowProducts = () => {
    return (
      <div className="products-container">
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilteredProducts(products)}>
            All
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("men's clothing")}>
            Men's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProducts('jewelry')}>
            Jewelry
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProducts('electronics')}>
            Electronics
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProducts('alcoholic drinks')}>
            Alcoholic Drinks
          </button>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
  {filteredProducts.map((product) => (
    <div className="col mb-4" key={product.id}>
      <div className="product-card h-100 text-center p-4">
        <img src={product.image} className="product-image" alt={product.name} />
        <div className="product-details">
          <h5 className="product-title">{product.name.substring(0, 18)}</h5>
          <p className="product-price lead fw-bold">${product.price}</p>
          <p className="product-rating lead fw-bolder">
      Units Left: {product.stock_count}
            <i className="fa fa-star"></i>
          </p>
          <div className="product-buttons">
            <button className="btn btn-outline-dark" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark ms-2">
              Buy Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    );
  };
  return (
    <div>
      <div className="container-lg my-4 py-4">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};
export default Products;