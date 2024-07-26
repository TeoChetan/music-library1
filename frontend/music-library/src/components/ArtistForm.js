import React, { useState } from 'react';

function ArtistForm({ onArtistAdded }) {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        } else {
            setImageFile(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        fetch('/api/artists', {
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
            setName('');
            setImageFile(null);
            onArtistAdded(data);
        })
        .catch(error => console.error('Error adding artist:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-400">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Artist Name" 
                    className="border border-gray-400 p-2 flex-grow rounded-md"
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="border p-2 flex-grow rounded-md"
                />
                <button type="submit" className="p-2 bg-black text-white rounded-md hover:bg-gray-500 transition duration-300">Add Artist</button>
            </div>
        </form>
    );
}

export default ArtistForm;
