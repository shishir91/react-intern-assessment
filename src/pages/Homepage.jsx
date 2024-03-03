import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../configs/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from '@fortawesome/free-solid-svg-icons'

const Homepage = () => {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/products`);
        if (response && response.data.products) {
          const categoryNames = response.data.products.map((product) => product.category);
          // Remove duplicates from the category names
          const uniqueCategories = [...new Set(categoryNames)];
          // Capitalize the first letter of each word in the category names
          const capitalizedCategories = uniqueCategories.map(capitalizeFirstLetter);
          setCategories(capitalizedCategories);
        } else {
          console.log("Cannot get response");
        }
      } catch (err) {
        console.log("Error occurred: ", err);
      }
    };
    getProducts();
  }, []);

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/4 m-5">
          <h1 className="font-bold text-2xl font-semibold tracking-widest rounded-lg">
            <FontAwesomeIcon icon={faList} /> Categories
          </h1>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <div className="basis-3/4 m-5">
          <center className="mb-5">
            <h1 className="font-bold text-3xl font-semibold tracking-widest rounded-lg">
              Products
            </h1>
          </center>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
            laboriosam voluptate molestias inventore aut nisi vero vitae
            voluptatum eveniet maxime omnis, est amet, magni impedit asperiores
            sunt dolore voluptatibus ullam?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
