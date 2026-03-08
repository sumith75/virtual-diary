import { useEffect, useState } from "react";

const STORAGE_QUOTES = "cachedQuotes";
const STORAGE_INDEX = "quoteIndex";

export default function useRandomQuote() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(true);

  const fetchBatch = async () => {
    try {
      // Fetch 10 random quotes 
      const res = await fetch(
        "https://dummyjson.com/quotes/random/10"
      );
      const data = await res.json();

      
     

      
      const five = data.slice(0, 10).map((q) => ({
        content: q.quote,
        author: q.author,
      }));

      localStorage.setItem(STORAGE_QUOTES, JSON.stringify(five));
      localStorage.setItem(STORAGE_INDEX, "1");

      setQuote(five[0]);
    } catch (err) {
      console.error("Quote API error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedQuotes = JSON.parse(
      localStorage.getItem(STORAGE_QUOTES)
    );
    let index = Number(localStorage.getItem(STORAGE_INDEX));

    if (!storedQuotes || storedQuotes.length < 9 || index >= 10) {
      fetchBatch();
      return;
    }

    setQuote(storedQuotes[index]);
    localStorage.setItem(STORAGE_INDEX, String(index + 1));
     setLoading(false);
  }, []);

  return { quote, loading };
}
