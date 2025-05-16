package com.nook.backend.service;

import com.nook.backend.model.User;
import com.nook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("El correo electrónico ya está registrado");
        }

        if (user.getWorkDuration() == null) {
            user.setWorkDuration(1500);
        }
        if (user.getBreakDuration() == null) {
            user.setBreakDuration(300);
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    public User updateUser(User updatedUser) {
        Optional<User> existingUser = userRepository.findById(updatedUser.getId());
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            
            if (updatedUser.getNewPassword() != null && !updatedUser.getNewPassword().isEmpty()) {
                if (!passwordEncoder.matches(updatedUser.getCurrentPassword(), user.getPassword())) {
                    throw new RuntimeException("La contraseña actual es incorrecta");
                }
                user.setPassword(passwordEncoder.encode(updatedUser.getNewPassword()));
            }
            
            user.setWorkDuration(updatedUser.getWorkDuration());
            user.setBreakDuration(updatedUser.getBreakDuration());
            
            return userRepository.save(user);
        }
        throw new RuntimeException("Usuario no encontrado");
    }

    public User findById(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public Map<String, Integer> getStudyMinutesLast30Days(String userId) {
        User user = findById(userId);
        Map<String, Integer> studyMinutes = user.getStudyMinutes();
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
        Map<String, Integer> last30DaysMap = new LinkedHashMap<>();
    
        for (int i = 29; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            String formattedDate = date.format(formatter);
            int minutes = studyMinutes.getOrDefault(formattedDate, 0);
            last30DaysMap.put(formattedDate, minutes);
        }
    
        return last30DaysMap;
    }
    
}