package com.app.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Service.UserService;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Value("${frontend.url}")
    private String frontendUrl;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        if (!userService.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        String resetLink = frontendUrl + "/reset-password?email=" + email;
        sendResetEmail(email, resetLink);
        return ResponseEntity.ok("Reset link sent to your email.");
    }

    private void sendResetEmail(String email, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the link to reset your password: " + resetLink);
        mailSender.send(message);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
    	
    	String newpassword = passwordEncoder.encode(newPassword);
        boolean updated = userService.updatePassword(email, newpassword);
        if (updated) {
            return ResponseEntity.ok("Password successfully updated.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update password.");
    }
}
