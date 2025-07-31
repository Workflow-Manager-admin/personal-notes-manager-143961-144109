<template>
  <div class="mainlayout">
    <NotesSidebar />
    <main class="mainarea">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import NotesSidebar from "@/components/NotesSidebar.vue";
</script>

<style scoped>
.mainlayout {
  display: flex;
  height: 100vh;
  background: var(--note-secondary, #fff);
}
.mainarea {
  flex: 1 1 auto;
  background: var(--note-secondary, #fff);
  height: 100vh;
  overflow-y: auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
@media (max-width: 650px) {
  .mainlayout {
    flex-direction: column;
  }
  .mainarea {
    height: auto;
    min-height: 350px;
    padding-bottom: 2rem;
  }
}
</style>
