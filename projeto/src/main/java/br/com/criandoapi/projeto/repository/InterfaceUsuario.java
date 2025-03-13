package br.com.criandoapi.projeto.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.criandoapi.projeto.model.Usuario;


public interface InterfaceUsuario extends JpaRepository<Usuario, String>{

 @Query("SELECT u FROM Usuario u ORDER BY u.quantidadePartidas DESC")
    List<Usuario> findAllOrderByQuantidadePartidas();
}
