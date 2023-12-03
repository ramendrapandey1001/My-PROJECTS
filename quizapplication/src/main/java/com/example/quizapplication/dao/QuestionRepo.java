package com.example.quizapplication.dao;

import com.example.quizapplication.model.Questions;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepo extends MongoRepository<Questions, String> {

}
