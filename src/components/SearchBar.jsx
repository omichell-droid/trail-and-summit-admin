import { useRef } from "react";

// This is a "controlled" search input. The value it shows always comes
// from the parent (ProductList) through props, and every keystroke is
// sent back up through onSearchChange.
function SearchBar({ searchTerm, onSearchChange }) {
  // useRef gives us a direct handle on the <input> DOM node so we can
  // focus it again after clearing, without using extra state for that.
  const inputRef = useRef(null);

  const handleClear = () => {
    onSearchChange("");
    inputRef.current.focus();
  };

  return (
    <div className="flex gap-2 my-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products by name or category..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
