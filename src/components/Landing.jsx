import { Link } from "react-router-dom";

function Landing() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Trail &amp; Summit Admin Portal</h1>
      <p className="text-gray-700 mb-3">
        This is the internal admin portal for Trail &amp; Summit Gear, an
        online outdoor equipment store. From here an administrator can:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
        <li>Browse and search every product currently in the catalog</li>
        <li>Add a brand new product to the store</li>
        <li>Edit an existing product's details, including its price</li>
        <li>Remove a product that is no longer sold</li>
      </ul>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/products"
          className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800"
        >
          View Products
        </Link>
        <Link
          to="/add-product"
          className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Add a Product
        </Link>
      </div>
    </section>
  );
}

export default Landing;
