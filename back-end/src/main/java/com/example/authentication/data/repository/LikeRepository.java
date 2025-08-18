package com.example.authentication.data.repository;

import com.example.authentication.data.model.Like;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Integer> {

    @Query(value = "SELECT * FROM likes WHERE user_id = :userId ORDER BY created_at DESC", nativeQuery = true)
    List<Like> findLikesByUserId(String userId);

    @Query(value = "SELECT COUNT(*) > 0 FROM likes WHERE user_id = :userId AND mixtape_id = :mixtapeId", nativeQuery = true)
    boolean likedByUserIdMixtapeId(String userId, int mixtapeId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM likes WHERE user_id = :userId AND mixtape_id = :mixtapeId", nativeQuery = true)
    void removeByUserIdMixtapeId(String userId, int mixtapeId);






}
