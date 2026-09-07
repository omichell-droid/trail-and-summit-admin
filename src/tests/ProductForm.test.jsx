import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProductForm from "../components/ProductForm";
import * as ProductContext from "../context/ProductContext";

describe("ProductForm", () => {
  it("calls addProduct with the values the admin typed in", async () => {
    const addProduct = vi.fn().mockResolvedValue({});
    vi.spyOn(ProductContext, "useProductContext").mockReturnValue({
      addProduct,
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/product name/i), "Rain Cover");
    await user.type(screen.getByLabelText(/description/i), "Keeps your pack dry");
    await user.type(screen.getByLabelText(/category/i), "Accessories");
    await user.type(screen.getByLabelText(/price/i), "19.99");
    await user.type(screen.getByLabelText(/stock count/i), "15");

    await user.click(screen.getByRole("button", { name: /add product/i }));

    expect(addProduct).toHaveBeenCalledTimes(1);
    expect(addProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Rain Cover",
        category: "Accessories",
        price: 19.99,
        stock: 15,
      })
    );
  });
});
