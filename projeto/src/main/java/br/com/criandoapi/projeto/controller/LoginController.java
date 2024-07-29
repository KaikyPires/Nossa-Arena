package br.com.criandoapi.projeto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestParam String cpf, @RequestParam String senha, HttpServletRequest request) {
        // Lógica para verificar a senha
        if (verificarSenha(cpf, senha)) {
            return "redirect:/pag"; // Redireciona para a página desejada após login bem-sucedido
        } else {
            return "login"; // Retorna para a página de login em caso de falha
        }
    }

    private boolean verificarSenha(String cpf, String senha) {
        // Implemente a lógica para verificar o usuário e a senha
        return true; // Supondo que a verificação foi bem-sucedida
    }
}