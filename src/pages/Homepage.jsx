import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../configs/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from '@fortawesome/free-solid-svg-icons'
import Image1 from './images/product.jpg'

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
          const categoryNames = response.data.products.map((product) => product.category);
          // Remove duplicates from the category names
          const uniqueCategories = [...new Set(categoryNames)];
          // Capitalize the first letter of each word in the category names
          const capitalizedCategories = uniqueCategories.map(capitalizeFirstLetter);
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
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
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
              <li key={index} onClick={() => handleCategorySelect(category)} style={{ cursor: 'pointer' }}>{category}</li>
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
            <div className="">
              <img src={Image1} alt="Product 1" className="w-64 h-64" />
              <h4 className="mt-2 text-center">Product 1</h4>
            </div>
            <div className="text-center">
              <img src={Image1} alt="Product 2" className="w-64 h-64" />
              <h4 className="mt-2 text-center">Product 2</h4>
            </div>
            <div className="text-center">
              <img src={Image1} alt="Product 3" className="w-64 h-64" />
              <h4 className="mt-2 text-center">Product 3</h4>
            </div>
            {/* Repeat this structure for more products */}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Homepage;
