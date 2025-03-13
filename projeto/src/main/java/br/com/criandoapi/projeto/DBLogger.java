package br.com.criandoapi.projeto;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DBLogger {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @PostConstruct
    public void logDatabaseUrl() {
        System.out.println("📌 JDBC URL usada pelo Spring Boot: " + dbUrl);
        System.out.println("👤 Usuário: " + dbUser);
    }
}