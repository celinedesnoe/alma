import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export const renderWithRouter = (
  ui: React.ReactNode,
  initialEntries: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>,
  );
};

export const normalizeSpaces = (str: string) => str.replace(/\s/g, " ");
