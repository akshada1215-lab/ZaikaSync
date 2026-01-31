package com.app.Service;

import java.util.List;

import com.app.Entity.User;

public interface UserService {

	User registerUser(User user);

	User updateUser(Long id, User userDetails);

	List<User> getAllUsers();

	User getUserById(Long id);

	boolean existsByEmail(String email);

	boolean updatePassword(String email, String newpassword);

}
