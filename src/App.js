import React, { useState, useEffect } from "react";
import GachaDraw from "./components/GachaDraw";
import CardDisplay from "./components/CardDisplay";
import Inventory from "./components/Inventory";
import Login from './components/Login';
import "./styles/App.css";
import usersData from './users.json';

function App() {
  const [inventory, setInventory] = useState([]);
  const [cardDrawn, setCardDrawn] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(false);

  const handleLogin = (username, password) => {
    const match = usersData.find(u => u.username === username && u.password === password); 
    if (match) { 
      setIsAuthenticated(true); 
      setUserName(username)
    } else { 
      alert('Invalid credentials'); 
    }
  }

  // Fetch inventory from the server when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // const response = await fetch(`https://life-rpg-gacha.onrender.com/get-collectables?username=${username}`);
        const response = await fetch(`http://127.0.0.1:5000/get-collectables?username=${userName}`);
        const data = await response.json();
        setInventory(data); // Initialize the inventory state
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, [userName]); // Empty dependency array ensures it runs only once

  const handleDraw = async () => {
    try {
      const response = await Promise.all(
        Array.from({ length: 1 }).map(() =>
          // fetch("https://life-rpg-gacha.onrender.com/draw1card", {
          //   method: "POST",
          // }).then((res) => res.json())
          fetch("http://127.0.0.1:5000/draw1card", {
            method: "POST",
          }).then((res) => res.json())
        )
      );
      setInventory((prev) => [...prev, ...response]); // Update the state with the cards returned
      setCardDrawn(response)
    } catch (error) {
      console.error("Error drawing cards:", error);
    }
  };

  return (
    <div className="App">
      {
        isAuthenticated ? ( 
          <>
            <header>
              <h1>🎴 Gacha Card Game 🎴</h1>
            </header>
            <GachaDraw onDraw={handleDraw}/>
            <CardDisplay inventory={cardDrawn} />
            <Inventory inventory={inventory} />
          </>
        ) : ( 
          <Login onLogin={handleLogin} /> 
        )
      }
    </div>
  );
}

export default App;