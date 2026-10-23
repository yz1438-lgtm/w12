<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <!-- Role selection dropdown -->
  <p>
    Role:
    <select v-model="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "vue-router"
import { db } from "../main.js" // Import Firestore instance

const email = ref("")
const password = ref("")
const role = ref("user") // Default role
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
      // Save role information into Firestore users collection
      await setDoc(doc(db, "users", data.user.uid), {
        email: email.value,
        role: role.value
      })
      console.log("Firebase Register Successful with role:", role.value)
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

