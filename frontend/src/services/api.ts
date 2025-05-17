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
  },

  async deleteUser(userId: string) {
    const response = await fetch(`${API_BASE_URL}/auth/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error al eliminar el usuario: ${errorData}`);
    }

    return true;
  },

  updateStudyMinutes: async (date: string, minutes: number) => {
    console.log('Llamada a API updateStudyMinutes:', { date, minutes });
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/study-minutes?date=${date}&minutes=${minutes}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error actualizando minutos de estudio:', error);
      throw error;
    }
  },

  async getStudyMinutesLast100Days(userId: string | undefined) {
      if (!userId) {
          throw new Error('User ID is required');
      }
  
      const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/study-minutes/last-100-days`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });
  
      if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error al obtener los minutos de estudio: ${errorData}`);
      }
  
      return response.json();
  }
}