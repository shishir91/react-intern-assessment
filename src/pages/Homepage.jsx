import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../configs/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/products`);
        if (response && response.data.products) {
          const categoryNames = response.data.products.map(
            (product) => product.category
          );
          const uniqueCategories = [...new Set(categoryNames)];
          const capitalizedCategories = uniqueCategories.map(
            capitalizeFirstLetter
          );
          setCategories(capitalizedCategories);
          setProducts(response.data.products);
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

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory.toLowerCase())
    : products;

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/4 m-5">
          <h1 className="font-bold text-2xl font-semibold tracking-widest rounded-lg">
            <FontAwesomeIcon icon={faList} /> Categories
          </h1>
          <ul>
            {categories.map((category, index) => (
              <li 
              style={{cursor: "pointer"}}
                key={index}
                onClick={() => handleCategoryClick(category.toLowerCase())}
                className={selectedCategory === category.toLowerCase() ? "selected" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-3/4 m-5">
          <center className="mb-5">
            <h1 className="font-bold text-3xl font-semibold tracking-widest rounded-lg">
              Products
            </h1>
          </center>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center justify-center">
                <img src={product.thumbnail} alt={product.title} className="w-64 h-64" />
                <h4 className="mt-2 text-center">{product.title}</h4>
                <p className="text-center">{product.brand}</p>
                <p className="text-center">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
