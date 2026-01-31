package com.app.Controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.AuthReq;
import com.app.DTO.AuthResp;
import com.app.jwt_utils.JwtUtils;

@RestController
@RequestMapping("/login")
public class LoginController {

    // dep : JWT utils : for generating JWT
    @Autowired
    private JwtUtils utils;

    // dep : Auth mgr
    @Autowired
    private AuthenticationManager manager;

    @PostMapping
    public ResponseEntity<?> validateUserCreateToken(
            @RequestBody @Valid AuthReq request) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                );

        try {
            Authentication authenticatedDetails =
                    manager.authenticate(authToken);

            return ResponseEntity.ok(
                    new AuthResp(
                            "Auth successful!",
                            utils.generateJwtToken(authenticatedDetails),
                            authenticatedDetails
                    )
            );

        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
}
