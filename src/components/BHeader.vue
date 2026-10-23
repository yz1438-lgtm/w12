<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/booklist" class="nav-link" active-class="active">BookList</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Books API</router-link>
        </li>
      </ul>

      <div class="auth-section">
        <template v-if="isAuthenticated">
          <span class="user-info">Welcome, {{ currentUser }}!</span>
          <button @click="handleLogout" class="btn btn-logout">Logout</button>
        </template>
        <!-- <template v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
        </template> -->
      </div>
    </header>
  </div>
</template>

<script setup>
import { useAuth, initializeAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const { isAuthenticated, currentUser, logout } = useAuth()

onMounted(() => {
  // Initialize auth state from localStorage
  initializeAuth()
})

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  font-weight: 600;
  color: #333;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #c82333;
}
</style>
