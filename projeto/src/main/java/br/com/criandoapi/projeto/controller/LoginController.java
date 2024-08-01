package br.com.criandoapi.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.criandoapi.projeto.service.AutenticacaoService;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        boolean autenticado = autenticacaoService.autenticar(loginRequest.getCpf(), loginRequest.getSenha());
        if (autenticado) {
            return ResponseEntity.ok("Login bem-sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("CPF ou senha incorretos");
        }
    }
}

class LoginRequest {
    private String cpf;
    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    private String senha;
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    
}
