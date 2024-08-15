package br.com.criandoapi.projeto.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.criandoapi.projeto.model.LoginRequest;
import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.repository.InterfaceUsuario;
import br.com.criandoapi.projeto.service.UsuarioService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5502")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private InterfaceUsuario dao;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> ListaDeUsuarios() {
        return ResponseEntity.status(200).body(usuarioService.listarUsuario());
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.status(201).body(usuarioService.criaUsuario(usuario));
    }

    @PutMapping
    public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.status(200).body(usuarioService.criaUsuario(usuario));
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable String cpf) {
        Optional<Usuario> usuario = dao.findById(cpf);
        if (usuario.isPresent()) {
            dao.deleteById(cpf);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
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
