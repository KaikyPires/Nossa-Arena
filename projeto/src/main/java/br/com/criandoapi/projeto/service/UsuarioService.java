package br.com.criandoapi.projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.repository.InterfaceUsuario;


import java.util.List;


@Service
public class UsuarioService {

    @Autowired
    private InterfaceUsuario usuarioRepository;

    // Construtor para injeção de dependência
    public UsuarioService(InterfaceUsuario usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarUsuario() {
        List<Usuario> lista = usuarioRepository.findAll();
        return lista;
    }

    public Usuario criaUsuario(Usuario usuario) {
        Usuario usuarioNovo = usuarioRepository.save(usuario);
        return usuarioNovo;
    }

    public Usuario editaUsuario(Usuario usuario) {
        Usuario editUsuario = usuarioRepository.save(usuario);
        return editUsuario;
    }

    public boolean autenticar(String cpf, String senha) {
        // Checa CPF e senha diretamente, sem acessar o banco de dados
        return "123456".equals(cpf) && "admin".equals(senha);
    }

}
