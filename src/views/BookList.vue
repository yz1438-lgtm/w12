<template>
  <div class="container mt-4">
    <h1>Book List</h1>
    
    <!-- Original CRUD Operations -->
    <ul class="mb-4">
      <li v-for="book in books" :key="book.id" class="mb-2">
        <span>ISBN: {{ book.isbn }} - Name: {{ book.name }} </span>
        <button @click="updateBook(book)" class="ms-2">Update</button>
        <button @click="deleteBook(book.id)" class="ms-2">Delete</button>
      </li>
    </ul>

    <hr />

    <!-- Query Demo Section for Screenshot Set 2 -->
    <h2>Firestore Query Demo (where, orderBy, limit)</h2>
    <p class="text-muted">Query condition: ISBN > 1000, ordered by ISBN (asc), limited to 3 documents.</p>
    <button @click="fetchFilteredBooks" class="btn btn-primary mb-3">Execute Query</button>

    <ul>
      <li v-for="book in queriedBooks" :key="book.id">
        <strong>ISBN:</strong> {{ book.isbn }} | <strong>Name:</strong> {{ book.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../main.js'
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore'

const books = ref([])
const queriedBooks = ref([])

// 1. Fetch all books for standard display
const fetchBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'books'))
    books.value = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }))
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})

// 2. Fetch using query with where, orderBy, and limit (Requirement for Screenshot 2)
const fetchFilteredBooks = async () => {
  try {
    // Condition: ISBN > 1000, sort by isbn ascending, limit to 3 results
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )

    const querySnapshot = await getDocs(q)
    queriedBooks.value = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }))
    console.log("Filtered books retrieved successfully:", queriedBooks.value)
  } catch (error) {
    console.error('Error executing query: ', error)
  }
}

// 3. Update book
const updateBook = async (book) => {
  const newName = prompt('Enter new book name:', book.name)
  if (!newName) return

  try {
    const bookDocRef = doc(db, 'books', book.id)
    await updateDoc(bookDocRef, { name: newName })
    alert('Book updated successfully!')
    fetchBooks()
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

// 4. Delete book
const deleteBook = async (id) => {
  if (!confirm('Are you sure you want to delete this book?')) return

  try {
    await deleteDoc(doc(db, 'books', id))
    alert('Book deleted successfully!')
    fetchBooks()
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}
</script>