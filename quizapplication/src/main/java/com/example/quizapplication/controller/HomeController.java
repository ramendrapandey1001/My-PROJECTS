package com.example.quizapplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizapplication.dao.UserRepo;
import com.example.quizapplication.model.Questions;
import com.example.quizapplication.model.User;
import com.example.quizapplication.service.QuestionService;

@CrossOrigin
@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    QuestionService questionService;

    @Autowired
    UserRepo userRepo;

    @GetMapping("/getall")
    public List<User> callUser() {
        return userRepo.findAll();
    }

    @GetMapping("/register")
    public User call() {
        User user = new User();
        user.setSessionid("10");
        user.setUsername("ramendra");
        user.setPassword("12345");
        return user;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userRepo.save(user);

        return "New user" + user.getUsername() + "Regestred";

    }

    {

    }

    @GetMapping("/questions")
    public List<Questions> getQuestion() {
        return questionService.getAllQuestions();
    }

}
