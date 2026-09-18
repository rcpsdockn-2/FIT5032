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
              @blur="validateName"
              @input="validateName"
            >

            <div v-if="errors.username" class="text-danger mt-1">
              {{ errors.username }}
            </div>
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
              @blur="validatePassword"
              @input="validatePassword"
            >

            <div v-if="errors.password" class="text-danger mt-1">
              {{ errors.password }}
            </div>
          </div>

          <div class="mb-3">
            <label for="confirm-password" class="form-label">
              Confirm Password:
            </label>

            <input
              id="confirm-password"
              type="password"
              class="form-control"
              v-model="formData.confirmPassword"
              @blur="validatePasswordConfirmation"
              @input="validatePasswordConfirmation"
            >

            <div v-if="errors.confirmPassword" class="text-danger mt-1">
              {{ errors.confirmPassword }}
            </div>
          </div>

          <div class="mb-3 form-check">
            <input
              id="resident"
              type="checkbox"
              class="form-check-input"
              v-model="formData.isAustralian"
              @change="validateResident"
            >

            <label for="resident" class="form-check-label">
              Australian Resident?
            </label>

            <div v-if="errors.isAustralian" class="text-danger mt-1">
              {{ errors.isAustralian }}
            </div>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">
              Gender:
            </label>

            <select
              id="gender"
              class="form-select"
              v-model="formData.gender"
              @change="validateGender"
            >
              <option value="">Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div v-if="errors.gender" class="text-danger mt-1">
              {{ errors.gender }}
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining:
            </label>

            <textarea
              id="reason"
              class="form-control"
              rows="4"
              v-model="formData.reason"
              @blur="validateReason"
              @input="validateReason"
            ></textarea>

            <div v-if="errors.reason" class="text-danger mt-1">
              {{ errors.reason }}
            </div>
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

        <h2 class="mt-5 mb-3">
          Submitted User Information
        </h2>

        <div class="table-responsive">
          <DataTable
            v-if="submittedCards.length > 0"
            :value="submittedCards"
            stripedRows
            showGridlines
            tableStyle="min-width: 50rem"
          >
            <Column field="username" header="Username"></Column>

            <Column field="password" header="Password"></Column>

            <Column
              field="isAustralian"
              header="Australian Resident"
            >
              <template #body="{ data }">
                {{ data.isAustralian ? 'Yes' : 'No' }}
              </template>
            </Column>

            <Column field="gender" header="Gender"></Column>

            <Column field="reason" header="Reason"></Column>
          </DataTable>

          <div v-else class="alert alert-secondary">
            No users submitted yet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

const errors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: '',
  gender: '',
  reason: ''
})

const submittedCards = ref([])

function validateName() {
  const name = formData.username.trim()

  if (name.length === 0) {
    errors.username = 'Name is required'
    return false
  }

  if (name.length < 3) {
    errors.username = 'Name must be at least 3 characters'
    return false
  }

  errors.username = ''
  return true
}

function validatePassword() {
  const password = formData.password

  const valid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)

  if (!valid) {
    errors.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    return false
  }

  errors.password = ''
  return true
}

function validatePasswordConfirmation() {
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Password confirmation is required'
    return false
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    return false
  }

  errors.confirmPassword = ''
  return true
}

function validateResident() {
  if (!formData.isAustralian) {
    errors.isAustralian = 'Australian Resident must be selected'
    return false
  }

  errors.isAustralian = ''
  return true
}

function validateGender() {
  if (!formData.gender) {
    errors.gender = 'Please select a gender'
    return false
  }

  errors.gender = ''
  return true
}

function validateReason() {
  if (formData.reason.trim().length < 10) {
    errors.reason = 'Reason must be at least 10 characters'
    return false
  }

  errors.reason = ''
  return true
}

function submitForm() {
  const nameIsValid = validateName()
  const passwordIsValid = validatePassword()
  const passwordConfirmationIsValid = validatePasswordConfirmation()
  const residentIsValid = validateResident()
  const genderIsValid = validateGender()
  const reasonIsValid = validateReason()

  if (
    !nameIsValid ||
    !passwordIsValid ||
    !passwordConfirmationIsValid ||
    !residentIsValid ||
    !genderIsValid ||
    !reasonIsValid
  ) {
    return
  }

  submittedCards.value.push({
    username: formData.username.trim(),
    password: formData.password,
    isAustralian: formData.isAustralian,
    gender: formData.gender,
    reason: formData.reason.trim()
  })
}

function clearForm() {
  formData.username = ''
  formData.password = ''
  formData.confirmPassword = ''
  formData.isAustralian = false
  formData.gender = ''
  formData.reason = ''

  errors.username = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.isAustralian = ''
  errors.gender = ''
  errors.reason = ''
}
</script>
