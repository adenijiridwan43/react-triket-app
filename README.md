# Triket - React Implementation 🎫

A modern, responsive ticket management system built with **React 19**, **Zustand**, **React Router**, and **Tailwind CSS**.

## 🚀 Features

✅ **Landing Page** 
✅ **Authentication** - Login/Signup with form validation and mock auth  
✅ **Protected Routes** - Dashboard and Tickets pages require authentication  
✅ **Dashboard** - Overview statistics and quick actions  
✅ **Full CRUD Operations** - Create, Read, Update, Delete tickets  
✅ **Real-time Validation** - Inline error messages and toast notifications  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **Status Management** - Color-coded status badges (Open, In Progress, Closed)  
✅ **Persistent State** - Data saved to localStorage via Zustand  

## 🛠️ Tech Stack

- **React 19.1** - Latest React with improved performance
- **Vite 7** - Lightning-fast build tool
- **Zustand 5** - Lightweight state management with persistence
- **React Router DOM 7** - Client-side routing with protected routes
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **LocalStorage** - Session and data persistence

## 📁 Project Structure

```
react-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── TextArea.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Toast.jsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.jsx
│   │   │   └── QuickActions.jsx
│   │   ├── tickets/
│   │   │   ├── TicketCard.jsx
│   │   │   ├── TicketForm.jsx
│   │   │   ├── TicketList.jsx
│   │   │   └── StatusBadge.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TicketsPage.jsx
│   │   └── NotFound.jsx
│   ├── store/
│   │   └── index.js (Zustand store)
│   ├── hooks/
│   │   └── usePageTitle.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm/yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the React app directory:**
   ```bash
   cd react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## 🎨 Design System

### Max Width Container
All content is centered with a `max-width: 1440px` on large screens.

### Color Scheme

**Status Colors:**
- 🟢 Open → Green (`#10B981`)
- 🟡 In Progress → Amber (`#F59E0B`)
- ⚪ Closed → Gray (`#6B7280`)

**Brand Colors:**
- Primary → Indigo (`#4F46E5`)
- Secondary → Blue (`#2563EB`)

### Typography
- Font Family: System fonts (Apple, Segoe UI, Roboto)
- Headings: Bold, extrabold weights
- Body: Regular, medium weights

### Components

**Hero Section:**
- Decorative blur circles
- Gradient background (slate-900 to indigo-900)

**Card Layouts:**
- Rounded corners (`rounded-xl`, `rounded-2xl`)
- Soft shadows with hover effects
- Border hover states

## 🔐 Authentication

### Mock Authentication System

This app uses **mock authentication** for demonstration purposes.

**Session Storage:**
- Key: `ticketapp_session`
- Stored in: `localStorage`
- Contains: `{ token, user }`

**Login:**
- Any email/password combination works
- Session persists across page refreshes

**Protected Routes:**
- `/dashboard` - Requires authentication
- `/tickets` - Requires authentication

**Public Routes:**
- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Signup page

### Test Credentials

Use **any email and password** to login:
```
Email: test@triket.com
Password: password123
```

## 📝 Validation Rules

### Ticket Validation

**Required Fields:**
- `title` (max 100 characters)
- `status` (must be: `open`, `in_progress`, `closed`)

**Optional Fields:**
- `description` (max 500 characters)
- `priority` (must be: `low`, `medium`, `high`)

**Error Display:**
- Inline errors below form fields
- Toast notifications for success/failure
- Real-time validation on form submission

### Auth Validation

**Login:**
- Email: Must be valid email format
- Password: Required

**Signup:**
- Email: Must be valid email format
- Password: Minimum 6 characters
- Name: Optional

## 🧪 Key React Features Used


### Zustand Store

Centralized state management with selectors:
```javascript
export const useTicketStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      tickets: [],
      
      // Actions
      login: async (email, password) => { ... },
      createTicket: async (data) => { ... }
    }),
    {
      name: 'ticket-store',
      partialize: (state) => ({ ... })
    }
  )
)

// Custom hooks
export const useAuth = () => {
  const store = useTicketStore()
  return {
    user: store.user,
    login: store.login,
    logout: store.logout
  }
}
```


## 🎭 Component Patterns

### Reusable UI Components

**Button.jsx:**
- Multiple variants (primary, secondary, danger, ghost, outline)
- Loading states with spinner
- Icon support
- Size options (sm, md, lg, xl)
- Full width option

**Input.jsx:**
- Controlled component pattern
- Error state styling
- Label and placeholder support
- Disabled state

**Modal.jsx:**
- Portal-like rendering (fixed positioning)
- Backdrop click to close
- Escape key support (can be added)

### Conditional Rendering

```jsx
{loading ? (
  <Spinner />
) : error ? (
  <ErrorMessage message={error} />
) : (
  <TicketList tickets={tickets} />
)}
```

### List Rendering

```jsx
{tickets.map((ticket) => (
  <TicketCard 
    key={ticket.id} 
    ticket={ticket} 
  />
))}
```

## 🚨 Error Handling

### Form Errors
Stored in Zustand store and displayed inline below form fields and in toast notifications.

### Network Errors (Simulated)
```javascript
simulateNetworkError: () => {
  set({
    error: 'Failed to load tickets. Please retry.',
    toast: {
      type: 'error',
      message: 'Network error occurred.'
    }
  })
}
```

### Unauthorized Access
Handled by `ProtectedRoute` component:
```jsx
if (!isAuthenticated) {
  return <Navigate to="/auth/login" state={{ from: location }} replace />
}
```

### Session Expiry
```javascript
handleSessionExpiry: () => {
  localStorage.removeItem('ticketapp_session')
  set({
    user: null,
    isAuthenticated: false,
    toast: {
      type: 'error',
      message: 'Your session has expired — please log in again.'
    }
  })
}
```

## ♿ Accessibility Features

- ✅ Semantic HTML elements (`<header>`, `<main>`, `<footer>`, `<nav>`)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states on buttons and inputs
- ✅ Color contrast ratios meet WCAG AA standards
- ✅ Alt text for icons (via aria-label)

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

**Responsive Features:**
- Mobile hamburger menu
- Stacked layout on mobile
- Grid layouts adjust by screen size
- Touch-friendly button sizes

## 🐛 Known Issues

- None currently! 🎉

## 🔄 State Management Architecture

### Zustand Store Structure

```javascript
{
  // Auth State
  user: { id, email, name },
  isAuthenticated: boolean,
  authToken: string,
  
  // Tickets State
  tickets: Array<Ticket>,
  currentTicket: Ticket | null,
  
  // UI State
  loading: boolean,
  error: string | null,
  toast: { type, message } | null,
  formErrors: Object,
  
  // Computed Values
  getStats: () => { total, open, inProgress, closed },
  
  // Actions
  login, signup, logout, restoreSession,
  createTicket, updateTicket, deleteTicket,
  clearToast, setError, clearError
}
```

### Persistence

Only these fields are persisted to localStorage:
- `tickets`
- `user`
- `isAuthenticated`
- `authToken`

UI state (loading, errors, toast) is NOT persisted.

## 📚 Learning Resources

- [React Docs](https://react.dev/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)

## 🔧 Customization

### Adding New Status Types

1. Update validation in `store/index.js`:
```javascript
const validStatuses = ['open', 'in_progress', 'closed', 'your_new_status']
```

2. Add color mapping in components:
```javascript
const statusColors = {
  your_new_status: 'bg-purple-100 text-purple-800'
}
```

### Adding New Priority Levels

1. Update validation:
```javascript
if (ticket.priority && !['low', 'medium', 'high', 'critical'].includes(ticket.priority))
```

2. Update Select options in `TicketForm.jsx`

### Changing Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

## 🤝 Contributing

This is a demo project for a stage 2 frontend challenge. Feel free to fork and improve!
