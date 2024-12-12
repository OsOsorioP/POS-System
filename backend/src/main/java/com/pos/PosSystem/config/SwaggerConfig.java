package com.pos.PosSystem.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        Server server = new Server()
                .url("http://localhost:8080/api-docs")
                .description("Development Server");

        Contact contact = new Contact()
                .name("Your Name")
                .email("your.email@example.com")
                .url("https://yourwebsite.com");

        Info info = new Info()
                .title("API Documentation")
                .version("1.0")
                .description("API documentation for the application")
                .contact(contact);

        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}