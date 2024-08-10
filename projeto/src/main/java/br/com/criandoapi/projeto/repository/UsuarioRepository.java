package br.com.criandoapi.projeto.repository;




import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import br.com.criandoapi.projeto.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

}

