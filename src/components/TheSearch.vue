<template>
  <section class="search">
    <input
      type="text"
      name="search"
      class="input"
      placeholder="Search..."
      v-model="searchQuery"
      @input="setFilterValue"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    setFilterValue() {
      this.$store.dispatch('setFilterValue', this.searchQuery)
    }
  }
}
</script>

<style scoped>
.search {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

.input {
  width: 100%;
  border: 1px solid black;
  border-radius: 12px;
  padding: 10px 15px;
}

.input:focus {
  outline: none;
}
</style>
