package com.example.quizapplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.quizapplication.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

}
