package com.example.authentication.data.repository;

import com.example.authentication.data.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Integer> {
    List<Song> findByMixtapeId(Integer mixtapeId);
}
