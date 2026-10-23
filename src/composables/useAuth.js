import { ref, computed } from 'vue'

const isAuthenticated = ref(false)
const currentUser = ref(null)

// Load auth state from localStorage on init
function initAuth() {
  const stored = localStorage.getItem('auth_state')
  if (stored) {
    try {
      const auth = JSON.parse(stored)
      isAuthenticated.value = auth.isAuthenticated
      currentUser.value = auth.username
    } catch (e) {
      console.error('Failed to load auth state:', e)
    }
  }
}

export function useAuth() {
  const VALID_USERNAME = 'user'
  const VALID_PASSWORD = 'password123'

  const login = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      isAuthenticated.value = true
      currentUser.value = username

      // Persist to localStorage
      localStorage.setItem('auth_state', JSON.stringify({
        isAuthenticated: true,
        username: username
      }))

      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null

    // Clear localStorage
    localStorage.removeItem('auth_state')
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    currentUser: computed(() => currentUser.value),
    login,
    logout
  }
}

export function initializeAuth() {
  initAuth()
}
