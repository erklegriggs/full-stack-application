package com.example.authentication.data.repository;

import com.example.authentication.data.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Integer> {

    @Query(value = "SELECT * from songs WHERE mixtape_id = :mixtape_id", nativeQuery = true)
    List<Song> findByMixtapeId(@Param("mixtape_id") int mixtapeId);
}
