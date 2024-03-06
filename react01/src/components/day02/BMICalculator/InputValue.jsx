import React from "react";

const InputValue = ({ name, value, increment, decrement, set }) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <label htmlFor="">{"Enter " + name + " :"} </label>
      <div style={{ display: "flex" }}>
        <button
          style={{ padding: "10px 20px", backgroundColor: "#3498DB" }}
          onClick={decrement}
        >
          -
        </button>
        <input
          type="number"
          value={value}
          readOnly
          style={{ width: "100px" }}
        />
        <button
          style={{ padding: "10px 20px", backgroundColor: "#3498DB" }}
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputValue;
