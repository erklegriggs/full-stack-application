package com.example.authentication.controller;

import com.example.authentication.data.model.Song;
import com.example.authentication.data.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    @Autowired
    SongRepository songRepository;

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/mixtape/{mixtapeId}")
    public ResponseEntity<List<Song>> getSongsByMixtape(@PathVariable Integer mixtapeId) {
        List<Song> songs = songRepository.findByMixtapeId(mixtapeId);
        return ResponseEntity.ok(songs);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Song> addSong(@RequestBody Song song) {
        song = songRepository.save(song);
        return ResponseEntity.status(HttpStatus.CREATED).body(song);
    }
}
