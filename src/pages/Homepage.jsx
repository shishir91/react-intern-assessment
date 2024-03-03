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
  console.log(products);

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
          <div className="container">
            <div className="row">
              {products.length > 0 ? (
                products
                  .sort((a, b) => b.id - a.id)
                  .map((product, index) => {
                    return (
                      <div key={index} className="col-md-4 mb-1">
                        <div className="card" style={{ width: "14rem" }}>
                          <img
                            src={product.thumbnail}
                            className="card-img-top h-64 w-64"
                            alt={product.title}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">Price: ${product.price}</p>
                            <p className="card-text">Brand: {product.brand}</p>
                            <p className="card-text">Rating: {product.rating}/5</p>
                            {/* Add any other details you want to display */}
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="col">
                  <center>
                    <h5 className="fw-bold">No Product Found</h5>
                  </center>
                </div>
              )}
            </div>
          </div>




        </div>
      </div>
    </div>
  );
};

export default Homepage;
