package com.app.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.app.filters.JWTRequestFilter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
	
	@Value("${frontend.url}")
	private String frontendUrl;
	
	@Bean
	public AuthenticationManager authenticationManager(
	        AuthenticationConfiguration authenticationConfiguration
	) throws Exception {
	    return authenticationConfiguration.getAuthenticationManager();
	}
	
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	 
	 @Bean
	 public CorsConfigurationSource corsConfigurationSource() {
	     CorsConfiguration config = new CorsConfiguration();

	     config.addAllowedOrigin(frontendUrl); 
	     config.addAllowedHeader("*");
	     config.addAllowedMethod("*");
	     config.setAllowCredentials(true);

	     UrlBasedCorsConfigurationSource source =
	             new UrlBasedCorsConfigurationSource();
	     source.registerCorsConfiguration("/**", config);

	     return source;
	 }


    @Autowired
    private JWTRequestFilter filter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .exceptionHandling()
            .authenticationEntryPoint((request, response, ex) -> {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
            })
            .and()
            .authorizeRequests()

            
            .antMatchers(
                "/v2/api-docs",
                "/v3/api-docs/**",
                "/swagger-resources/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/webjars/**"
            ).permitAll()

           
            .antMatchers("/login").permitAll()
            .antMatchers("/customer/registerUser").permitAll()
            .antMatchers("/admin/active").permitAll()
            .antMatchers("/admin/getAllCategories").permitAll()
            .antMatchers("/customer/getAllFeedback").permitAll()
            .antMatchers("/admin/getProductsByCategory/**").permitAll()
            .antMatchers("/", "/register","/auth/**").permitAll()

            
            .antMatchers("/admin/**").hasRole("ADMIN")
            .antMatchers("/customer/**").hasRole("CUSTOMER")

            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
