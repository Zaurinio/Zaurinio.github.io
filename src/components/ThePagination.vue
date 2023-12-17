<template>
  <section class="pages">
    <ul class="pages-list">
      <li
        v-for="pageNumber in pagesQty"
        :class="{ 'pages-item': true, 'current-page': pageNumber === currentPageNumber }"
        :key="pageNumber"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  methods: {
    async changePage(pageNumber) {
      this.$store.dispatch('setDataLoadingStatus', true)
      try {
        await this.$store.dispatch('fetchPageData', pageNumber)
      } catch (error) {
        this.error = error.message || 'Something went wrong'
      }
      this.$store.dispatch('setDataLoadingStatus', false)
      this.$store.dispatch('setCurrentPageNumber', pageNumber)
    }
  },
  computed: {
    pagesQty() {
      return this.$store.getters.pagesQty
    },
    currentPageNumber() {
      return this.$store.getters.currentPageNumber
    }
  }
}
</script>

<style scoped>
.pages {
  margin: 2rem auto;
  max-width: 40rem;
}

.pages-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}

.pages-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #dfdddd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}

.pages-item:hover {
  background-color: #d0d9f0;
}

.pages-item:active {
  background-color: #607bc1;
}

.pages-item:not(:last-child) {
  margin-right: 20px;
}

.current-page {
  border: 1px solid #74767e;
}
</style>
