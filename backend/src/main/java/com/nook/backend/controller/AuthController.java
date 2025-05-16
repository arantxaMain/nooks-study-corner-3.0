package com.nook.backend.controller;

import com.nook.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import com.nook.backend.model.User;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
        return userService.login(request.email(), request.password())
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).body("Usuario no encontrado"));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar el registro");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(user);
            updatedUser.setPassword(null);
            updatedUser.setCurrentPassword(null);
            updatedUser.setNewPassword(null);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el usuario");
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable String userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el usuario");
        }
    }

    @PutMapping("/users/{userId}/study-minutes")
    public ResponseEntity<User> updateStudyMinutes(
            @PathVariable String userId,
            @RequestParam String date,
            @RequestParam Integer minutes) {

        User user = userService.findById(userId);
        Map<String, Integer> studyMinutes = user.getStudyMinutes();
        studyMinutes.merge(date, minutes, Integer::sum);
        user.setStudyMinutes(studyMinutes);

        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/users/{userId}/study-minutes/last-30-days")
    public ResponseEntity<Map<String, Integer>> getStudyMinutesLast30Days(@PathVariable String userId) {
        Map<String, Integer> studyMinutes = userService.getStudyMinutesLast30Days(userId);
        return ResponseEntity.ok(studyMinutes);
    }
}

record LoginRequest(String email, String password) {
}