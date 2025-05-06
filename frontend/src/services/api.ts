const API_BASE_URL = 'http://localhost:8080/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  gender: string;
  workDuration?: number;
  breakDuration?: number;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  gender?: string;
  workDuration?: number;
  breakDuration?: number;
}

export const api = {
  async register({ name, email, password, gender }: RegisterRequest) {
    const bodyData = { 
      name, 
      email, 
      password, 
      gender,
      workDuration: 1500,
      breakDuration: 300
    };
    console.log('Datos enviados al registro:', bodyData);
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    console.log('Respuesta del servidor:', response);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error detallado:', errorData);
      throw new Error(`Error en el registro: ${errorData}`);
    }

    const data = await response.json();
    console.log('Datos recibidos:', data);
    return data;
},

  async login({ email, password }: LoginRequest) {
    const bodyData = { email, password };
    console.log('Datos enviados al login:', bodyData);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error en el inicio de sesión: ${errorData}`);
    }

    return response.json();
},

  async updateUser(updatedUser: UpdateUserRequest) {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error al actualizar el usuario: ${errorData}`);
    }

    return response.json();
  }
};