import api from '../lib/axios'

export interface User {
  id: string
  email: string
  full_name: string
  role: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterData {
  email: string
  password: string
  full_name: string
}

export interface LoginData {
  email: string
  password: string
}

const authService = {
  // Register new admin user
  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/api/auth/register', data)
    return response.data
  },

  // Login with email and password
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/api/auth/login', data)
    return response.data
  },

  // Get current user info
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },

  // Logout
  async logout(): Promise<void> {
    await api.post('/api/auth/logout')
  },
}

export default authService
