import { getByTestId, render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const ancestor = getByTestId("ancestor");
  const descendant = getByTestId("descendant");
  expect(ancestor).toContainElement(descendant);
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
