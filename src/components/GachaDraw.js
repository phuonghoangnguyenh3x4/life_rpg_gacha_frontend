import React from "react";
import "./../styles/Card.css";

function GachaDraw({ onDraw }) {
  return (
    <div className="gacha-draw">
      <button onClick={onDraw} className="draw-button">
        🎲 Draw Card <br/>
        <center>1000 💵</center>
      </button>
    </div>
  );
}

export default GachaDraw;
