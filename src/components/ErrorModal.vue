<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <dialog open v-if="show">
      <header>
        <h2>{{ title }}</h2>
      </header>
      <section>
        <slot></slot>
      </section>
      <div class="actions">
        <button @click="close">Close</button>
      </div>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: ['show', 'title'],
  emits: ['closeModal'],
  methods: {
    close() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

.actions {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
