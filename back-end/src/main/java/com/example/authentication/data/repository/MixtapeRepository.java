package com.example.authentication.data.repository;

import com.example.authentication.data.model.Mixtape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MixtapeRepository extends JpaRepository<Mixtape, Integer> {


    @Query(value = "SELECT mixtape_id, user_id, genre_id, name, description, date, mixtape_pic_url FROM mixtapes WHERE user_id = :userId ORDER BY date DESC", nativeQuery = true)
    List<Mixtape> findByUserId(String userId);

}
