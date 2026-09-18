import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './init'

export const currentUser = ref(null)
export const authLoading = ref(Boolean(auth))

if (auth) {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    authLoading.value = false
    console.log('Current user:', user)
  })
}
