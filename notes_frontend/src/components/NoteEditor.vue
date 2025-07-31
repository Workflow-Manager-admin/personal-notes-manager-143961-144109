<template>
  <div class="note-editor" v-if="selectedNote">
    <div class="editor-header">
      <input
        v-model="title"
        class="note-title"
        placeholder="Title"
        @input="updateTitle"
      />
      <button class="delete-btn" @click="deleteNote" title="Delete this note">
        🗑️
      </button>
    </div>
    <textarea
      v-model="content"
      class="note-content"
      placeholder="Type your note here..."
      @input="updateContent"
    ></textarea>
    <div class="editor-footer">
      <span class="date"
        >Created: {{ formatDate(selectedNote.created) }} | Updated:
        {{ formatDate(selectedNote.updated) }}</span
      >
    </div>
  </div>
  <div v-else class="note-editor-empty">
    Select or create a note to get started.
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useNotesStore } from "../stores/notes";

const store = useNotesStore();
const { selectedNote } = storeToRefs(store);

const title = ref("");
const content = ref("");

watch(
  () => selectedNote.value,
  (note) => {
    if (note) {
      title.value = note.title;
      content.value = note.content;
    } else {
      title.value = "";
      content.value = "";
    }
  },
  { immediate: true }
);

function updateTitle() {
  if (selectedNote.value) {
    store.updateNote(selectedNote.value.id, { title: title.value });
  }
}
function updateContent() {
  if (selectedNote.value) {
    store.updateNote(selectedNote.value.id, { content: content.value });
  }
}
function deleteNote() {
  if (selectedNote.value && confirm("Are you sure you want to delete this note?")) {
    store.deleteNote(selectedNote.value.id);
  }
}
function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  }
  return "";
}
</script>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2.4rem 2.5rem 1.7rem 2.5rem;
  background: var(--note-secondary, #fff);
}
.editor-header {
  display: flex;
  align-items: center;
  gap: 0.6em;
  margin-bottom: 1.1em;
}
.note-title {
  border: none;
  font-size: 1.4em;
  font-weight: bold;
  background: none;
  flex: 1;
  margin-right: 0.6em;
  padding: 0.1em 0.2em;
  color: #1a1a1a;
  outline: none;
  border-bottom: 2px solid var(--note-accent, #e1edff);
}
.delete-btn {
  background: none;
  border: none;
  color: #e6584f;
  font-size: 1.2em;
  padding: 0.28em 0.5em 0.28em 0.45em;
  cursor: pointer;
  border-radius: 5px;
  transition: background .14s;
}
.delete-btn:hover {
  background: #f6d1d1;
}
.note-content {
  font-family: inherit;
  font-size: 1.03em;
  resize: vertical;
  border: 1px solid var(--note-accent, #e1edff);
  border-radius: 7px;
  min-height: 220px;
  padding: 0.9em 1em;
  margin-bottom: 1.3em;
  background: var(--note-accent, #e1edff);
  color: #232323;
  outline: none;
  transition: border 0.2s;
}
.editor-footer {
  font-size: 0.98em;
  color: #838383;
  opacity: 0.7;
}
.note-editor-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.24em;
  color: #888;
  background: var(--note-secondary, #fff);
  font-style: italic;
}
</style>
