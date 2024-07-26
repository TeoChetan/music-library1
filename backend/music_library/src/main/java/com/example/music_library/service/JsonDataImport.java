package com.example.music_library.service;

import com.example.music_library.model.Album;
import com.example.music_library.model.Artist;
import com.example.music_library.model.Song;
import com.example.music_library.repository.ArtistRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class JsonDataImport {
    @Autowired
    private ArtistRepository artistRepository;

    @PostConstruct
    public void importData() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Artist>> typeReference = new TypeReference<>() {};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/data.json");
        try {
            List<Artist> artists = mapper.readValue(inputStream, typeReference);
            for (Artist artist : artists) {
                for (Album album : artist.getAlbums()) {
                    album.setArtist(artist);
                    if (album.getDescription() != null) {
                        album.setDescription(album.getDescription().trim());
                    }
                    for (Song song : album.getSongs()) {
                        song.setAlbum(album);
                    }
                }
            }
            artistRepository.saveAll(artists);
        } catch (IOException e) {
            System.out.println("Unable to import data: " + e.getMessage());
        }
    }
}
