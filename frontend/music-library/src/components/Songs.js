import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SongList() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => {
        const uniqueSongs = filterUniqueSongs(data);
        setSongs(uniqueSongs);
        setFilteredSongs(uniqueSongs);
      })
      .catch(error => console.error('Error fetching songs:', error));
  };

  const filterUniqueSongs = (songs) => {
    const seen = new Set();
    return songs.filter(song => {
      const duplicate = seen.has(song.title);
      seen.add(song.title);
      return !duplicate;
    });
  };

  const handleSearch = (query) => {
    setQuery(query);
    if (query.length > 2) {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold my-4">Songs</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search songs..."
          className="border p-2 rounded-l-md flex-grow"
        />
        <div className="bg-gray-300 p-2 rounded-r-md">
          <AiOutlineSearch />
        </div>
      </div>
      <ul className="space-y-4">
        {filteredSongs.map(song => (
          <li key={song.id} className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold">{song.title}</h3>
            <p>Length: {song.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
