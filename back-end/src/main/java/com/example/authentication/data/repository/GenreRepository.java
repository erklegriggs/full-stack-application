package com.example.authentication.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.authentication.data.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer> {


}
