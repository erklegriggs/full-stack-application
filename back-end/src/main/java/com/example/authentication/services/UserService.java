package com.example.authentication.services;


import com.example.authentication.data.model.User;
import com.example.authentication.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    // TODO: Check if username already exists in database when signing them up
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                try{
                    return userRepository.findByUsername(username);
                }
                catch(Exception e) {
                   throw new UsernameNotFoundException("User not found");
                }

            }
        };
    }

    public User save(User newUser) {
        return userRepository.save(newUser);
    }

}