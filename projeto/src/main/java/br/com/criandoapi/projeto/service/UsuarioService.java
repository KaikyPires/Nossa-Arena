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
        List<Usuario> lista = usuarioRepository.findAllOrderByQuantidadePartidas();
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



    public Usuario incrementarQuantidadePartidas(String cpf) {
        Usuario usuario = usuarioRepository.findById(cpf).orElse(null);
        if (usuario != null) {
            usuario.setQuantidadePartidas(usuario.getQuantidadePartidas() + 1);
            return usuarioRepository.save(usuario);
        }
        return null; // Retorna null se o usuário não for encontrado
    }
}