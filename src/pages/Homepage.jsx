import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../configs/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Homepage = () => {
  const [token, setToken] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/products`);
        if (response) {
          console.log(response.data.products);
          setCategories(
            response.data.products.map((product) => product.category)
          );
          //   console.log(categoryNames);
          //   setCategories(categoryNames);
          console.log(setCategories);
          console.log(categories);
        } else {
          console.log("Cannot get response");
        }
      } catch (err) {
        console.log("Error occured: ", err);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
      <div className="flex flex-row">
        <div class="basis-1/4 m-5">
          <h1 className="font-bold text-2xl font-semibold tracking-widest rounded-lg">
            Catagories
          </h1>
        </div>
        <div class="basis-3/4 m-5">
          <center className="mb-5">
            <h1 className="font-bold text-3xl font-semibold tracking-widest rounded-lg">
              Products
            </h1>
          </center>
          02 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
          laboriosam voluptate molestias inventore aut nisi vero vitae
          voluptatum eveniet maxime omnis, est amet, magni impedit asperiores
          sunt dolore voluptatibus ullam?
        </div>
      </div>
    </div>
  );
};

export default Homepage;
