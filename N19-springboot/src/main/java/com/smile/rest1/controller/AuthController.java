package com.smile.rest1.controller;

import com.smile.rest1.dao.UserRepo;
import com.smile.rest1.model.User;
import com.smile.rest1.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder


    @PostMapping("login")
    public Map<String, String> login(@RequestBody Map<String, String> user) {
        List<User> users = userRepository.findByEmail(user.get("email"));
        Map<String, String> response = new HashMap<>();

        if (users.isEmpty()) {
            response.put("message", "User not found");
            return response;
        }

        User student = users.get(0);

        if (passwordEncoder.matches(user.get("password"), student.getPassword())) {
            String token = jwtUtil.generateToken(student.getEmail());
            response.put("message", "Login successful");
            response.put("token", token);
        } else {
            response.put("message", "Invalid password");
        }
        return response;
    }

    @PostMapping("register")
    public Map<String, String> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // Check if email already exists
        if (!userRepository.findByEmail(user.getEmail()).isEmpty()) {
            response.put("message", "Email already exists");
            return response;
        }

        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        response.put("message", "User registered successfully");
        return response;
    }
}
