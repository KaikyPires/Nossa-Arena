package br.com.criandoapi.projeto.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.criandoapi.projeto.model.Usuario;

public interface InterfaceUsuario extends JpaRepository<Usuario, String>{


}
