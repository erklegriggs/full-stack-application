package com.example.authentication.controller;

import com.example.authentication.data.model.Mixtape;
import com.example.authentication.data.repository.MixtapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/mixtapes")
public class MixtapeController {

    @Autowired
    MixtapeRepository mixtapeRepository;

    @GetMapping()
    public ResponseEntity<List<Mixtape>> getMixtapes() {
        List<Mixtape> mixtapes = mixtapeRepository.findAll();
        return ResponseEntity.ok(mixtapes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mixtape> getMixtapes(@PathVariable Integer id) {
        Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(id);

        if (mixtapeOptional.isPresent()) {
            return ResponseEntity.ok(mixtapeOptional.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping(params = "userId")
    public ResponseEntity<List<Mixtape>> getUsersMixtapes(@RequestParam(name = "userId") String userId) {
        return ResponseEntity.ok(mixtapeRepository.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Mixtape> addMixtape(@RequestBody Mixtape mixtape) {
        // auto populating Date field with current date
        mixtape.setDate(Date.valueOf(LocalDate.now()));
        mixtape = mixtapeRepository.saveAndFlush(mixtape);

        return ResponseEntity.status(HttpStatus.CREATED).body(mixtape);
    }

    @PutMapping
    public ResponseEntity<Mixtape> updateMixtape(@RequestBody Mixtape mixtape) {
        Optional<Mixtape> mixtapeOptional = mixtapeRepository.findById(mixtape.getMixtapeId());

        if(mixtapeOptional.isPresent()) {
            return ResponseEntity.ok(mixtapeRepository.saveAndFlush(mixtape));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMixtape(@PathVariable Integer id) {
        if(mixtapeRepository.existsById(id)) {
            mixtapeRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }






}

