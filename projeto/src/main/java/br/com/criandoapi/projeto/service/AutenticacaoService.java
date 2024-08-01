package br.com.criandoapi.projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.repository.UsuarioRepository;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean autenticar(String cpf, String senha) {
        Usuario usuario = usuarioRepository.findById(cpf).orElse(null);
        return usuario != null && usuario.getSenha().equals(senha);
    }
}
