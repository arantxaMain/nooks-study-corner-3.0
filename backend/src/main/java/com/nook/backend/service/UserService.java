package com.nook.backend.service;

import com.nook.backend.model.User;
import com.nook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByEmailAndName(String email, String name) {
        return userRepository.findByEmailAndName(email, name);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}