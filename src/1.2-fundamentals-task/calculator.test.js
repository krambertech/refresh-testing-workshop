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
// 👇 You can uncomment import once you start working
import calculator from "./calculator";

/**
 * 1.1.
 * Check that it can correctly add numbers,
 * make sure to cover different cases: positive, negative, zero etc
 */

test("Correctly adds numbers", () => {
    expect(calculator("add", 4, 5)).toBe(9);
    expect(calculator("add", 5, -5)).toBe(0);
});
test("Correctly adds zero value", () => {
    expect(calculator("add", 8, 0)).toBe(8);
    expect(calculator("add", 0, 0)).toBe(0);
    expect(calculator("add", 0, 1)).toBe(1);
});
test("Correctly adds negative numbers", () => {

    expect(calculator("add", -5, -5)).toBe(-10);
    expect(calculator("add", -5, 1)).toBe(-4);
    expect(calculator("add", 12, -3)).toBe(9);
});
test("Correctly adds Infinity values", () => {
    expect(calculator("add", Infinity, 5)).toBe(Infinity);
    expect(calculator("add", 9, Infinity)).toBe(Infinity);
    expect(calculator("add", -12, Infinity)).toBe(Infinity);
    expect(calculator("add", Infinity, Infinity)).toBe(Infinity);
    expect(calculator("add", Infinity, -Infinity)).toBe(NaN);
    expect(calculator("add", 1, -Infinity)).toBe(-Infinity);
});
/**
 * 1.2
 * Check that it can correctly subtract numbers,
 * make sure to cover different cases: positive, negative, zero etc
 */
test("Correctly subtracts numbers", () => {
    expect(calculator("subtract", 4, 5)).toBe(-1);
    expect(calculator("subtract", 5, 2)).toBe(3);
});
test("Correctly subtracts zero value", () => {
    expect(calculator("subtract", 8, 0)).toBe(8);
    expect(calculator("subtract", 0, 0)).toBe(0);
    expect(calculator("subtract", 0, 1)).toBe(-1);
});
test("Correctly subtracts negative numbers", () => {
    expect(calculator("subtract", -5, -5)).toBe(0);
    expect(calculator("subtract", -5, 1)).toBe(-6);
    expect(calculator("subtract", 12, -3)).toBe(15);
});
test("Correctly subtracts Infinity values", () => {
    expect(calculator("subtract", Infinity, 5)).toBe(Infinity);
    expect(calculator("subtract", 9, Infinity)).toBe(-Infinity);
    expect(calculator("subtract", -12, Infinity)).toBe(-Infinity);
    expect(calculator("subtract", Infinity, Infinity)).toBe(NaN);
    expect(calculator("subtract", Infinity, -Infinity)).toBe(Infinity);
    expect(calculator("subtract", 1, -Infinity)).toBe(Infinity);
});
/**
 * 1.3 🚀 BONUS
 * Check that it throws an error if operation is not supported
 *
 * 💡 Tip: You can use `toThrow` matcher
 * https://jestjs.io/docs/en/expect#tothrowerror
 */
test("Throws an error on unsupported function", () => {
    expect(() => calculator("divide", 6, 3)).toThrow("Invalid operation code");
});

/**
 * 1.4 🚀 BONUS (TDD)
 * Let's try TDD! First, write a test for "multiply" operation, it should be red
 * Then implement it in the calculator function until test is green
 *
 * Example:
 * calculator("multiply", 1, 2) -> 2
 */
test("Multiplys numbers correctly", () => {
    expect(calculator("multiply", 5, 4)). toBe(20);
    expect(calculator("multiply", 5, -4)). toBe(-20);
    expect(calculator("multiply", -5, -4)). toBe(20);
    expect(calculator("multiply", Infinity, -4)). toBe(-Infinity);
    expect(calculator("multiply", Infinity, 2)). toBe(Infinity);
});
/**
 * 1.5 🚀 BONUS (TDD)
 * Make sure that calculator function throws an error if it receives not numbers
 * as input
 *
 * Example:
 * calculator("add", [], "2") -> Error
 */
test("throws error when input is not a number",()=>{
    expect(() => calculator("add", Error, "7")).toThrow("Input values not a number");
    expect(() => calculator("add", [], "7")).toThrow("Input values not a number");
    expect(() => calculator("add", [], [])).toThrow("Input values not a number");
    expect(() => calculator("add", "A", 1)).toThrow("Input values not a number");
    expect(() => calculator("add", "3", "C")).toThrow("Input values not a number");
    expect(() => calculator("add", 0, "B")).toThrow("Input values not a number");
});
