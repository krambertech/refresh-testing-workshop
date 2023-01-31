/**
 * 👉 TASK 3:
 * Write tests for the QuoteGenerator component. Note that it uses external API
 * for fetching quotes that you would need to mock in tests
 *
 * Run tests with:
 * > npm test QuoteGenerator
 */

// 👇 You can uncomment imports once you start working
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {fetchRandomQuote as mockFetchRandomQuote} from "./api";

import QuoteGenerator from "./QuoteGenerator";

// 👇 To mock API module:
jest.mock("./api");

// 👇 You can use this function in your tests
const setup = (ui) => ({
    user: userEvent.setup(),
    ...render(ui),
});

const baseMockQuote = {
    _id: "HBLejCmmWoIy",
    author: "John Snow",
    content: "Don't call me Lord Snow",
    length: 80,
    tags: [],
    dateAdded: "2020-01-01",
    dateModified: "2020-01-01",
};
/**
 * 3.1
 * Write a test that it fetches and displays a random quote
 * from API. Make sure to check that loading indication is shown while loading
 *
 * 💡 Tips:
 * - You can mock the whole `api` module with `jest.mock("./api");`, alternatively you can mock `fetch`
 * - Important to note, that `testing-library` follows ARIA standards and the way they define
 *   [implicit roles](https://www.w3.org/TR/html-aria/#docconformance). Therefore you would see
 *   that there is no "blockquote" role. To get quote contents you can use `getByText` query
 * - To wait until loading finishes you have a few strategies, read more about them
 *   [here](https://testing-library.com/docs/dom-testing-library/api-async#waitfor)
 */
test("fetches and displays a random quote from API", async () => {
    const {user} = setup(<QuoteGenerator/>);
    const submit = screen.getByText(/generate a random quote/i);
    const mockedQuote = mockQuote({author: "Albert Camus"});
    // 👇 Example of the quote object
    mockFetchRandomQuote.mockResolvedValue(mockedQuote);
    user.click(submit);
    const loading = await screen.findByRole(/status/i);
    expect(loading).not.toBeUndefined();
    await waitFor(() => expect(screen.getByText(mockedQuote.content)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(mockedQuote.author)).toBeInTheDocument());
});

/**
 * 3.2
 * Here you need to check that it allows to select category to user
 * and then  passes it to the API
 *
 * 💡 Tips:
 * - To find a select element use `getByRole("combobox")`
 * - To select an option from a select element use `userEvent.selectOptions`
 *   https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values-options
 */
test("allows to select category and displays quote", async () => {

    const {user} = setup(<QuoteGenerator/>);
    const select = screen.getByRole("combobox");
    const submit = screen.getByText(/generate a random quote/i);
    const category = 'history';
    const mockedQuote = mockQuote({content:"Totally random text, I just came up with"})
    mockFetchRandomQuote.mockResolvedValue(mockedQuote);
    // Select category
    await user.selectOptions(select, [category]);
    expect(select.value).toBe(category);
    // Submit selection
    await user.click(submit);
    // Mocked API call was called once with selected category
    expect(mockFetchRandomQuote).toBeCalledWith({"category": category});
    expect(mockFetchRandomQuote).toBeCalledTimes(1);
    // Results are displayed on screen
    await waitFor(() => expect(screen.getByText(mockedQuote.content)).toBeInTheDocument());
});

/**
 * 3.3 🚀 BONUS (TDD)
 * Currently `QuoteGenerator` component does not display an error state. Add a test case
 * that checks that it displays an error message when API call fails
 * and then implement the feature inside the component
 *
 * 💡 Tips:
 * - Use `.mockRejectedValueOnce` to mock API call failure (rejected promise)
 */
test("displays an error message when API call fails", async () => {
    const errorMessage = "Server didn't respond";
    mockFetchRandomQuote.mockRejectedValueOnce(new Error(errorMessage));
    const {user} = setup(<QuoteGenerator/>);
    const submit = screen.getByText(/generate a random quote/i);
    await user.click(submit);
    expect(mockFetchRandomQuote).toBeCalledTimes(1);
    await waitFor(() => expect(screen.getByRole("error")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole("error")).toHaveTextContent(errorMessage));
});

/**
 * 3.4 🚀 BONUS
 * Create a `mockQuote` function
 *
 * You might have noticed that we often need to write the same code to mock a quote.
 * Let's create a utility function that will help us make our tests more consice.
 * Create `mockQuote` function that accepts overrides and returns full object
 *
 * Example:
 * mockQuote({ content: "test" });
 *
 * Then use it in your tests to simplify mocking
 */
const mockQuote = (overrides) => {return {...baseMockQuote, ...overrides}};
