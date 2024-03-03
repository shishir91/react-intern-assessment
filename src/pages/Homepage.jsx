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
  const [searchText, setSearchText] = useState("");
  const [tempProductList, setTempProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const npage = Math.ceil(products.length / productsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/products`);
        const response2 = await axios.get(
          `${API_END_POINT}/products/categories`
        );
        if (response && response.data.products && response2) {
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
  const handleCategoryClick = async (category) => {
    const response3 = await axios.get(
      `${API_END_POINT}/products/category/${category}`
    );
    console.log(response3.data);
    setSelectedCategory(category);
    setProducts(response3.data.products);
  };

  // Filter products based on selected category
  // const filteredProducts = selectedCategory
  //   ? selectedCategoryProducts
  //   : products;

  // console.log(filteredProducts);

  const items = products.slice(firstIndex, lastIndex);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  console.log(numbers);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className="bg-gray-300">
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
            style={{
              margin: "30px",
              padding: "5px",
              width: "50%",
              border: "2px solid black",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            {items.map((product) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/explore", {
                    state: {
                      product,
                    },
                  })
                }
                key={product.id}
                className="flex flex-col items-center justify-center shadow-xl"
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

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <div
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
              style={{ display: "flex", alignItems: "center" }}
            >
              <a
                onClick={prePage}
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              {numbers.map((n, i) => (
                <div
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    onClick={() => changeCPage(n)}
                    aria-current="page"
                    className={`${currentPage === n? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                  >
                    {n}
                  </a>
                </div>
              ))}
              <a
                onClick={nextPage}
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
