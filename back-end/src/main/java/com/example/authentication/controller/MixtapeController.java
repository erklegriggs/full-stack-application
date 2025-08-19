package com.example.authentication.controller;

import com.example.authentication.data.model.Mixtape;
import com.example.authentication.data.repository.MixtapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin
@RequestMapping("/api/mixtapes")
public class MixtapeController {

    @Autowired
    MixtapeRepository mixtapeRepository;

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping()
    public ResponseEntity<List<Mixtape>> getMixtapes() {
        List<Mixtape> mixtapes = mixtapeRepository.findAll();
        for(Mixtape mixtape : mixtapes) {
            String username = mixtapeRepository.findUserNameByUserId(mixtape.getUserId());
            mixtape.setUsername(username);
        }
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
    public ResponseEntity<List<Mixtape>> getUsersMixtapes(@RequestParam(name = "userId") String userId) {
        return ResponseEntity.ok(mixtapeRepository.findByUserId(userId));
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Mixtape> addMixtape(@RequestBody Mixtape mixtape) {
        // auto populating Date field with current date
        mixtape.setDate(Date.valueOf(LocalDate.now()));
        mixtape = mixtapeRepository.saveAndFlush(mixtape);

        return ResponseEntity.status(HttpStatus.CREATED).body(mixtape);
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






}

