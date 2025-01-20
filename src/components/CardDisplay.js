import React from "react";
import "./../styles/Card.css";

function CardDisplay({ inventory }) {
  const card = inventory[inventory.length - 1];

  if (!card) return null;

  return (
    <div className="card-display">
      <h2>🎉 You got a card! 🎉</h2>
      <div className={`card ${card.rarity.toLowerCase()}`}>
        <img src={card.image_url} alt={card.title} />
        <h3>{card.title}</h3>
        <p>Rarity: {card.rarity}</p>
        <p>Cost: {card.cost} 💵</p>
      </div>
    </div>
  );
}

export default CardDisplay;
