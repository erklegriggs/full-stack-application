package com.example.authentication.controller;

import com.example.authentication.data.model.Like;
import com.example.authentication.data.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    LikeRepository likeRepository;


    @GetMapping(params = "userId")
    public ResponseEntity<List<Like>> getUsersLikes(@RequestParam(name = "userId") String userId) {
        return ResponseEntity.ok(likeRepository.findLikesByUserId(userId));
    }
    
    @PostMapping
    public ResponseEntity<Like> addLikes(@RequestBody Like like) {
        // ensuring no duplicate likes
        Optional<Like> currentlyLiked = likeRepository.findByUserIdAndMixtapeId(like.getUserId(), like.getMixtapeId());
        if(currentlyLiked.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        like = likeRepository.saveAndFlush(like);
        return ResponseEntity.status(HttpStatus.CREATED).body(like);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteLikes(@RequestParam String userId, @RequestParam Integer mixtapeId) {
        likeRepository.removeByUserIdMixtapeId(userId, mixtapeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }



}
