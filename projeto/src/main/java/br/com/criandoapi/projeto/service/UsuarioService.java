package br.com.criandoapi.projeto.service;

import java.util.List;
import org.springframework.stereotype.Service;

import br.com.criandoapi.projeto.model.Usuario;
import br.com.criandoapi.projeto.repository.InterfaceUsuario;

@Service
public class UsuarioService {
    
    private InterfaceUsuario repository;

    public UsuarioService (InterfaceUsuario repository){
        this.repository = repository;
    }
    public List<Usuario> listarUsuario(){
        List<Usuario> lista = repository.findAll();
        return lista;
    }
    public Usuario criaUsuario(Usuario usuario){
        Usuario usuarioNovo = repository.save(usuario);
        return usuarioNovo;
    }
    public Usuario editaUsuario(Usuario usuario){
        Usuario editUsuario = repository.save(usuario);
        return editUsuario;
    }
}
