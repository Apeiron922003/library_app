import React, { useState } from "react";
import InputValue from "./InputValue";
const getStatus = (BMI) => {
  if (BMI < 18.5) {
    return "underweight";
  } else if (BMI < 25) {
    return "normal";
  } else if (BMI < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};
const getBMI = (weight, height) => {
  return (weight / Math.pow(height / 100, 2)).toFixed(2);
};
const BMICalculator = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [BMI, setBMI] = useState(
    (weight / Math.pow(height / 100, 2)).toFixed(2)
  );
  const [status, setStatus] = useState(getStatus(BMI));
  const incrementWeight = () => {
    setWeight(weight + 1);
    calculator();
  };
  const decrementWeight = () => {
    setWeight(weight - 1);
    calculator();
  };
  const incrementHeight = () => {
    setHeight(height + 1);
    calculator();
  };
  const decrementHeight = () => {
    setHeight(height - 1);
    calculator();
  };
  const calculator = () => {
    setBMI(getBMI(weight, height));
    setStatus(getStatus(BMI));
  };
  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        border: "2px solid black",
        borderRadius: "5px",
        gap: "20px",
        width: "300px",
        margin: "50px 0",
      }}
    >
      <h1 style={{ textAlign: "center" }}>BMICalculator</h1>
      <InputValue
        name={"Weight (kg)"}
        value={weight}
        increment={incrementWeight}
        decrement={decrementWeight}
      />
      <InputValue
        name={"Height (cm)"}
        value={height}
        increment={incrementHeight}
        decrement={decrementHeight}
      />
      <div>
        <p>
          Your BMI: <span>{BMI}</span>
        </p>
        <p>
          Status: <span>{status}</span>
        </p>
      </div>
    </div>
  );
};

export default BMICalculator;
