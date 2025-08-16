package com.example.authentication.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private int songId;


    @Column(name = "user_id")
    private int userId;


    @Column(name = "mixtape_id")
    private int mixtapeId;


    @Column(name = "name")
    private String name;


    @Column(name = "duration")
    private Integer duration;


    @Column(name = "song_pic_url")
    private String songPicURL;


    public Song() {
    }

    public Song(int userId, int mixtapeId, String name, Integer duration, String songPicURL) {
        this.userId = userId;
        this.mixtapeId = mixtapeId;
        this.name = name;
        this.duration = duration;
        this.songPicURL = songPicURL;
    }

    public int getSongId() {
        return songId;
    }

    public void setSongId(int songId) {
        this.songId = songId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMixtapeId() {
        return mixtapeId;
    }

    public void setMixtapeId(int mixtapeId) {
        this.mixtapeId = mixtapeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getSongPicURL() {
        return songPicURL;
    }

    public void setSongPicURL(String songPicURL) {
        this.songPicURL = songPicURL;
    }
}
