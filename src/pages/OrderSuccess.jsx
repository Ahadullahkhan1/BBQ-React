import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <div className="order-success-box">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for your purchase. You’ll receive an email confirmation shortly.</p>
        <Link to="/" className="back-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
