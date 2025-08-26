package com.example.authentication.data.repository;

import com.example.authentication.data.model.Mixtape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface MixtapeRepository extends JpaRepository<Mixtape, Integer> {


    @Query(value = "SELECT mixtape_id, user_id, genre_id, name, description, date, mixtape_pic_url FROM mixtapes WHERE user_id = :userId ORDER BY date DESC", nativeQuery = true)
    List<Mixtape> findByUserId(UUID userId);

    @Query("SELECT m FROM Mixtape m JOIN FETCH m.user ORDER BY m.date DESC")
    List<Mixtape> findAllMixtapesWithUsernames();

}
