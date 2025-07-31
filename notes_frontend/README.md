# vue-kavia Notes Frontend

A minimalistic personal notes frontend built with Vue 3 and Vite.

## Features

- Create, edit, delete, and view a list of personal notes.
- Simple, light-themed UI.
- Sidebar for navigation.
- Main area for note content.
- Uses the following color palette:
  - Primary: #4f8cff
  - Accent: #e1edff
  - Secondary: #ffffff

## Getting Started

### Project Setup

```sh
npm install
```

```sh
npm run dev
```

### Environment Variables

Currently, no required `.env` variables. For API integration, use `import.meta.env` (e.g., `import.meta.env.VITE_API_URL`) in your code and define keys in a `.env` file at project root.

### Build/Type Check/Test

```sh
npm run build
npm run test:unit
npm run lint
```

## Directory Structure

- `src/stores/notes.ts` &ndash; Pinia store for notes CRUD
- `src/components/Sidebar.vue` &ndash; Sidebar for note navigation and create
- `src/components/NoteEditor.vue` &ndash; Note viewing & editing form
- `src/components/MainLayout.vue` &ndash; Layout with sidebar + main area
- `src/views/HomeView.vue` &ndash; Main entrypoint using layout and editor

## Styling

Palette and layout defined in `src/assets/main.css`.

## Customization

Adapt API/data logic as needed for real backend connectivity.

