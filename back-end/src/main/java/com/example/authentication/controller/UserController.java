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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import com.example.authentication.dto.JwtAuthenticationResponse;
import com.example.authentication.dto.SignInRequest;
import com.example.authentication.services.AuthenticationService;
import org.springframework.web.multipart.MultipartFile;

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

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
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

    @PostMapping("/{userId}/profile-pic")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<String> uploadProfilePic(@PathVariable UUID userId, @RequestParam("profilePic") MultipartFile file) {
        try {
            String fileName = userId + ".jpg";
            Path path = Paths.get("uploads/profile-pics/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            User user = userRepository.findById(userId).get();
            user.setProfilePicURL("/uploads/profile-pics/" + fileName);
            userRepository.save(user);

            return ResponseEntity.ok("Successfully uploaded!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed!");

        }
    }

}
