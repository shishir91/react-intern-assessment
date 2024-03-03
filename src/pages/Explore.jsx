import React from "react";
import { useLocation } from "react-router-dom";

const Explore = () => {
  const location = useLocation();
  const product = location.state.product;
  console.log(product);
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          boxShadow: "0px 0px 5px #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <img
          src={product.image}
          style={{
            height: "250px",
            width: "250px",
            objectFit: "contain",
          }}
        />
        <br />
        <h3>{product.name}</h3>
        Author: <br />
        <small>{product.author}</small>
        <br />
        Genre: <br />
        <small>{product.genre}</small>
        <br />
        Description: <br />
        <small>{product.description}</small>
      </div>
    </div>
  );
};

export default Explore;
