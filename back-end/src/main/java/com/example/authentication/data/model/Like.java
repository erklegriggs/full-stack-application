package com.example.authentication.data.model;


import jakarta.persistence.*;

@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private int likeId;


    @Column(name = "user_id")
    private String userId;


    @Column(name = "mixtape_id")
    private int mixtapeId;


    public Like() {
    }

    public Like(String userId, int mixtapeId) {
        this.userId = userId;
        this.mixtapeId = mixtapeId;
    }



    public int getLikeId() {
        return likeId;
    }

    public void setLikeId(int likeId) {
        this.likeId = likeId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getMixtapeId() {
        return mixtapeId;
    }

    public void setMixtapeId(int mixtapeId) {
        this.mixtapeId = mixtapeId;
    }
}
