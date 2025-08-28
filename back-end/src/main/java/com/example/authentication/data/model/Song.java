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


    @Column(name = "song_audio_url")
    private String songAudioUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "mixtape_id")
    private Mixtape mixtape;


    public Song() {
    }

    public Song(int userId, int mixtapeId, String name, String songAudioUrl) {
        this.name = name;
        this.songAudioUrl = songAudioUrl;
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

    public String getSongAudioUrl() {
        return songAudioUrl;
    }

    public void setSongAudioUrl(String songAudioUrl) {
        this.songAudioUrl = songAudioUrl;
    }
}
