package com.smile.rest1.controller;

import com.smile.rest1.dao.UserRepo;
import com.smile.rest1.security.JwtUtil;
import com.smile.rest1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        List<User> users = userRepository.findByEmail(user.get("email"));
        if (users.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User student = users.get(0);

        if (passwordEncoder.matches(user.get("password"), student.getPassword())) {
            String token = jwtUtil.generateToken(student.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("register")
    public Map<String, String> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // Check if email already exists
        if (!userRepository.findByEmail(user.getEmail()).isEmpty()) {
            response.put("message", "Email already exists");
            return response;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        response.put("message", "User registered successfully");
        return response;
    }
}
