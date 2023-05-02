import React from "react";
import { render } from "@testing-library/react";
import StartPage from "../components/StartPage";

it("renders without crashing", () => {
  const { getByText } = render(<StartPage />);
  const headerElement = getByText(/Your Journey/i);
  expect(headerElement).toBeInTheDocument();
});

it("renders input fields and button", () => {
  const { getByPlaceholderText, getByRole } = render(<StartPage />);

  const startPointInput = getByPlaceholderText("Enter starting location");
  expect(startPointInput).toBeInTheDocument();

  const destinationInput = getByPlaceholderText("Enter destination");
  expect(destinationInput).toBeInTheDocument();

  const castButton = getByRole("button");
  expect(castButton).toBeInTheDocument();
});
