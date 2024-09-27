// src/Card.jsx
// import React from "react";
import PropTypes from "prop-types";

const Card = ({ product, onHandleBuy }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt="Product Image" className="product-image" />
      <div className="product-info">
        <div className="product-title">{product.title}</div>
        <p className="product-price">Price: ${parseInt(product.price)}</p>
        <button
          style={{ backgroundColor: "#592C8C" }}
          className="buy-button"
          onClick={() => onHandleBuy(product)}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object.isRequired,
  onHandleBuy: PropTypes.func.isRequired,
};

export default Card;
