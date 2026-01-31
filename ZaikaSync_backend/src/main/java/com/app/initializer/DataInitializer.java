package com.app.initializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Repository.UserRepository;


@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @Override
    public void run(String... args) {


        if (adminRepository.findByEmail("admin@gmail.com").isEmpty()) {
            User admin = new User();
            admin.setUserName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin@123"));
            admin.setContact("9876567898");
            admin.setPincode("4150032");
            admin.setAddress("India");
            admin.setRole(Role.ROLE_ADMIN);

            adminRepository.save(admin);
            System.out.println("Admin user added successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }



}
