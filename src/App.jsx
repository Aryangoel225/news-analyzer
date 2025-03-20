import { useEffect, useState } from 'react';
import Card from './components/Card';
import useFetchSources from "./hooks/useFetchSources";
import './App.css';

function App() {
  // fetch source infomation
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log("API Key:", apiKey);
  const { availableSources, loading, error, categories } = useFetchSources(apiKey);

  // method to track the news sources
  const [sources, setSources] = useState([]);
  // method to track the input value
  const [input, setInput] = useState("");
  // method to track the filters
  const [selectedCategory, setSelectedCategory] = useState("");

  // add source to the list
  const addSource = (sourceId) => {
    if (!sourceId || sources.some((source) => source.id === sourceId)) {
      alert("Invalid or duplicate news source");
      return;
    }
    const selectedSource = availableSources.find((source) => source.id === sourceId);
    if (selectedSource) {
      setSources([...sources, selectedSource]);
      setInput("");
    } else {
      alert("Source not found");
    }
  };

  // remove source from the list
  const removeSource = (sourceToRemove) => {
    const updatedSources = sources.filter((source) => source.id !== sourceToRemove.id);
    setSources(updatedSources);
  }

  // Function to filter sources by category
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  // filter the sources
  const displayedSources = selectedCategory
    ? sources.filter((source) => source.category === selectedCategory)
    : sources;

  return (
    // Main Page
    <div className="main-page">
      <h1>News Source Analyser</h1>

      {/* Add News Source Section */}
      <div>
        <input
          type="text"
          placeholder="Enter news source"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addSource(input)}>Add</button>
      </div>

      <div className="dropdown-container">
      {/* Drop Down menu for News Sources */}
      <div className="dropdown">
        <label htmlFor="newsSources" className="dropdown-label">
          Select a news source
        </label>
        {loading ? (
          <p>Loading sources...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <select id="newsSources" defaultValue="">
            <option value="" disabled>
              Select a news source
            </option>
            {availableSources.map((source, index) => (
              <option key={index} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => {
            const dropdown = document.getElementById('newsSources');
            const selectedSourceId = dropdown.value;
            addSource(selectedSourceId);
          }}>
          Add Selected Source
        </button>
      </div>

      
      {/* Drop Down menu for Filter Sources */}
      <div className="dropdown-to-filter">
        <label htmlFor="newsFilters" className="dropdown-label">
          Filter by category
        </label>
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <select id="newsFilters" value={selectedCategory} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">
              All Categories
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>
      </div>

      {/* Display the news sources */}
      <div className='news-sources-box'>
        <h2 className="centered-title">Your News Sources</h2>
        <ul className='news-source-list'>
          {displayedSources.map((source, index) => (
            <Card key={index} source={source} onRemove={() => removeSource(source)} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;