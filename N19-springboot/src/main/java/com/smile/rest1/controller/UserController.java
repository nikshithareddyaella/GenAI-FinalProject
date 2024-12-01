package com.smile.rest1.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.smile.rest1.dao.UserRepo;
import com.smile.rest1.model.User;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin/student")
public class UserController {

    @Autowired
    private UserRepo userRepository;

    // Student mappings
    @GetMapping("")
    public List<User> student() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Map<String, Object> studentById(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            response.put("message", "User not found");
            response.put("status", "error");
            return response;
        }

        response.put("user", user);
        response.put("status", "success");
        return response;
    }


    @PostMapping("")
    public User addStudent(@RequestBody User user) {
        System.out.println(user);
        return userRepository.save(user);
        // return student;
    }

    @PutMapping("")
    public User updateStudent(@RequestBody User user) {
        System.out.println(user);
        return userRepository.save(user);
        // return student;
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteStudent(@PathVariable Integer id) {
        userRepository.deleteById(id);
        HashMap<String, String> res = new HashMap<String, String>();
        res.put("message", "Student deleted with id: " + id);
        return res;
    }
}
