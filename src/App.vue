<template>
  <the-header></the-header>
  <the-search></the-search>
  <users-list></users-list>
  <the-pagination></the-pagination>
</template>

<script>
import UsersList from './components/UsersList.vue'
import TheHeader from './components/TheHeader.vue'
import TheSearch from './components/TheSearch.vue'
import ThePagination from './components/ThePagination.vue'

export default {
  components: {
    UsersList,
    TheHeader,
    TheSearch,
    ThePagination
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
