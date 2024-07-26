package com.example.music_library.controller;

import com.example.music_library.model.Album;
import com.example.music_library.model.Artist;
import com.example.music_library.repository.AlbumRepository;
import com.example.music_library.repository.ArtistRepository;
import com.example.music_library.service.GoogleCloudStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private GoogleCloudStorageService googleCloudStorageService;

    @GetMapping
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @PostMapping
    public Artist createArtist(@RequestParam("name") String name, @RequestParam("image") MultipartFile image) throws IOException {
        String imageUrl = googleCloudStorageService.uploadFile(image);
        Artist artist = new Artist();
        artist.setName(name);
        artist.setImageUrl(imageUrl);
        return artistRepository.save(artist);
    }

    @GetMapping("/{artistId}/albums")
    public List<Album> getAlbumsByArtist(@PathVariable Long artistId) {
        return albumRepository.findByArtistId(artistId);
    }

    @GetMapping("/search")
    public List<Artist> searchArtists(@RequestParam String q) {
        return artistRepository.findByNameContainingIgnoreCase(q);
    }

    @PostMapping("/{artistId}/albums")
    public Album addAlbumToArtist(@PathVariable Long artistId, @RequestParam("title") String title, @RequestParam("description") String description, @RequestParam("image") MultipartFile image) throws IOException {
        String albumImgUrl = googleCloudStorageService.uploadFile(image);
        Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new RuntimeException("Artist not found"));
        Album album = new Album();
        album.setTitle(title);
        album.setDescription(description);
        album.setAlbumImgUrl(albumImgUrl);
        album.setArtist(artist);
        return albumRepository.save(album);
    }

}
