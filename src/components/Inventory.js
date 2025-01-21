import React from "react";
import "./../styles/Card.css";

function Inventory({ inventory }) {
  if (!inventory) { return <div>No data available</div>; }
  return (
    <div className="inventory">
      <h2>📜 Your Inventory</h2>
      <div className="card-grid">
        {inventory.map((card, index) => (
          <div key={index} className={`card ${card.rarity.toLowerCase()}`}>
            <img src={card.image_url} alt={card.title} />
            <h3>{card.title}</h3>
            <p>Rarity: {card.rarity}</p>
            <p>Cost: {card.cost} 💵</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
