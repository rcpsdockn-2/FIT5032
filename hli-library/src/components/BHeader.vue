<script setup>
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth, firebaseConfigured } from '../Firebase/init'
import { currentUser } from '../Firebase/authState'

const router = useRouter()

async function logout() {
  if (!auth) return

  await signOut(auth)
  console.log('Current user after logout:', null)
  await router.push('/firebase-signin')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand" to="/home">
        FIT5032 Library
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavigation"
        aria-controls="mainNavigation"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNavigation" class="collapse navbar-collapse">
        <div class="navbar-nav me-auto">
          <RouterLink class="nav-link" to="/home">Home</RouterLink>
          <RouterLink class="nav-link" to="/library">Library Form</RouterLink>
          <RouterLink class="nav-link" to="/firebase-register">Register</RouterLink>
          <RouterLink class="nav-link" to="/firebase-signin">Sign in</RouterLink>
          <RouterLink class="nav-link" to="/add-book">Add Book</RouterLink>
          <RouterLink class="nav-link" to="/about">About</RouterLink>
        </div>

        <div class="d-flex align-items-center gap-2 text-white small">
          <span v-if="!firebaseConfigured" class="text-warning">
            Firebase config needed
          </span>
          <span v-else-if="currentUser">
            {{ currentUser.email }}
          </span>
          <button
            v-if="currentUser"
            type="button"
            class="btn btn-outline-light btn-sm"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
