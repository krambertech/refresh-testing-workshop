/**
 * 👉 TASK 1:
 * Write tests for `calculator` function
 * make sure to cover different cases in your tests
 *
 * When working on tests you might find it useful to try
 * and break your code and see how tests react
 *
 * Run your tests with:
 * > npm test calculator
 */

import calculator from "./calculator";

/**
 * 1.1.
 * Check that it can correctly adds numbers,
 * make sure to cover different cases: positive, negative, zero etc
 */
test("adds numbers", () => {
  expect(calculator("add", 3, 2)).toBe(5);
  expect(calculator("add", 3, -2)).toBe(1);
  expect(calculator("add", -10, -2)).toBe(-12);
  expect(calculator("add", 5, -5)).toBe(0);
  expect(calculator("add", 8, 0)).toBe(8);
});

/**
 * 1.2
 * Check that it can correctly subtract numbers,
 * make sure to cover different cases: positive, negative, zero etc
 */
test("subtracts numbers", () => {
  expect(calculator("subtract", 3, 2)).toBe(1);
  expect(calculator("subtract", 3, -2)).toBe(5);
  expect(calculator("subtract", -10, -2)).toBe(-8);
  expect(calculator("subtract", 5, -5)).toBe(10);
  expect(calculator("subtract", 8, 0)).toBe(8);
});

/**
 * 1.3 🚀 BONUS
 * Check that it throws an error if operation is not supported
 *
 * 💡 Tip: You can use `toThrow` matcher
 * https://jestjs.io/docs/en/expect#tothrowerror
 */
test("throws error when operation is unsupported", () => {
  expect(() => calculator("pow", 6, 7)).toThrow(/invalid operation code/i);
  expect(() => calculator("", 6, 7)).toThrow(/invalid operation code/i);
});

/**
 * 1.4 🚀 BONUS (TDD)
 * Let's try TDD! First, write a test for "multiply" operation, it should be red
 * Then implement it in the calculator function until test is green
 *
 * Example:
 * calculator("multiply", 1, 2) -> 2
 */
test("multiplies numbers", () => {
  expect(calculator("multiply", 3, 2)).toBe(6);
  expect(calculator("multiply", 3, -3)).toBe(-9);
  expect(calculator("multiply", -2, -4)).toBe(8);
  expect(calculator("multiply", 6, 0)).toBe(0);
});

/**
 * 1.5 🚀 BONUS (TDD)
 * Make sure that calculator function throws an error if it receives not numbers
 * as input
 *
 * Example:
 * calculator("add", [], "2") -> Error
 */
test("throws error when input is not a number", () => {
  expect(() => calculator("add", {}, 5)).toThrow(/invalid input/i);
  expect(() => calculator("add", 0, [])).toThrow(/invalid input/i);
  expect(() => calculator("add", "string", 2)).toThrow(/invalid input/i);
});

// Good luck 🍀
