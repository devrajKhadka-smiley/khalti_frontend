import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import "./App.css";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);

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
      // return_url: import.meta.env.REACT_PUBLIC_SUCCESS_URL,
      return_url: "http://localhost:5173/success",
      website_url: "http://localhost:5173",
      amount: parseInt(product.price) * 100,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Dev Raj Khadka",
        email: "dev@gmail.com",
        phone: "9746464745",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/khalti-api",
        payload
      );
      if (response) {
        window.location.href = `${response.data.data.payment_url}`;
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  return (
    <main className="app">
      <h2 className="app-title">Khalti Integration - Green Cycle Market</h2>
      <hr className="bg-white w-full" />
      <div className="product-grid">
        {allProducts.map((product) => (
          <div className="card-wrap" key={product.id}>
            <Card product={product} onHandleBuy={handleBuy} />
          </div>
        ))}
      </div>
    </main>
  );
}
