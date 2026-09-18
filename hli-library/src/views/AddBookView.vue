<script setup>
import { reactive, ref } from 'vue'
import BookList from '../components/BookList.vue'
import { db } from '../Firebase/init'

import {
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore'

const bookList = ref(null)
const formData = reactive({
  isbn: '',
  name: ''
})
const successMessage = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function addBook() {
  successMessage.value = ''
  errorMessage.value = ''

  if (!db) {
    errorMessage.value = 'Firestore is not configured. Add the Firebase values to .env.local.'
    return
  }

  const isbn = Number(formData.isbn)
  const name = formData.name.trim()

  if (!Number.isInteger(isbn) || isbn <= 0) {
    errorMessage.value = 'ISBN must be a positive whole number.'
    return
  }

  if (!name) {
    errorMessage.value = 'Book name is required.'
    return
  }

  isSubmitting.value = true

  try {
    const documentReference = await addDoc(collection(db, 'books'), {
      isbn,
      name,
      createdAt: serverTimestamp()
    })

    console.log('Book added:', documentReference.id, { isbn, name })
    successMessage.value = `Book added successfully. Document ID: ${documentReference.id}`
    formData.isbn = ''
    formData.name = ''
    await bookList.value?.loadBooks()
  } catch (error) {
    errorMessage.value = error.message
    console.error('Add book error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container page-shell">
    <div class="card form-card shadow-sm mb-4">
      <div class="card-body p-4 p-md-5">
        <h1 class="h3 mb-4">Add Book</h1>
        <p class="text-muted">
          Add a book to the Firestore <code>books</code> collection.
        </p>

        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN</label>
            <input
              id="isbn"
              v-model="formData.isbn"
              type="number"
              class="form-control"
              min="1"
              step="1"
              required
            >
            <div class="form-text">The ISBN is saved as a number.</div>
          </div>

          <div class="mb-3">
            <label for="book-name" class="form-label">Book name</label>
            <input
              id="book-name"
              v-model="formData.name"
              type="text"
              class="form-control"
              required
            >
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Adding...' : 'Add book' }}
          </button>
        </form>
      </div>
    </div>

    <BookList ref="bookList" />
  </div>
</template>
