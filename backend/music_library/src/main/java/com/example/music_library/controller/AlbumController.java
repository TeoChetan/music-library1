package com.example.music_library.controller;

import com.example.music_library.model.Album;
import com.example.music_library.model.Song;
import com.example.music_library.repository.AlbumRepository;
import com.example.music_library.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {
    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private SongRepository songRepository;

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }


    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @PostMapping("/{albumId}/songs")
    public Song addSongToAlbum(@PathVariable Long albumId, @RequestParam("title") String title, @RequestParam("length") String length) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"));
        Song song = new Song();
        song.setTitle(title);
        song.setLength(length);
        song.setAlbum(album);
        return songRepository.save(song);
    }

    @DeleteMapping("/{albumId}/songs/{songId}")
    public ResponseEntity<Void> deleteSongFromAlbum(@PathVariable Long albumId, @PathVariable Long songId) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"));
        Song song = songRepository.findById(songId).orElseThrow(() -> new RuntimeException("Song not found"));

        if (!song.getAlbum().getId().equals(album.getId())) {
            throw new RuntimeException("Song does not belong to the specified album");
        }

        songRepository.delete(song);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{albumId}")
    public ResponseEntity<Album> updateAlbumDescription(@PathVariable Long albumId, @RequestParam("description") String description) {
        Album album = albumRepository.findById(albumId).orElseThrow(() -> new RuntimeException("Album not found"));
        album.setDescription(description);
        albumRepository.save(album);
        return ResponseEntity.ok(album);
    }


}
