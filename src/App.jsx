import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import "./App.css";
import { useNavigate } from "react-router-dom"; 

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStoreProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchStoreProducts();
  }, []);

  const handleBuy = async (product) => {
    console.log("hello world", product);
    const payload = {
      return_url: import.meta.env.VITE_PUBLIC_SUCCESS_URL,
      website_url: import.meta.env.VITE_PUBLIC_WEBSITE_URL,
      amount: parseInt(product.price) * 100,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Dev Raj Khadka",
        email: "dev@gmail.com",
        phone: "9746464745",
        Location: "GangaLal-06, Kathmandu, Nepal",
      },
    };

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
      if (response) {
        window.location.href = `${response.data.data.payment_url}`;
        setPaymentSuccess(true); 
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  const handleRedirect = () => {
    navigate("/"); 
  };

  return (
    <main className="app">
      <h2 className="app-title">Khalti Integration - Hariyo Cycle Market</h2>
      <hr className="bg-white w-full" />

      {paymentSuccess ? (
        <div className="success-message">
          <h3>Payment Successful!</h3>
          <button onClick={handleRedirect} className="redirect-button">
            Go to Home
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {allProducts.map((product) => (
            <div className="card-wrap" key={product.id}>
              <Card product={product} onHandleBuy={handleBuy} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
