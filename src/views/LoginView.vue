<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Library Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter username"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            required
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary">Login</button>

        <div v-if="loginError" class="alert alert-danger mt-3">
          {{ loginError }}
        </div>

        <div class="hint mt-4">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: <code>user</code></p>
          <p>Password: <code>password123</code></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const loginError = ref('')

const handleLogin = () => {
  loginError.value = ''

  if (login(username.value, password.value)) {
    // Redirect to About page on successful login
    router.push('/about')
  } else {
    loginError.value = 'Invalid username or password'
    password.value = ''
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.login-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-card h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #275fda;
  box-shadow: 0 0 0 3px rgba(39, 95, 218, 0.1);
}

.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #275fda;
  color: white;
}

.btn-primary:hover {
  background-color: #1e4ba8;
}

.alert {
  padding: 12px;
  border-radius: 5px;
  margin-top: 15px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.hint {
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 5px;
  border-left: 4px solid #275fda;
}

.hint p {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.hint code {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #d63384;
}
</style>
