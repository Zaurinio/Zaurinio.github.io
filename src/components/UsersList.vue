<template>
  <error-modal :show="!!error" title="An error occured" @closeModal="closeModal">
    <p>{{ error }}</p>
  </error-modal>
  <section class="users-page">
    <load-spinner v-if="dataIsLoading"></load-spinner>
    <ul class="users-list" v-else-if="hasUsers && !dataIsLoading & (pageUsersList.length > 0)">
      <user-item
        v-for="user in pageUsersList"
        :key="user.id"
        :id="user.id"
        :first-name="user['first_name']"
        :last-name="user['last_name']"
        :avatar="user['avatar']"
        :email="user['email']"
        :phone="user['phone']"
        :open="user['open']"
        @toggle="toggleAccordion"
      ></user-item>
    </ul>
    <h3 v-else>No users found</h3>
  </section>
</template>

<script>
import UserItem from './UserItem.vue'
import LoadSpinner from './LoadSpinner.vue'
import ErrorModal from './ErrorModal.vue'

export default {
  components: {
    UserItem,
    LoadSpinner,
    ErrorModal
  },
  data() {
    return {
      error: null,
      timer: ''
    }
  },
  methods: {
    async loadPageUsers() {
      this.$store.dispatch('setDataLoadingStatus', true)
      try {
        await this.$store.dispatch('fetchPageData')
      } catch (error) {
        this.error = error.message || 'Something went wrong'
      }
      this.$store.dispatch('setDataLoadingStatus', false)
    },
    closeModal() {
      this.error = null
    },
    toggleAccordion(id) {
      this.$store.dispatch('setAccordionStatus', id)
    },
    cancelAutoUpdate() {
      clearInterval(this.timer)
    },
    onScroll() {
      this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
    }
  },
  computed: {
    filterValue() {
      return this.$store.getters.filterValue
    },
    pageUsersList() {
      return this.$store.getters.pageUsers(this.filterValue)
    },
    hasUsers() {
      return this.$store.getters.hasUsers
    },
    currentPageNumber() {
      return this.$store.getters.currentPageNumber
    },
    dataIsLoading() {
      return this.$store.getters.dataLoadingStatus
    }
  },
  created() {
    this.loadPageUsers()
    this.timer = setInterval(this.loadPageUsers, 60000)
  },
  beforeUnmount() {
    this.cancelAutoUpdate()
  }
}
</script>

<style scoped>
.users-page {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

.users-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
