import { render, screen } from "@testing-library/react";
import Presentation from "./presentation.component";

test("renders presentation component correctly", () => {
  render(<Presentation title="my title" description="my description" />);

  const titleElement = screen.getByText(/my title/i);
  expect(titleElement).toBeInTheDocument();

  const descriptionElement = screen.getByText(/my description/i);
  expect(descriptionElement).toBeInTheDocument();
});
