package com.example.authentication.controller;

import com.example.authentication.data.model.Role;
import com.example.authentication.data.model.User;
import com.example.authentication.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;
import com.example.authentication.dto.JwtAuthenticationResponse;
import com.example.authentication.dto.SignInRequest;
import com.example.authentication.services.AuthenticationService;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController implements Serializable {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationService authenticationService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping()
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/me")
    public User getThisUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)principal).getUsername();
        return userRepository.findByUsername(username);
    }

    @PostMapping("/login")
    public JwtAuthenticationResponse signup(@RequestBody SignInRequest request) {
        return authenticationService.signin(request);
    }

    @PostMapping("/signup")
    public JwtAuthenticationResponse signin(@RequestBody SignInRequest request) {
        return authenticationService.signup(request);
    }

}
