package com.infosys.inventory.controller;

import com.infosys.inventory.dto.LoginRequest;
import com.infosys.inventory.dto.SignupRequest;
import com.infosys.inventory.model.Role;
import com.infosys.inventory.model.User;
import com.infosys.inventory.security.JwtUtil;
import com.infosys.inventory.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder) {
          this.userService = userService;
          this.jwtUtil = jwtUtil;
          this.passwordEncoder = passwordEncoder;
}

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {

        // role validation
        if (!"ADMIN".equalsIgnoreCase(request.getRole()) &&
            !"EMPLOYEE".equalsIgnoreCase(request.getRole())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid role. Allowed roles: ADMIN, EMPLOYEE");
        }

        // duplicate email check
        if (userService.findByEmail(request.getEmail()) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));

        userService.register(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {

        User user = userService.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(token);
    }
}
