<template>
  <div class="access-denied-container">
    <div class="access-denied-card">
      <div class="icon">🔒</div>
      <h1>Access Denied</h1>
      <p>You must be logged in to access this page.</p>
      <router-link to="/login" class="btn btn-primary">Go to Login</router-link>
    </div>
  </div>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.access-denied-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.access-denied-card {
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  max-width: 500px;
}

.icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.access-denied-card h1 {
  color: #333;
  margin-bottom: 15px;
  font-size: 32px;
}

.access-denied-card p {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  text-decoration: none;
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
</style>
