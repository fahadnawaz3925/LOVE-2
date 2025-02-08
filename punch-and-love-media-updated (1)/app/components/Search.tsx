"use client"

import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import { searchWikipedia } from "../actions/searchWikipedia"
import Results from "./Results"

export default function Search() {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 2) {
        setLoading(true)
        setError(null)
        try {
          const data = await searchWikipedia(debouncedQuery)
          setResults(data)
          setSuggestions([])
        } catch (err) {
          console.error("Error in fetchResults:", err)
          setError(err.message || "An error occurred while fetching results")
          setResults([])
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
      }
    }

    fetchResults()
  }, [debouncedQuery])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const data = await searchWikipedia(query, 5)
          setSuggestions(data.map((item) => item.name))
        } catch (err) {
          console.error("Error fetching suggestions:", err)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [query])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setSuggestions([])
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search for a person..."
          className="w-full p-4 border-2 border-pink-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-800 border-2 border-pink-500 rounded-lg mt-1 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-gray-700 cursor-pointer text-white"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && <p className="text-center mt-4 text-yellow-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">Error: {error}</p>}
      {!loading && !error && results.length === 0 && query.length > 2 && (
        <p className="text-center mt-4 text-yellow-500">No results found</p>
      )}
      {!loading && !error && results.length > 0 && <Results results={results} />}
    </div>
  )
}

