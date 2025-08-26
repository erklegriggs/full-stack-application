package com.example.authentication.dto;

import java.util.UUID;

public class JwtAuthenticationResponse {
  String token;
  UUID userId;

  public JwtAuthenticationResponse(String token, UUID userId) {
    this.token = token;
    this.userId = userId;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }
}
