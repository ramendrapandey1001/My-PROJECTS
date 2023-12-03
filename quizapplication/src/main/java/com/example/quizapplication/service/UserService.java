package com.example.quizapplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quizapplication.dao.UserRepo;
import com.example.quizapplication.model.User;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public List<User> getAllUser() {
        return userRepo.findAll();
    }

}
