import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WordChecker from "./WordChecker";

const setup = (ui) => ({
  user: userEvent.setup(),
  ...render(ui),
});

test("renders heading and input with correct label", () => {
  setup(<WordChecker />);

  expect(screen.getByRole("heading")).toHaveTextContent(/check the word/i);
  expect(screen.getByLabelText(/enter a word/i)).toBeInTheDocument();
});

test("displays alert when word is too long", async () => {
  const { user } = setup(<WordChecker maxLength={9} />);

  const input = screen.getByLabelText(/word/i);
  await user.type(input, "abrakadabra");

  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
});

test("displays alert when word is too short", async () => {
  const { user } = setup(<WordChecker minLength={5} />);

  const input = screen.getByLabelText(/enter a word/i);
  await user.type(input, "cat");

  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
});

test("displays success message when the word is at correct length", async () => {
  const { rerender, user } = setup(
    <WordChecker minLength={5} maxLength={10} />
  );

  const input = screen.getByLabelText(/enter a word/i);
  await user.type(input, "tallinn");

  expect(screen.getByRole("alert")).toHaveTextContent(/good word/i);

  rerender(<WordChecker minLength={8} maxLength={12} />);

  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
  expect(screen.queryByRole("status")).toBeNull();
});
