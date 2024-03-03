import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../configs/constants";

const Homepage = () => {
  const [token, setToken] = useState();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  //   useEffect(async () => {
  //     setToken(localStorage.getItem("token"));
  //     if (token === "") {
  //       navigate("/login");
  //       return
  //     }
  //   }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_END_POINT}/products`);
      if (response) {
        console.log(response.data);
      } else {
        console.log("Cannot get response");
      }
    } catch (err) {
      console.log("Error occured: ", err);
    }
  };
  getProducts();
  return (
    <div>
      <center className="mb-5">
        <h1 className="font-bold text-5xl font-semibold tracking-widest">
          Products
        </h1>
      </center>
      <div className="flex flex-row">
        <div class="basis-1/4 m-5">01</div>
        <div class="basis-3/4 m-5">02 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam laboriosam voluptate molestias inventore aut nisi vero vitae voluptatum eveniet maxime omnis, est amet, magni impedit asperiores sunt dolore voluptatibus ullam?</div>
      </div>
    </div>
  );
};

export default Homepage;
