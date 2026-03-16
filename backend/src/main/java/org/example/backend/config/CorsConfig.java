package org.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// WebMvcConfigurer is an interface in Spring Framework that provides callback methods
// to customize the default Spring MVC configuration
// (like interceptors, resource handlers, view controllers, and message converters)
@Configuration // Signifies that this class creates and configures other beans
public class CorsConfig implements WebMvcConfigurer {
    // CorsRegistry is a helper class in Spring MVC used to define global Cross-Origin Resource Sharing (CORS) rules
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all endpoints starting with /api
                .allowedOrigins("https://localhost:5173") // Default port for Vite React
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
