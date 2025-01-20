import React, { useState, useEffect } from "react";
import GachaDraw from "./components/GachaDraw";
import CardDisplay from "./components/CardDisplay";
import Inventory from "./components/Inventory";
import "./styles/App.css";

function App() {
  const [inventory, setInventory] = useState([]);
  const [cardDrawn, setCardDrawn] = useState([]);

  // Fetch inventory from the server when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://life-rpg-gacha.onrender.com/get-collectables");
        const data = await response.json();
        setInventory(data); // Initialize the inventory state
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []); // Empty dependency array ensures it runs only once

  const handleDraw = async () => {
    try {
      const response = await Promise.all(
        Array.from({ length: 1 }).map(() =>
          fetch("https://life-rpg-gacha.onrender.com/draw1card", {
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
      <header>
        <h1>🎴 Gacha Card Game 🎴</h1>
      </header>
      <GachaDraw onDraw={handleDraw}/>
      <CardDisplay inventory={cardDrawn} />
      <Inventory inventory={inventory} />
    </div>
  );
}

export default App;