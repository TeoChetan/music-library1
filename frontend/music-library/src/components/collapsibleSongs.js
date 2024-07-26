import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

function CollapsibleSongs({ album }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [length, setLength] = useState('');
    const [songs, setSongs] = useState(album.songs);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [description, setDescription] = useState(album.description);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('length', length);

        fetch(`/api/albums/${album.id}/songs`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setSongs([...songs, data]);
            setTitle('');
            setLength('');
        })
        .catch(error => console.error('Error adding song:', error));
    };

    const handleDelete = (songId) => {
        fetch(`/api/albums/${album.id}/songs/${songId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setSongs(songs.filter(song => song.id !== songId));
        })
        .catch(error => console.error('Error deleting song:', error));
    };

    const handleUpdateDescription = () => {
        const formData = new FormData();
        formData.append('description', description);

        fetch(`/api/albums/${album.id}`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setDescription(data.description);
            setIsEditingDescription(false);
        })
        .catch(error => console.error('Error updating description:', error));
    };

    return (
        <div className="mb-4">
            <div
                className="flex justify-between items-center p-4 bg-gray-800 text-white cursor-pointer"
                onClick={toggleOpen}
            >
                <div className="flex items-center">
                    <img src={album.albumImgUrl} alt={album.title} className="w-12 h-12 mr-4 rounded-full" />
                    <div>
                        <h3 className="text-lg font-bold">{album.title}</h3>
                    </div>
                </div>
                <div>{isOpen ? '▲' : '▼'}</div>
            </div>
            {isOpen && (
                <div className="bg-gray-700">
                    <div className="p-4">
                        {isEditingDescription ? (
                            <div className="flex items-center space-x-2">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border border-gray-400 p-2 rounded-md flex-grow"
                                />
                                <button
                                    onClick={handleUpdateDescription}
                                    className="p-2 bg-black text-white rounded-md hover:bg-gray-500 transition duration-300"
                                >
                                    <FaSave />
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <p className="text-white mb-4">{description}</p>
                                <button
                                    onClick={() => setIsEditingDescription(true)}
                                    className="text-yellow-400 hover:text-yellow-600"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-400">
                            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    placeholder="Song Title" 
                                    className="border border-gray-400 p-2 flex-grow rounded-md"
                                />
                                <input 
                                    type="text" 
                                    value={length} 
                                    onChange={(e) => setLength(e.target.value)} 
                                    placeholder="Length" 
                                    className="border border-gray-400 p-2 flex-grow rounded-md"
                                />
                                <button type="submit" className="p-2 bg-black text-white rounded-md hover:bg-gray-500 transition duration-300">Add Song</button>
                            </div>
                        </form>
                    </div>
                    {songs.map(song => (
                        <div key={song.id} className="flex justify-between items-center p-4 bg-gray-800 text-white">
                            <div className="flex items-center">
                                <img src={album.albumImgUrl} alt={song.title} className="w-12 h-12 mr-4 rounded-full" />
                                <div>
                                    <h4 className="text-md">{song.title}</h4>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4">{song.length}</span>
                                <button onClick={() => handleDelete(song.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollapsibleSongs;
