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

@CrossOrigin(origins = "http://localhost:80", allowCredentials = "true")
@RestController
@RequestMapping("/")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Hard-coded credentials for testing
    private static final String TEST_USERNAME = "nikshithareddy";
    private static final String TEST_PASSWORD = "nikshithareddy";

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        // Hardcoded username and password for testing
        if (TEST_USERNAME.equals(user.get("email")) && TEST_PASSWORD.equals(user.get("password"))) {
            String token = jwtUtil.generateToken(TEST_USERNAME);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // Check if user exists in the database
        List<User> users = userRepository.findByEmail(user.get("email"));
        if (users.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User userFromDb = users.get(0);

        if (passwordEncoder.matches(user.get("password"), userFromDb.getPassword())) {
            String token = jwtUtil.generateToken(userFromDb.getEmail());
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
