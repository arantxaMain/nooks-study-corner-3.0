const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  async login(email: string, name: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name })
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    return response.json();
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/auth/users`);
    
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    return response.json();
  }
};