package com.example.quizapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication

public class QuizapplicationApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(QuizapplicationApplication.class, args);
		System.out.println(context);
	}

}
