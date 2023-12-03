package com.example.quizapplication.service;

import com.example.quizapplication.model.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quizapplication.dao.QuestionRepo;

@Service
public class QuestionService {

    @Autowired
    QuestionRepo questionRepo;

    public List<Questions> getAllQuestions() {
        return questionRepo.findAll();
    }
}
