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
                      <>
                        <div key={index} className="col-md-3 mb-3">
                          <div style={{ cursor: "pointer" }}>
                            <div
                              className="card"
                              style={{
                                border: "none",
                                margin: "0.4rem",
                                boxShadow:
                                  " rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
                              }}
                            >
                              <img
                                src={product.thumbnail}
                                className="card-img-top"
                                alt={product.title}
                                style={{
                                  height: "10rem",
                                  width: "fit-content",
                                }}
                              />
                              <div className="card-body">
                                <h5
                                  style={{ fontWeight: "bold" }}
                                  className="card-title"
                                >
                                  {product.title}
                                </h5>
                                <p className="card-text">
                                  Brand: {product.brand}
                                </p>
                                <p className="card-text">
                                  Rating: {product.rating}/5
                                </p>
                                <b>
                                  <p
                                    style={{ fontWeight: "bold" }}
                                    className="card-text"
                                  >
                                    $ {product.price}
                                  </p>
                                </b>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
              ) : (
                <div>
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
