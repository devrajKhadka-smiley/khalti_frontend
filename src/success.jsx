import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className="success">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>I am rich now!</p>
      <button onClick={handleGoHome}>Go to Home</button>
    </div>
  );
};

export default Success;
