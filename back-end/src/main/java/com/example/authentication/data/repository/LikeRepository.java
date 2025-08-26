package com.example.authentication.data.repository;

import com.example.authentication.data.model.Like;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {

    @Query(value = "SELECT * FROM likes WHERE user_id = :userId", nativeQuery = true)
    List<Like> findLikesByUserId(String userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM likes WHERE user_id = :userId AND mixtape_id = :mixtapeId", nativeQuery = true)
    void removeByUserIdMixtapeId(String userId, int mixtapeId);

    Optional<Like> findByUserIdAndMixtapeId(String userId, int mixtapeId);






}
