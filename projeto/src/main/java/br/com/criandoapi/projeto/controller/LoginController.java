package br.com.criandoapi.projeto.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.criandoapi.projeto.model.LoginRequest;

@RestController
public class LoginController {

    private static final String CPF_CORRETO = "123456";
    private static final String SENHA_CORRETA = "admin";

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (CPF_CORRETO.equals(loginRequest.getCpf()) && SENHA_CORRETA.equals(loginRequest.getSenha())) {
            return ResponseEntity.ok("Login bem-sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("CPF ou senha incorretos");
        }
    }
}