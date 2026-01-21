package com.infosys.inventory.service;

import com.infosys.inventory.model.User;

import java.util.List;

import com.infosys.inventory.dto.UserResponse;

public interface UserService {
    User register(User user);
    User findByEmail(String email);
    List<UserResponse> getAllUsers();
}
