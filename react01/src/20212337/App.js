import BMICalculator from "./components/day02/BMICalculator/BMICalculator";
function App() {
  return (
    <div className="App container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BMICalculator />
      </div>
    </div>
  );
}

export default App;
