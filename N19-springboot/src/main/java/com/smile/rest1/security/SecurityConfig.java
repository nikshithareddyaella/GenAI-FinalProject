import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/charts", "/api/**").permitAll() // Permit all for specific endpoints
                        .anyRequest().authenticated() // Secure other endpoints
                )
                .cors(cors -> {}); // Enable CORS (further configuration below)

        return http.build();
    }
}
