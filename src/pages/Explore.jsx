import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fullscreenImage, setFullscreenImage] = useState(null);
  if (!location.state || !location.state.product) {
    navigate("/");
    return;
  }
  const product = location.state.product;

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-8">
            <div className="mb-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full cursor-pointer"
                onClick={() => handleImageClick(product.thumbnail)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">
              Price: ${product.price}
            </p>
            <p className="text-lg font-semibold mb-2">
              Discount: {product.discountPercentage}%
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500">Rating: {product.rating}/5</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        </div>
      </div>
      {fullscreenImage && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-90 flex justify-center items-center">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-xl focus:outline-none"
              onClick={handleCloseFullscreen}
            >
              &#10006;
            </button>
            <img
              src={fullscreenImage}
              alt="Full-Screen"
              className="max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
