package com.smile.rest1.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smile.rest1.model.User;

public interface UserRepo extends JpaRepository<User, Integer> {
    // public List<Student> findAll();
    public List<User> findByEmail(String email);

}
