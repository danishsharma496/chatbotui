// App.js
import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import Product from './Product';
import './App.css';
import ParticlesBg from 'particles-bg';
import LogoSVG from './Hush-hush.svg';

const App = () => {
  const [productData, setProductData] = useState([]);
  const [productRecomended, setProductRecomended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = productRecomended.map(async (userInput) => {
          const response = await fetch('https://chatbackend-p2sw.onrender.com/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
          });

          if (!response.ok) {
            console.error(`Failed to fetch data for userInput: ${userInput}`);
            return null;
          }

          return response.json();
        });

        const results = await Promise.all(promises);
        const validResults = results.filter(result => result !== null);

        setProductData(validResults);
      } catch (error) {
        console.error('Error fetching data in use effect:', error);
      }
    };

    fetchData();
  }, [productRecomended]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('https://chatbackend-p2sw.onrender.com/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data in use effect:', error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <div id="app-container">
      <ParticlesBg type="circle" bg={true} className="particles-bg" />
      <div className="logo-and-heading">
        <img src={LogoSVG} alt="Logo" className="logo" />
        <h1 className="app-heading">HUSH AI</h1>
      </div>
      <div className="flex-container">
        <Chatbot
          productRecomended={productRecomended}
          setProductRecomended={setProductRecomended}
          className="Chatbot"
        />
        <Product productData={productData} className="Product" />
      </div>
    </div>
  );
};

export default App;
