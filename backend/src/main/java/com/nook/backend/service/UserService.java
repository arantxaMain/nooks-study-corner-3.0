package com.nook.backend.service;

import com.nook.backend.model.User;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final List<User> users;

    public UserService() {
        users = new ArrayList<>();
        
        User canela = new User();
        canela.setName("Canela");
        canela.setEmail("canela@nook.com");
        
        User tomNook = new User();
        tomNook.setName("Tom Nook");
        tomNook.setEmail("tom@nook.com");
        
        User totakeke = new User();
        totakeke.setName("Totakeke");
        totakeke.setEmail("kk@nook.com");
        
        users.add(canela);
        users.add(tomNook);
        users.add(totakeke);
    }

    public Optional<User> findByEmailAndName(String email, String name) {
        return users.stream()
                .filter(user -> user.getEmail().equals(email) && user.getName().equals(name))
                .findFirst();
    }

    public List<User> getAllUsers() {
        return users;
    }
}