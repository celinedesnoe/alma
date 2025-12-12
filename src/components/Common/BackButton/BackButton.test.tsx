import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import BackButton from "./BackButton";
import { renderWithRouter } from "@/utils/testUtils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("BackButton", () => {
  it("should render the button with an image and text", () => {
    renderWithRouter(<BackButton />, ["/test"]);

    const button = screen.getByRole("button", { name: /back/i });
    expect(button).toBeInTheDocument();

    const img = screen.getByRole("presentation");
    expect(img).toHaveAttribute("src", "/back.svg");
    expect(img).toHaveAttribute("alt", "");
  });

  it("should call window.history.back() when clicked", () => {
    renderWithRouter(<BackButton />, ["/test"]);

    const button = screen.getByRole("button", { name: /back/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalled();

    navigateMock.mockRestore();
  });
});
