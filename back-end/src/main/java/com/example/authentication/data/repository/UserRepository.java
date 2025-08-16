package com.example.authentication.data.repository;

import com.example.authentication.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    public User findByUsername(String username);
}
