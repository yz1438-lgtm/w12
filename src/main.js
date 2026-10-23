import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCGomhDSujQSjYlmxrn1wAm09s8i7jDbRM",
  authDomain: "fit5032-2222.firebaseapp.com",
  projectId: "fit5032-2222",
  storageBucket: "fit5032-2222.firebasestorage.app",
  messagingSenderId: "337915273682",
  appId: "1:337915273682:web:6390e5b13f0d267f0e280b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Initialize App
const app = createApp(App)


app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

export const db = getFirestore(firebaseApp)