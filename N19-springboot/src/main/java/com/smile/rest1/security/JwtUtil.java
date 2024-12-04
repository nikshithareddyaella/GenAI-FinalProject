package com.smile.rest1.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "vs2mRgF7UBwq8GqUMzvv49vYL6xhuDSDuy5NHzF4zxs=";

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 180000)) // Token expiry (3 minutes in milliseconds)
                .signWith(getSigningKey()) // Signing the token with the key
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey()) // Validating the signature using the signing key
                    .build()
                    .parseClaimsJws(token); // Parse the claims to verify if the token is valid
            return true;
        } catch (Exception e) {
            System.out.println("Invalid or expired token");
        }
        return false;
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
