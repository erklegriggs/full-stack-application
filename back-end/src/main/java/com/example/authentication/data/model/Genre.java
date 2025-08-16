package com.example.authentication.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private int genreId;


    @Column(name = "name")
    private String name;


    public Genre() {
    }

    public Genre(String name) {
        this.name = name;
    }


    public int getGenreId() {
        return genreId;
    }

    public void setGenreId(int genreId) {
        this.genreId = genreId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
