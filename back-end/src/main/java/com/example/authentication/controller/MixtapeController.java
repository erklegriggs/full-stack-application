package com.example.authentication.controller;

import com.example.authentication.data.model.Mixtape;
import com.example.authentication.data.model.User;
import com.example.authentication.data.repository.MixtapeRepository;
import com.example.authentication.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@CrossOrigin
@RequestMapping("/api/mixtapes")
public class MixtapeController {

    @Autowired
    MixtapeRepository mixtapeRepository;

    @Autowired
    UserRepository userRepository;

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping()
    public ResponseEntity<List<Mixtape>> getMixtapes() {
        List<Mixtape> mixtapes = mixtapeRepository.findAllMixtapesWithUsernames();
        return ResponseEntity.ok(mixtapes);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Mixtape> getMixtape(@PathVariable Integer id) {
        Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(id);

        if (mixtapeOptional.isPresent()) {
            return ResponseEntity.ok(mixtapeOptional.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping(params = "userId")
    public ResponseEntity<List<Mixtape>> getUsersMixtapes(@RequestParam(name = "userId") UUID userId) {
        return ResponseEntity.ok(mixtapeRepository.findByUserId(userId));
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Mixtape> addMixtape(@RequestBody Mixtape mixtape) {
        try {
            UUID userId = mixtape.getUserId();
            User user = userRepository.findById(userId).orElse(null);
            if(user == null) {
                return ResponseEntity.badRequest().build();
            }
            mixtape.setUser(user);
            mixtape.setDate(LocalDate.now());

            mixtape = mixtapeRepository.saveAndFlush(mixtape);
            return ResponseEntity.status(HttpStatus.CREATED).body(mixtape);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PutMapping
    public ResponseEntity<Mixtape> updateMixtape(@RequestBody Mixtape mixtape) {
        Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(mixtape.getMixtapeId());

        if(mixtapeOptional.isPresent()) {
            return ResponseEntity.ok(mixtapeRepository.saveAndFlush(mixtape));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMixtape(@PathVariable Integer id) {
        if(mixtapeRepository.existsById(id)) {
            mixtapeRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping("/{id}/picture")
    public ResponseEntity<String> uploadMixtapePic(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
        Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(id);
        try {
            String fileName = id + ".jpg";
            Path path = Paths.get("uploads/mixtape-pics/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            if(mixtapeOptional.isPresent()) {
                Mixtape mixtape = mixtapeOptional.get();
                mixtape.setMixtapePicURL("/uploads/mixtape-pics/" + fileName);
                mixtapeRepository.save(mixtape);
            }
            return ResponseEntity.ok("Cover successfully uploaded!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to upload cover!");
        }
    }






}

