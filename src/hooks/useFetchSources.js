import { useEffect, useState } from "react";

// define the custom hook
const useFetchSources = (apiKey) => {

   // State hooks to manage sources, loading state, and errors
    const [availableSources, setAvailableSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);


    // Function to fetch news sources
    const fetchSources = async () => {
        const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
        try {
          // shows loading state when fetch starts
          setLoading(true);
          const response = await fetch(url);

          // Handle non-OK responses (e.g., 404, 500 errors)
          if (!response.ok) throw new Error("Failed to fetch sources");

          const data = await response.json();

          // If API response is good, update sources; otherwise, throw an error
          if (data.status === "ok") {
            setAvailableSources(data.sources);
            const uniqueCategories = [
              ...new Set(data.sources.map((source) => source.category)),
            ];
            setCategories(uniqueCategories);
          } else {
            throw new Error("Error fetching sources");
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    // useEffect triggers fetch on mount
      useEffect(() => {
        fetchSources();
      }, []);

      // Return state so the main component can use it
      return { availableSources, loading, error, categories};
    };
    
    export default useFetchSources;