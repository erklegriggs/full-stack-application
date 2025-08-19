package com.example.authentication.data.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "mixtapes")
public class Mixtape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mixtape_id")
    private int mixtapeId;


    @Column(name = "user_id")
    private String userId;


    @Column(name = "genre_id")
    private int genreId;


    @Column(name = "name")
    private String name;


    @Column(name = "description")
    private String description;


    @Column(name = "date")
    private Date date;


    @Column(name = "mixtape_pic_url")
    private String mixtapePicURL;

    @Transient
    private String username;


    public Mixtape() {
    }

    public Mixtape(int mixtapeId, String userId, int genreId, String name, String description, Date date, String mixtapePicURL, String username) {
        this.mixtapeId = mixtapeId;
        this.userId = userId;
        this.genreId = genreId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.mixtapePicURL = mixtapePicURL;
        this.username = username;
    }

    public int getMixtapeId() {
        return mixtapeId;
    }

    public void setMixtapeId(int mixtapeId) {
        this.mixtapeId = mixtapeId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMixtapePicURL() {
        return mixtapePicURL;
    }

    public void setMixtapePicURL(String mixtapePicURL) {
        this.mixtapePicURL = mixtapePicURL;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
