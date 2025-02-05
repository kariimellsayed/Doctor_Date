"use client";

const { createContext, useState } = require("react");

export const productsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, title: "Product1", price: 22 },
    { id: 2, title: "Product2", price: 52 },
    { id: 3, title: "Product3", price: 42 },
  ]);
  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductsProvider;
