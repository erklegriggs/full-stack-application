package com.example.authentication.data.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "mixtapes")
public class Mixtape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mixtape_id")
    private int mixtapeId;


    @Column(name = "genre_id")
    private int genreId;


    @Column(name = "name")
    private String name;


    @Column(name = "description")
    private String description;


    @Column(name = "date")
    private LocalDate date;


    @Column(name = "mixtape_pic_url")
    private String mixtapePicURL;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("mixtapes")
    private User user;

    @Column(name = "user_id", insertable = false, updatable = false)
    private UUID userId;


    public Mixtape() {
    }

    public Mixtape(int mixtapeId, int genreId, String name, String description, LocalDate date, String mixtapePicURL) {
        this.mixtapeId = mixtapeId;
        this.genreId = genreId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.mixtapePicURL = mixtapePicURL;
    }

    public int getMixtapeId() {
        return mixtapeId;
    }

    public void setMixtapeId(int mixtapeId) {
        this.mixtapeId = mixtapeId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMixtapePicURL() {
        return mixtapePicURL;
    }

    public void setMixtapePicURL(String mixtapePicURL) {
        this.mixtapePicURL = mixtapePicURL;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
