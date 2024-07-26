import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleSongs from './collapsibleSongs';

function AlbumPage() {
    const { artistId } = useParams();
    const [albums, setAlbums] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/artists/${artistId}/albums`)
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.error('Error fetching albums:', error));
    }, [artistId]);

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
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imageFile);

        fetch(`/api/artists/${artistId}/albums`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setTitle('');
            setDescription('');
            setImageFile(null);
            setAlbums([...albums, data]);
        })
        .catch(error => console.error('Error adding album:', error));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Albums</h2>
            <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-400">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Album Title" 
                        className="border border-gray-400 p-2 flex-grow rounded-md"
                    />
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Album Description" 
                        className="border border-gray-400 p-2 flex-grow rounded-md"
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="border p-2 flex-grow rounded-md"
                    />
                    <button type="submit" className="p-2 bg-black text-white rounded-md hover:bg-gray-500 transition duration-300">Add Album</button>
                </div>
            </form>
            <div className="grid grid-cols-1 gap-4">
                {albums.map(album => (
                    <CollapsibleSongs key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
}

export default AlbumPage;
