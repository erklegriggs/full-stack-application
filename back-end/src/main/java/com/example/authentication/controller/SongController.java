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
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    public ResponseEntity<Song> addSongToMixtape(@PathVariable Integer mixtapeId, @RequestParam("name") String name, @RequestParam("audioFile") MultipartFile file) {
        try {
            Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(mixtapeId);
            if(mixtapeOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            String fileName = UUID.randomUUID() + ".mp3";
            Path path = Paths.get("uploads/songs/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            Song song = new Song();
            song.setName(name);
            song.setSongAudioUrl("/uploads/songs/" + fileName);
            song.setMixtape(mixtapeOptional.get());
            song.setUser(mixtapeOptional.get().getUser());

            return ResponseEntity.ok(songRepository.save(song));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
