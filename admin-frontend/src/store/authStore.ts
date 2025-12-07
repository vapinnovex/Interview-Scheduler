import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authService, { User } from '../services/authService'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login({ email, password })
          localStorage.setItem('admin_token', response.access_token)
          
          const user = await authService.getCurrentUser()
          set({
            user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || 'Login failed'
          set({ error: errorMessage, isLoading: false })
          throw error
        }
      },

      register: async (email: string, password: string, full_name: string) => {
        set({ isLoading: true, error: null })
        try {
          await authService.register({ email, password, full_name })
          set({ isLoading: false })
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || 'Registration failed'
          set({ error: errorMessage, isLoading: false })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('admin_token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      checkAuth: async () => {
        const token = localStorage.getItem('admin_token')
        if (!token) {
          set({ isLoading: false })
          return
        }

        try {
          const user = await authService.getCurrentUser()
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          localStorage.removeItem('admin_token')
          set({ isLoading: false })
        }
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-store',
    }
  )
)
