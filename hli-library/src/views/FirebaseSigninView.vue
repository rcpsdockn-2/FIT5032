<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { currentUser } from '../Firebase/authState'
import { auth, firebaseConfigured, firebaseError } from '../Firebase/init'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

async function signIn() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!firebaseConfigured || !auth) {
    errorMessage.value = 'Firebase is not configured. Add the values from .env.example to .env.local.'
    return
  }

  isSubmitting.value = true

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    )

    console.log('Current user after sign in:', credential.user)
    successMessage.value = `Signed in as ${credential.user.email}`
    password.value = ''
  } catch (error) {
    errorMessage.value = error.message
    console.error('Sign-in error:', error)
  } finally {
    isSubmitting.value = false
  }
}

async function logout() {
  if (!auth) return

  await signOut(auth)
  console.log('Current user after logout:', null)
  successMessage.value = 'You have been logged out.'
  await router.push('/firebase-signin')
}
</script>

<template>
  <div class="container page-shell">
    <div class="card form-card shadow-sm">
      <div class="card-body p-4 p-md-5">
        <h1 class="h3 mb-4">Firebase Sign in</h1>

        <div v-if="!firebaseConfigured" class="alert alert-warning firebase-status">
          Firebase is not configured yet.
          Copy `.env.example` to `.env.local`, then paste the Firebase Web App values there.
          <span v-if="firebaseError">{{ firebaseError }}</span>
        </div>

        <form @submit.prevent="signIn">
          <div class="mb-3">
            <label for="signin-email" class="form-label">Email</label>
            <input
              id="signin-email"
              v-model="email"
              type="email"
              class="form-control"
              required
              autocomplete="email"
            >
          </div>

          <div class="mb-3">
            <label for="signin-password" class="form-label">Password</label>
            <input
              id="signin-password"
              v-model="password"
              type="password"
              class="form-control"
              required
              autocomplete="current-password"
            >
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <button class="btn btn-primary me-2" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </button>
          <button
            v-if="currentUser"
            class="btn btn-outline-secondary"
            type="button"
            @click="logout"
          >
            Logout
          </button>
          <RouterLink v-else class="btn btn-link" to="/firebase-register">
            Create an account
          </RouterLink>
        </form>

        <div v-if="currentUser" class="alert alert-info mt-4 mb-0">
          Current user: <strong>{{ currentUser.email }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
