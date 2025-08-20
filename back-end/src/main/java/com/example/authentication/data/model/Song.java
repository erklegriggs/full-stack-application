package com.example.authentication.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private int songId;


    @Column(name = "name")
    private String name;


    @Column(name = "duration")
    private Integer duration;


    @Column(name = "song_pic_url")
    private String songPicURL;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "mixtape_id")
    private Mixtape mixtape;


    public Song() {
    }

    public Song(int userId, int mixtapeId, String name, Integer duration, String songPicURL) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Mixtape getMixtape() {
        return mixtape;
    }

    public void setMixtape(Mixtape mixtape) {
        this.mixtape = mixtape;
    }
}
