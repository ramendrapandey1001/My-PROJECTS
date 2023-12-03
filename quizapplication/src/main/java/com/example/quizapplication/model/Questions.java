package com.example.quizapplication.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;

//import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Questions")

public class Questions {
    @Id
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctoption;
    private int difficulty;
    private String catagory;
}