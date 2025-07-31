import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Note {
  id: number;
  title: string;
  content: string;
  created: string;
  updated: string;
}

// PUBLIC_INTERFACE
export const useNotesStore = defineStore("notes", () => {
  // Persistent store logic (replace with API/DB as needed)
  const notes = ref<Note[]>([]);
  const selectedId = ref<number | null>(null);
  let nextId = 1;

  // Load initial state from localStorage if available
  if (window && window.localStorage.getItem("notes_app_notes")) {
    try {
      const raw = JSON.parse(window.localStorage.getItem("notes_app_notes") || "[]");
      notes.value = raw;
      if (raw.length > 0) {
        nextId = Math.max(...raw.map((n: Note) => n.id)) + 1;
      }
    } catch { /* Ignore errors */ }
  }

  function persist() {
    window.localStorage.setItem("notes_app_notes", JSON.stringify(notes.value));
  }
  // PUBLIC_INTERFACE
  function createNote() {
    const now = new Date().toISOString();
    const n: Note = {
      id: nextId++,
      title: "Untitled Note",
      content: "",
      created: now,
      updated: now,
    };
    notes.value.unshift(n);
    persist();
    selectedId.value = n.id;
    return n.id;
  }
  // PUBLIC_INTERFACE
  function updateNote(id: number, fields: Partial<Omit<Note, "id" | "created">>) {
    const idx = notes.value.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notes.value[idx] = {
        ...notes.value[idx],
        ...fields,
        updated: new Date().toISOString(),
      };
      persist();
    }
  }
  // PUBLIC_INTERFACE
  function deleteNote(id: number) {
    const idx = notes.value.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notes.value.splice(idx, 1);
      persist();
      if (selectedId.value === id) {
        selectedId.value = notes.value.length > 0 ? notes.value[0].id : null;
      }
    }
  }
  // PUBLIC_INTERFACE
  function selectNote(id: number) {
    selectedId.value = id;
  }

  // PUBLIC_INTERFACE
  const selectedNote = computed(() =>
    notes.value.find((n) => n.id === selectedId.value) || null
  );

  return {
    notes,
    selectedId,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
  };
});
