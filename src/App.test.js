import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app component correctly", () => {
  render(<App />);

  const appElement = screen.getByTestId("app");
  expect(appElement).toBeInTheDocument();
});
