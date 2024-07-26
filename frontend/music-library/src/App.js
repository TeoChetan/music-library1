import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArtistList from "./components/Artists";
import AlbumPage from "./components/AlbumPage";
import SearchBox from "./components/SearchBox";
import Navbar from "./components/navbar";
import SongList from "./components/Songs";
import ContactUsPage from "./components/contactUsPage";

function App() {
  return (
    <Router>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ArtistList />} />
        <Route path="/artists/:artistId/albums" element={<AlbumPage />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/contactUs" element={<ContactUsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
