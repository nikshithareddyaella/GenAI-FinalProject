package com.smile.rest1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Rest1Application {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:80");
				registry.addMapping("/**").allowedOrigins("https://genai-finalproject.onrender.com");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(Rest1Application.class, args);
		System.out.println("Spring application stated");
	}

}
