
### Prerequisites

Make sure the following are installed on your system:
  
  -Node.js (v18 or above recommended)
  -npm (comes with Node.js)

### Installation
Install all dependencies:

  -npm install / npm i

### Run the application 
Start the development server
  -npm run dev
  -The app will be available at http://localhost:5173

### Tech stack 
  -React
  -TypeScript
  -@tanstack/react-query (server state management)
  -Sonner (toast notifications)
  -Vite (development & build tool)

### Key files:

  1.src/config/userFields.ts — The single config file that defines all form fields. To add a new field (e.g., Date of Birth), just add an object to the array — the form, table, and validation update automatically.

  2.src/services/api.ts — Mock API layer using localStorage with simulated latency. Swap with real fetch calls when your API is ready.

  3.src/hooks/useUsers.ts — React Query hook for CRUD with optimistic cache invalidation and toast notifications.

  4.src/components/DynamicForm.tsx — Schema-driven form renderer with per-field validation.

  5.src/lib/validation.ts — Config-aware validation engine.

