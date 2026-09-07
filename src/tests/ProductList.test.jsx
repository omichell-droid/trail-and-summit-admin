import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProductList from "../components/ProductList";
import * as ProductContext from "../context/ProductContext";

const mockProducts = [
  { id: 1, name: "Trailhead Backpack", category: "Backpacks", price: 89.99 },
  { id: 2, name: "Summit Down Jacket", category: "Apparel", price: 129.5 },
];

describe("ProductList", () => {
  it("shows every product when the search box is empty", () => {
    vi.spyOn(ProductContext, "useProductContext").mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByText("Trailhead Backpack")).toBeInTheDocument();
    expect(screen.getByText("Summit Down Jacket")).toBeInTheDocument();
  });

  it("filters products as the admin searches", async () => {
    vi.spyOn(ProductContext, "useProductContext").mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search products/i);
    await user.type(input, "jacket");

    expect(screen.queryByText("Trailhead Backpack")).not.toBeInTheDocument();
    expect(screen.getByText("Summit Down Jacket")).toBeInTheDocument();
  });
});
