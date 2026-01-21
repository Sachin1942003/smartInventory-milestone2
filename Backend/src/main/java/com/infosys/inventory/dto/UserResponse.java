package com.infosys.inventory.dto;

import com.infosys.inventory.model.Role;

public class UserResponse {

    private String email;
    private Role role;

    public UserResponse(String email, Role role) {
        this.email = email;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}
