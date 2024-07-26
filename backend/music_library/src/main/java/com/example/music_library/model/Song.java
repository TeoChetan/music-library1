package com.example.music_library.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String length;

    @ManyToOne
    @JoinColumn(name = "album_id")
    @JsonBackReference
    private Album album;
}
