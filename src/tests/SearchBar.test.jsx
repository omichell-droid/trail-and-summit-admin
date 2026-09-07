import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("calls onSearchChange as the admin types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar searchTerm="" onSearchChange={handleChange} />);

    const input = screen.getByPlaceholderText(/search products/i);
    await user.type(input, "tent");

    // onSearchChange should fire once per character typed
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it("shows a Clear button only when there is a search term", () => {
    const { rerender } = render(
      <SearchBar searchTerm="" onSearchChange={() => {}} />
    );
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();

    rerender(<SearchBar searchTerm="tent" onSearchChange={() => {}} />);
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });
});
