<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth, firebaseConfigured, firebaseError } from '../Firebase/init'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

async function register() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!firebaseConfigured || !auth) {
    errorMessage.value = 'Firebase is not configured. Add the values from .env.example to .env.local.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  isSubmitting.value = true

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    )

    console.log('Registered user:', credential.user)
    successMessage.value = 'Registration successful. You can now sign in.'
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    await router.push('/firebase-signin')
  } catch (error) {
    errorMessage.value = error.message
    console.error('Registration error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container page-shell">
    <div class="card form-card shadow-sm">
      <div class="card-body p-4 p-md-5">
        <h1 class="h3 mb-4">Firebase Registration</h1>

        <div v-if="!firebaseConfigured" class="alert alert-warning firebase-status">
          Firebase is not configured yet.
          Copy `.env.example` to `.env.local`, then paste the Firebase Web App values there.
          <span v-if="firebaseError">{{ firebaseError }}</span>
        </div>

        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="register-email" class="form-label">Email</label>
            <input
              id="register-email"
              v-model="email"
              type="email"
              class="form-control"
              required
              autocomplete="email"
            >
          </div>

          <div class="mb-3">
            <label for="register-password" class="form-label">Password</label>
            <input
              id="register-password"
              v-model="password"
              type="password"
              class="form-control"
              minlength="6"
              required
              autocomplete="new-password"
            >
            <div class="form-text">Firebase requires at least 6 characters.</div>
          </div>

          <div class="mb-3">
            <label for="register-confirm-password" class="form-label">
              Confirm password
            </label>
            <input
              id="register-confirm-password"
              v-model="confirmPassword"
              type="password"
              class="form-control"
              minlength="6"
              required
              autocomplete="new-password"
            >
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
          <RouterLink class="btn btn-link" to="/firebase-signin">
            Already have an account?
          </RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
