<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <h2 class="app-title">Notes</h2>
      <button class="new-note-btn" @click="addNote" title="Create new note">
        + New Note
      </button>
    </header>
    <nav class="notes-nav">
      <ul>
        <li
          v-for="note in notes"
          :key="note.id"
          :class="{ selected: note.id === selectedId }"
          @click="selectNote(note.id)"
        >
          <span class="note-title">{{ note.title || 'Untitled' }}</span>
          <span class="note-date">{{ formatDate(note.updated) }}</span>
        </li>
      </ul>
      <div v-if="notes.length === 0" class="empty-sidebar">No notes yet</div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotesStore } from "../stores/notes";

const store = useNotesStore();
const { notes, selectedId } = storeToRefs(store);

function selectNote(id: number) {
  store.selectNote(id);
}

function addNote() {
  store.createNote();
}

function formatDate(date: string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }
  return "";
}
</script>

<style scoped>
.sidebar {
  width: 270px;
  min-width: 210px;
  max-width: 300px;
  background: var(--note-accent, #e1edff);
  border-right: 1.5px solid var(--note-border, #e5e7eb);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 0.4rem 0 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.4rem 1.5rem 2rem;
  background: var(--note-accent, #e1edff);
  border-bottom: 1.5px solid var(--note-border, #e5e7eb);
}

.app-title {
  font-size: 1.29em;
  color: var(--note-primary, #4f8cff);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.01em;
}

.new-note-btn {
  background: var(--note-primary, #4f8cff);
  color: #fff;
  padding: 0.39em 1.1em;
  border: none;
  border-radius: 6px;
  font-size: 1.03em;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.13s;
}
.new-note-btn:hover {
  background: #2670e7;
}

.notes-nav {
  flex: 1;
  padding: 1.2rem 0.6rem 1.2rem 1.2rem;
  overflow-y: auto;
}
.notes-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.notes-nav li {
  padding: 0.6rem 0.7rem 0.6rem 0.7rem;
  margin-bottom: 0.5em;
  background: #fff;
  border-radius: 7px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border: 1.2px solid transparent;
  font-size: 1.08em;
  transition: background 0.12s, border 0.13s;
}
.notes-nav li.selected,
.notes-nav li:hover {
  border: 1.2px solid var(--note-primary, #4f8cff);
  background: var(--note-accent, #e1edff);
}
.note-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  display: inline-block;
}
.note-date {
  font-size: 0.92em;
  color: #7fa1d7;
  margin-left: 0.58rem;
}

.empty-sidebar {
  text-align: center;
  margin-top: 2.3em;
  color: #9faec6;
  font-style: italic;
  font-size: 1.04em;
}

@media (max-width: 650px) {
  .sidebar {
    width: 100%;
    max-width: none;
    min-width: 0;
    height: auto;
    border-right: none;
    border-bottom: 1.5px solid var(--note-border, #e5e7eb);
  }
  .sidebar-header {
    padding: 1.1rem 1.2rem 1.1rem 1.5rem;
  }
  .notes-nav {
    padding: 0.8rem 0.5rem 0.8rem 0.8rem;
  }
}
</style>
