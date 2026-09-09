import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import SearchBar from "./SearchBar";
import { useStoreInfo } from "../hooks/useStoreInfo";

function ProductList() {
  const { products, isLoading, error } = useProductContext();
  const { storeInfo } = useStoreInfo();
 

  // Local state just for what the admin has typed into the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products dynamically as the admin types. This runs on every
  // render
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  if (isLoading) return <p className="text-gray-600">Loading products...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <section>
            <h1 className="text-2xl font-bold mb-2">Products</h1>

      {storeInfo && (
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">
            {storeInfo.name}
          </span>{" "}
          &mdash; {storeInfo.description}
        </p>
      )}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products match "{searchTerm}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="block border border-gray-200 rounded-lg p-4 hover:border-emerald-600 hover:shadow-sm transition"
            >
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-bold mt-1">Kes{product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
