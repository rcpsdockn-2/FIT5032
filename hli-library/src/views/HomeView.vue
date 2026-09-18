<template>
  <div class="container page-shell">
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
      <div class="container-fluid py-3">
        <h1 class="display-6">FIT5032 Library Application</h1>
        <p class="lead mb-4">
          Week 5 routing, Week 7 Firebase Authentication and Week 8 Firestore.
        </p>
        <RouterLink class="btn btn-primary me-2" to="/firebase-register">
          Create an account
        </RouterLink>
        <RouterLink class="btn btn-outline-primary" to="/add-book">
          Manage books
        </RouterLink>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h2 class="h5">Week 5</h2>
            <p class="mb-0">Vue Router navigation with Home, About and Library pages.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h2 class="h5">Week 7</h2>
            <p class="mb-0">Firebase email/password registration, sign-in and logout.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h2 class="h5">Week 8</h2>
            <p class="mb-0">Create, retrieve, update and delete books in Firestore.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
