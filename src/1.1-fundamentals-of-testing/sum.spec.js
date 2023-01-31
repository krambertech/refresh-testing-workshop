import sum from "./sum";

test("Sum array of numbers", () => {
    expect(sum([5, 4, 12])).toBe(5);
});

test("Sum 2 numbers", () => {
    expect(sum(2, 3)).toBe(5);
});

test("Sum numbers in nested array", () => {
    expect(sum(5, [5, 2], [4, 5])).toBe(5);
});
