package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 获取所有用户
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 根据 ID 获取用户
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // 创建新用户
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // 更新用户信息
    public User updateUser(Long id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    // 删除用户
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
