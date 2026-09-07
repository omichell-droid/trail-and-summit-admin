import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts";

// Create the context object
const ProductContext = createContext(null);

// This provider wraps the whole app. It runs our custom hook ONE time
// and shares the result with every component below it, so pages like
// ProductList and ProductPage don't each need their own fetch calls.
export function ProductProvider({ children }) {
  const productState = useProducts();

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

// Small helper hook so components can just call useProductContext()
// instead of importing useContext + ProductContext every time.
export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used inside a ProductProvider");
  }
  return context;
}
