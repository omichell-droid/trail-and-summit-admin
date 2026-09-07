import { NavLink } from "react-router-dom";

function Navbar() {
  // A little helper so the active link gets a different class
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-1.5 rounded-md bg-emerald-700 text-white"
      : "px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100";

  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 py-4 mb-6">
      <span className="font-bold text-lg">Trail &amp; Summit Admin</span>
      <div className="flex gap-2">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/add-product" className={linkClass}>
          Add Product
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
