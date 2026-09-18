<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../Firebase/init'

const books = ref([])
const draftNames = reactive({})
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

async function loadBooks() {
  errorMessage.value = ''
  isLoading.value = true

  if (!db) {
    errorMessage.value = 'Firestore is not configured. Add the Firebase values to .env.local.'
    isLoading.value = false
    return
  }

  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(20)
    )
    const snapshot = await getDocs(booksQuery)

    books.value = snapshot.docs.map((bookDocument) => ({
      id: bookDocument.id,
      ...bookDocument.data()
    }))

    books.value.forEach((book) => {
      draftNames[book.id] = book.name
    })
  } catch (error) {
    errorMessage.value = error.message
    console.error('Book query error:', error)
  } finally {
    isLoading.value = false
  }
}

async function updateBook(book) {
  errorMessage.value = ''
  successMessage.value = ''

  const updatedName = draftNames[book.id]?.trim()
  if (!updatedName) {
    errorMessage.value = 'Book name cannot be empty.'
    return
  }

  try {
    await updateDoc(doc(db, 'books', book.id), { name: updatedName })
    book.name = updatedName
    successMessage.value = `Updated ${book.id}.`
    console.log('Book updated:', book.id, updatedName)
  } catch (error) {
    errorMessage.value = error.message
    console.error('Update book error:', error)
  }
}

async function deleteBook(book) {
  errorMessage.value = ''
  successMessage.value = ''

  if (!window.confirm(`Delete "${book.name}"?`)) return

  try {
    await deleteDoc(doc(db, 'books', book.id))
    books.value = books.value.filter((item) => item.id !== book.id)
    delete draftNames[book.id]
    successMessage.value = `Deleted ${book.id}.`
    console.log('Book deleted:', book.id)
  } catch (error) {
    errorMessage.value = error.message
    console.error('Delete book error:', error)
  }
}

defineExpose({ loadBooks })

onMounted(loadBooks)
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body p-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 class="h4 mb-1">Books matching the query</h2>
          <p class="text-muted mb-0">
            <code>where isbn &gt; 1000</code>, ordered by ISBN, limited to 20 results.
          </p>
        </div>
        <button class="btn btn-outline-primary" type="button" @click="loadBooks">
          Refresh
        </button>
      </div>

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
      <div v-if="isLoading" class="text-muted">Loading books...</div>
      <div v-else-if="books.length === 0" class="alert alert-secondary mb-0">
        No matching books yet. Add a book with an ISBN greater than 1000.
      </div>

      <div v-else class="table-responsive">
        <table class="table table-striped align-middle mb-0">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Book name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.isbn }}</td>
              <td>
                <input
                  v-model="draftNames[book.id]"
                  class="form-control"
                  type="text"
                >
              </td>
              <td class="text-nowrap">
                <button
                  class="btn btn-sm btn-success me-2"
                  type="button"
                  @click="updateBook(book)"
                >
                  Update
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click="deleteBook(book)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
