package com.example.authentication.controller;

import com.example.authentication.data.model.Mixtape;
import com.example.authentication.data.model.Song;
import com.example.authentication.data.repository.MixtapeRepository;
import com.example.authentication.data.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/songs")
public class SongController {

    @Autowired
    SongRepository songRepository;

    @Autowired
    MixtapeRepository mixtapeRepository;

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        return ResponseEntity.ok(songs);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/mixtape/{mixtapeId}")
    public ResponseEntity<List<Song>> getSongsByMixtape(@PathVariable Integer mixtapeId) {
        List<Song> songs = songRepository.findByMixtapeId(mixtapeId);
        return ResponseEntity.ok(songs);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping("/mixtape/{mixtapeId}")
    public ResponseEntity<Song> addSongToMixtape(@PathVariable Integer mixtapeId, @RequestBody Song song) {
        Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(mixtapeId);
        if(mixtapeOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        song.setMixtape(mixtapeOptional.get());
        song = songRepository.saveAndFlush(song);
        return ResponseEntity.status(HttpStatus.CREATED).body(song);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{songId}")
    public ResponseEntity<Void> deleteSong(@PathVariable Integer songId) {
        if(songRepository.existsById(songId)) {
            songRepository.deleteById(songId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
