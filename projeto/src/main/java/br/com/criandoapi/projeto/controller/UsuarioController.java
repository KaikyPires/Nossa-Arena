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
import br.com.criandoapi.projeto.repository.UsuarioRepository;
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

    @PutMapping("/{cpf}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable String cpf, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(cpf);
        if (usuarioExistente.isPresent()) {
            Usuario existente = usuarioExistente.get();

            // Atualiza os campos recebidos
            existente.setNome(usuario.getNome());
            existente.setTelefone(usuario.getTelefone());
            existente.setNascimento(usuario.getNascimento());
            existente.setQuantidadePartidas(usuario.getQuantidadePartidas());

            // Salva as mudanças
            Usuario usuarioAtualizado = usuarioRepository.save(existente);
            return ResponseEntity.ok(usuarioAtualizado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
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

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PutMapping("/{cpf}/incrementar-partidas")
    public ResponseEntity<Usuario> incrementarPartidas(@PathVariable String cpf) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(cpf);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            usuario.setQuantidadePartidas(usuario.getQuantidadePartidas() + 1); // Incrementa a quantidade de partidas
            usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Usuario> buscarUsuarioPorCpf(@PathVariable String cpf) {
        Optional<Usuario> usuario = usuarioRepository.findById(cpf);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}