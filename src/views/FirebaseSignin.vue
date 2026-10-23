<template>
  <h1>Sign in</h1>
  <div v-if="!currentUser">
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </div>

  <!-- Display logged-in status, role, and logout button for screenshots -->
  <div v-else>
    <p>Logged in as: {{ currentUser.email }}</p>
    <p><strong>Role: {{ userRole }}</strong></p>
    <button @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "vue-router"
import { db } from "../main.js" // Import Firestore instance

const email = ref("")
const password = ref("")
const currentUser = ref(null)
const userRole = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
      currentUser.value = data.user
      console.log("Firebase Sign-in Successful!")
      
      // Fetch user role from Firestore
      const docRef = doc(db, "users", data.user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        userRole.value = docSnap.data().role
        console.log("Current user role:", userRole.value)
      }
      console.log(auth.currentUser) // Check current authenticated user
    })
    .catch((error) => {
      console.log(error.code)
    })
}

// Log out and verify session clearing
const logout = () => {
  signOut(auth).then(() => {
    currentUser.value = null
    userRole.value = ""
    console.log("User logged out successfully.")
    console.log("Current user after logout:", auth.currentUser) // Prints null for screenshot 2
  })
}
</script>

