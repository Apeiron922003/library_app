import React, { useState } from "react";
import downImg from "./img/Sap.png";
const Card = ({ img }) => {
  const [flipped, setFlip] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        setFlip(!flipped);
      }}
    >
      <img src={flipped ? img : downImg} alt="" />
    </div>
  );
};

export default Card;
