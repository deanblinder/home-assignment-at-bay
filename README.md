# Todo Application

A modern, feature-rich Todo application built with Next.js, React, and Material-UI. This application provides a seamless user experience for managing tasks with features like real-time updates, search functionality, and infinite scrolling.

## Features

- ✨ Create, read, update, and delete todos
- 🔍 Search functionality to filter todos
- ♾️ Infinite scrolling for better performance
- 🎯 Real-time title updates with debouncing
- ✅ Toggle todo completion status
- 🎨 Modern UI with Material-UI components

## Tech Stack

- **Framework**: Next.js with React
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks
- **Styling**: CSS Modules
- **Type Safety**: TypeScript

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
  app/
    actions/      # API actions and data fetching
    api/          # API route handlers
    components/   # Reusable React components
    constants/    # Application constants
    services/     # Business logic and services
    types.ts      # TypeScript type definitions
    useTodos.ts   # Custom hook for todo management
    utils/        # Utility functions
```

## Features in Detail

### Todo Management

- Create new todos with a title
- Edit todo titles with automatic saving (debounced)
- Toggle todo completion status
- Delete todos

### Search and Filtering

- Real-time search functionality
- Filter todos based on title

### Infinite Scrolling

- Load todos in batches for better performance
- Automatic loading of more todos when scrolling

### Optimizations

- Debounced title updates to prevent excessive API calls
- Memoized components for better performance
- Optimistic updates for better user experience
