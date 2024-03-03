import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../configs/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { async } from "q";

const Homepage = () => {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempProductList, setTempProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/products`);
        const response2 = await axios.get(`${API_END_POINT}/products/categories`);
        if (response && response.data.products && response2 ) {
          const categoryNames = response2.data;
          console.log(categoryNames);
          const uniqueCategories = [...new Set(categoryNames)];
          const capitalizedCategories = uniqueCategories.map(
            capitalizeFirstLetter
          );
          setCategories(capitalizedCategories);
          setProducts(response.data.products);
          setTempProductList(response.data.products);
        } else {
          console.log("Cannot get response");
        }
      } catch (err) {
        console.log("Error occurred: ", err);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    async function searchBooks() {
      const response = await axios.get(
        `${API_END_POINT}/products/search?q=${searchText}`
      );
      if (response.data) {
        console.log(response.data);
        setProducts(response.data.products);
      } else {
        setProducts(tempProductList);
      }
    }
    if (searchText == "") {
      setProducts(tempProductList);
    } else searchBooks();
  }, [searchText]);

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to handle category selection
  const handleCategoryClick = async(category) => {
    const response3 = await axios.get(`${API_END_POINT}/products/category/${category}`)
    console.log(response3.data);
    setSelectedCategory(category);
    setSelectedCategoryProducts(response3.data.products);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? selectedCategoryProducts
    : products;

    console.log(filteredProducts);
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
                style={{ cursor: "pointer", padding: "3px", paddingTop: "5px" }}
                key={index}
                onClick={() => handleCategoryClick(category.toLowerCase())}
                className={
                  selectedCategory === category.toLowerCase() ? "selected" : ""
                }
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
          <input
            type="text"
            name="search"
            placeholder="Search Books..."
            style={{ margin: "30px", padding: "5px", width: "50%", border: "2px solid black" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
              onClick={() =>
                navigate("/explore", {
                  state: {
                    product,
                  },
                })
              }
                key={product.id}
                className="flex flex-col items-center justify-center"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-64 h-64"
                />
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
