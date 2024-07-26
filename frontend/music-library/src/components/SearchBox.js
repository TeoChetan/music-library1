import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBox({ setFilteredArtists }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value.length > 2) {
            fetch(`/api/artists/search?q=${value}`)
                .then(response => response.json())
                .then(data => {
                    const uniqueSuggestions = Array.from(new Set(data.map(item => item.name)))
                        .map(name => data.find(item => item.name === name));
                    setSuggestions(uniqueSuggestions);
                })
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
            setFilteredArtists(null); 
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setFilteredArtists([suggestion]);
        setSuggestions([]);
    };

    return (
        <div className="flex justify-center items-center my-8">
            <div className="w-full max-w-md relative">
                <input 
                    type="text" 
                    value={query} 
                    onChange={handleInputChange} 
                    placeholder="Search artists..." 
                    className="border p-2 w-full pl-10 rounded-2xl border border-black"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
                {suggestions.length > 0 && (
                    <ul className="bg-white border mt-2 p-2 space-y-2 rounded-lg shadow-md absolute w-full">
                        {suggestions.map(suggestion => (
                            <li 
                                key={suggestion.id} 
                                className="text-lg cursor-pointer hover:bg-gray-200 p-2 rounded"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SearchBox;
