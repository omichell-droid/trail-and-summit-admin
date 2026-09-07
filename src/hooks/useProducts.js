import { useState, useEffect, useCallback } from "react";

// The URL where json-server is running (our simulated backend).
const API_URL = "http://localhost:3001/products";

// This is a custom hook. It keeps all the "talk to the backend" logic
// in one place so components don't have to repeat fetch code.
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // READ - get all products from db.json (through json-server)
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Could not load products");
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run fetchProducts once when the hook is first used
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // CREATE - add a brand new product
  const addProduct = async (newProduct) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const created = await response.json();
    // Update local state so the UI shows the new product right away
    setProducts((prev) => [...prev, created]);
    return created;
  };

  // UPDATE - change one or more fields on an existing product (e.g. price)
  const updateProduct = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updated = await response.json();
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? updated : product))
    );
    return updated;
  };

  // DELETE - remove a product completely
  const deleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
