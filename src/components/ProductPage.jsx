import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const inputClass =
  "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600";

function ProductPage() {
  // useParams reads the :id from the URL, e.g. /products/3
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProductContext();

  const product = products.find((p) => String(p.id) === id);

  // Local state for edit mode and the values being edited
  const [isEditing, setIsEditing] = useState(false);
  const [priceInput, setPriceInput] = useState(product ? product.price : "");
  const [stockInput, setStockInput] = useState(product ? product.stock : "");

  if (!product) {
    return (
      <section>
        <p className="text-gray-600 mb-2">That product could not be found.</p>
        <Link to="/products" className="text-emerald-700 hover:underline">
          Back to products
        </Link>
      </section>
    );
  }

  const handleSave = async () => {
    await updateProduct(product.id, {
      price: parseFloat(priceInput),
      stock: parseInt(stockInput, 10),
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "Kes{product.name}"?`);
    if (confirmed) {
      await deleteProduct(product.id);
      navigate("/products");
    }
  };

  return (
    <section>
      <Link to="/products" className="text-emerald-700 hover:underline">
        &larr; Back to products
      </Link>
      <h1 className="text-2xl font-bold mt-3">{product.name}</h1>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>

      {isEditing ? (
        <div className="flex flex-col gap-3 max-w-xs">
          <label htmlFor="edit-price" className="font-medium text-sm text-gray-700">
            Price (Kes)
          </label>
          <input
            id="edit-price"
            type="number"
            step="0.01"
            min="0"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className={inputClass}
          />

          <label htmlFor="edit-stock" className="font-medium text-sm text-gray-700">
            Stock
          </label>
          <input
            id="edit-stock"
            type="number"
            min="0"
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            className={inputClass}
          />

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSave}
              className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xl font-bold">Kes{product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-3">In stock: {product.stock}</p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800"
            >
              Edit Price / Stock
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
            >
              Delete Product
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductPage;
