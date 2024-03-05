import React from "react";

const FormSearch = () => {
  return (
    <div
      style={{
        backgroundColor: "#DDDDDD",
        width: "100%",
        alignItems: "center",
      }}
    >
      <form style={{ display: "flex", gap: 10 }}>
        <label htmlFor="" style={{ marginLeft: "50px", color: "black" }}>
          Blog post name:
        </label>
        <input type="text" />
        <button style={{ padding: "0px 20px" }}>Search</button>
      </form>
    </div>
  );
};

export default FormSearch;
