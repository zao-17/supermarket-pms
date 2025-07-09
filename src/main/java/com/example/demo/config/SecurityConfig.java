package com.example.demo.config;

import com.example.demo.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
//                        .requestMatchers("/api/products/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                                .requestMatchers("/api/products/**").permitAll()
                                .requestMatchers("/api/users/**").permitAll() // 添加这一行 ,弯路几重
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        // .loginPage("/auth/login") // 暂时不要自定义登录页
                        .defaultSuccessUrl("http://localhost:5173/", true)
                        .permitAll()
                )

                .logout(logout -> logout
                        .logoutUrl("/auth/logout")
                        .logoutSuccessUrl("/login?logout=true")
                )
                .userDetailsService(userDetailsService);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 用于加密密码
    }

//    @Bean
//    public CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            if (userRepository.findByUsername("admin").isEmpty()) {
//                User admin = new User();
//                admin.setUsername("q");
//                admin.setPassword(passwordEncoder.encode("123")); // 加密后的密码
//                admin.setRole("ADMIN"); // 不要加 ROLE_ 前缀
//                admin.setPhone("12345678901");
//                admin.setAge(30);
//                admin.setSex("Male");
//                userRepository.save(admin);
//                System.out.println("✅ 管理员账户 admin/123 已初始化");
//            }
//        };
//    }

//    @Bean
//    public CommandLineRunner encodePassword(PasswordEncoder passwordEncoder) {
//        return args -> {
//            String rawPassword = "12345";
//            String encodedPassword = passwordEncoder.encode(rawPassword);
//            System.out.println("✅ 加密后的密码是: " + encodedPassword);
//        };
//    }

}