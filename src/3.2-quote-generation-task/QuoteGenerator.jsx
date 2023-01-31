import {useState} from "react";
import {fetchRandomQuote} from "./api";

const categories = [
    "any",
    "famous-quotes",
    "history",
    "technology",
    "sports",
    "inspirational",
];

function QuoteGenerator() {
    const [quoteCategory, setQuoteCategory] = useState("");
    const [quote, setQuote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeCategory = (e) => {
        setQuoteCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const quote = await fetchRandomQuote({
                category: quoteCategory === "all" ? null : quoteCategory,
            });
            setQuote(quote);
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <h3>Random quote</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor="quoteCategory">Choose category</label>
                <select
                    id="quoteCategory"
                    value={quoteCategory}
                    onChange={handleChangeCategory}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit">✨ Generate a random quote</button>
            </form>

            {isLoading ? (
                <p role="status">🌍 Loading...</p>
            ) : quote ? (
                <blockquote>
                    <p>{quote.content}</p>
                    <footer>{quote.author}</footer>
                </blockquote>
            ) : error ? (<p role="error">{error}</p>) : null}
        </div>
    );
}

export default QuoteGenerator;
