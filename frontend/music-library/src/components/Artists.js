import React, { useState, useEffect } from "react";
import ArtistForm from "./ArtistForm";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import FooterSocialComponent from "./socials";
import Hero from "./hero2.jfif";
import { Link as ScrollLink, Element } from "react-scroll";

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = () => {
    fetch("/api/artists")
      .then((response) => response.json())
      .then((data) => {
        const uniqueArtists = data.reduce((acc, artist) => {
          if (!acc.find((a) => a.name === artist.name)) {
            acc.push(artist);
          }
          return acc;
        }, []);
        setArtists(uniqueArtists);
      })
      .catch((error) => console.error("Error fetching artists:", error));
  };

  const handleArtistAdded = (newArtist) => {
    if (!artists.find((a) => a.name === newArtist.name)) {
      setArtists([...artists, newArtist]);
    }
  };

  return (
    <div>
      <div className="relative bg-gray-900 text-white">
        <img
          src={Hero}
          alt="Hero"
          className="w-full h-96 object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Groove Gallery
          </h1>
          <div className="mt-6 space-x-4">
            <ScrollLink
              to="artist-title"
              smooth={true}
              duration={500}
              className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold cursor-pointer"
            >
              Artists
            </ScrollLink>
            <button
              className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold"
              onClick={() => navigate("/songs")}
            >
              Songs
            </button>
          </div>
        </div>
      </div>
      <SearchBox setFilteredArtists={setFilteredArtists} />

      <div className="ml-14 mb-20">
        <Element name="artist-title">
          <h1 className="text-2xl font-bold my-4 m-2">Artists</h1>
        </Element>
        <ArtistForm onArtistAdded={handleArtistAdded} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {(filteredArtists || artists).map((artist) => (
            <Link
              key={artist.id}
              to={`/artists/${artist.id}/albums`}
              className="bg-white w-60 shadow-md overflow-hidden "
            >
              <div
                key={artist.id}
                className="bg-white w-64 shadow-md overflow-hidden"
              >
                {artist.imageUrl && (
                  <div className="relative w-64 h-64">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-auto h-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                      <h3 className="text-lg font-bold">{artist.name}</h3>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FooterSocialComponent />
    </div>
  );
}

export default ArtistList;
