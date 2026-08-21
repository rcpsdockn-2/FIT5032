<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
        <h1 class="text-center mb-4">
          Library Registration Form
        </h1>

        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="username" class="form-label">
              Username:
            </label>

            <input
              id="username"
              type="text"
              class="form-control"
              v-model="formData.username"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              Password:
            </label>

            <input
              id="password"
              type="password"
              class="form-control"
              v-model="formData.password"
            />
          </div>

          <div class="form-check mb-3">
            <input
              id="isAustralian"
              type="checkbox"
              class="form-check-input"
              v-model="formData.isAustralian"
            />

            <label for="isAustralian" class="form-check-label">
              Australian Resident?
            </label>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">
              Gender:
            </label>

            <select
              id="gender"
              class="form-select"
              v-model="formData.gender"
            >
              <option value="">Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining:
            </label>

            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model="formData.reason"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary me-2">
            Submit
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            @click="clearForm"
          >
            Clear
          </button>
        </form>

        <div
          v-if="submittedCards.length > 0"
          class="mt-5"
        >
          <h2 class="mb-3">
            Submitted User Information
          </h2>

          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem"
            >
              <div class="card-header">
                User Information
              </div>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>Username:</strong>
                  {{ card.username }}
                </li>

                <li class="list-group-item">
                  <strong>Password:</strong>
                  {{ card.password }}
                </li>

                <li class="list-group-item">
                  <strong>Australian Resident:</strong>
                  {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>

                <li class="list-group-item">
                  <strong>Gender:</strong>
                  {{ card.gender }}
                </li>

                <li class="list-group-item">
                  <strong>Reason:</strong>
                  {{ card.reason }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value
  })
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: ''
  }
}
</script>