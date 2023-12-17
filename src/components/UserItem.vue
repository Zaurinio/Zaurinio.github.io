<template>
  <li class="user-item" @click="toggleAccordion">
    <div class="brief-info">
      <h2 :class="fullnameClass">{{ fullName }}</h2>
    </div>
    <transition name="accordion" mode="out-in">
      <div class="full-info" v-show="open">
        <img class="avatar" :src="avatar" />
        <div class="contact">
          <p class="email"><span class="caption">E-mail:</span> {{ email }}</p>
          <p class="phone"><span class="caption">Phone:</span> {{ phone }}</p>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'email', 'id', 'open', 'avatar', 'phone'],
  emits: ['toggle'],
  data() {
    return {
      fullName: this.firstName + ' ' + this.lastName
    }
  },
  methods: {
    toggleAccordion() {
      this.$emit('toggle', this.id)
    }
  },
  computed: {
    fullnameClass() {
      return this.open ? 'fullname-opened' : 'fullname-closed'
    }
  }
}
</script>

<style scoped>
.user-item {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 15px 20px;
  cursor: pointer;
}

.fullname-opened {
  margin: 0;
  margin-bottom: 12px;
}
.fullname-closed {
  margin: 0;
}

.email {
  margin: 0;
  margin-bottom: 8px;
}
.phone {
  margin: 0;
}

.full-info {
  display: flex;
  align-items: center;
}

.avatar {
  display: inline-block;
  max-width: 100%;
  margin-right: 25px;
}

.caption {
  font-weight: 700;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0px;
  overflow: hidden;
}

.accordion-enter-active {
  transition: all 0.5s ease-out;
}

.accordion-leave-active {
  transition: all 0.5s ease-in;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 100px;
  overflow: hidden;
}
</style>
