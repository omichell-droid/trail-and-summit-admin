import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
};

const inputClass =
  "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600";
const labelClass = "font-medium text-sm text-gray-700";

function ProductForm() {
  const { addProduct } = useProductContext();
  const navigate = useNavigate();

  // useId generates a unique, stable id so each label is correctly
  // linked to its input, even if this form is rendered more than once.
  const formId = useId();

  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addProduct({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    });

    setIsSubmitting(false);
    setFormData(emptyForm);
    navigate("/products");
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Add a New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <label htmlFor={`Kes{formId}-name`} className={labelClass}>
          Product Name
        </label>
        <input
          id={`Kes{formId}-name`}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <label htmlFor={`Kes{formId}-description`} className={labelClass}>
          Description
        </label>
        <textarea
          id={`Kes{formId}-description`}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <label htmlFor={`Kes{formId}-category`} className={labelClass}>
          Category
        </label>
        <input
          id={`Kes{formId}-category`}
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <label htmlFor={`Kes{formId}-price`} className={labelClass}>
          Price (Kes)
        </label>
        <input
          id={`Kes{formId}-price`}
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <label htmlFor={`Kes{formId}-stock`} className={labelClass}>
          Stock Count
        </label>
        <input
          id={`Kes{formId}-stock`}
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 disabled:opacity-60"
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
}

export default ProductForm;
