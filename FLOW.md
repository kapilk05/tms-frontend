# Task Management System (TMS) - Frontend Development Flow

## Project Overview

This document outlines the complete implementation plan for building a Task Management System frontend that connects to the TMS backend API deployed at `https://tms-backend-uf8q.onrender.com`.

---

## Why Next.js Over React?

### Next.js Chosen Because:

1. **Built-in Routing** - Next.js App Router provides file-based routing out of the box, eliminating need for react-router-dom setup
2. **Better SEO** - Server-side rendering capabilities for better search engine optimization
3. **API Routes** - Can create API endpoints within the same project if needed for middleware
4. **Optimized Performance** - Automatic code splitting, image optimization, and performance optimizations
5. **Production Ready** - Built-in features like authentication patterns, middleware, and environment variables
6. **Modern Development** - Latest React features (Server Components, Streaming) with TypeScript support
7. **Easier Deployment** - Seamless deployment to Vercel or other platforms
8. **Less Configuration** - Minimal setup compared to Create React App with similar features

### What Plain React Would Require:
- Manual routing setup (React Router)
- Manual state management setup (Redux/Context)
- Manual build optimization
- Additional libraries for features Next.js provides

---

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Authentication**: JWT (stored in localStorage)
- **State Management**: React Context API

---

## Prerequisites

### 1. Install Node.js and npm

**For macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

**Alternative - Download from official site:**
- Visit https://nodejs.org/
- Download LTS version (recommended)
- Run installer

**Verify Installation:**
```bash
node --version
npm --version
```

---

## Project Setup Instructions

### Step 1: Create Next.js Project

```bash
# Navigate to your desktop
cd ~/Desktop

# Create Next.js app with TypeScript
npx create-next-app@latest tms-frontend

# When prompted, select:
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No

# Navigate into project
cd tms-frontend
```

### Step 2: Install Additional Dependencies

```bash
npm install axios react-hook-form date-fns
```

### Step 3: Project Folder Structure

```
tms-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── members/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   └── tasks/
│   │       ├── page.tsx
│   │       ├── [id]/
│   │       │   ├── page.tsx
│   │       │   └── assign/
│   │       │       └── page.tsx
│   │       └── new/
│   │           └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── Pagination.tsx
│   ├── members/
│   │   ├── MemberList.tsx
│   │   ├── MemberCard.tsx
│   │   └── MemberForm.tsx
│   └── tasks/
│       ├── TaskList.tsx
│       ├── TaskCard.tsx
│       ├── TaskForm.tsx
│       └── TaskAssignment.tsx
├── lib/
│   ├── api/
│   │   ├── axios.ts
│   │   ├── auth.ts
│   │   ├── members.ts
│   │   └── tasks.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   └── utils/
│       ├── auth.ts
│       ├── constants.ts
│       └── formatters.ts
├── types/
│   ├── auth.ts
│   ├── member.ts
│   └── task.ts
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Implementation Steps

### Phase 1: Configuration Setup (15 minutes)

#### Step 1.1: Configure Environment Variables

Create `.env.local` file:
```bash
touch .env.local
```

Add the following:
```env
NEXT_PUBLIC_API_URL=https://tms-backend-uf8q.onrender.com/api
```

#### Step 1.2: Update Tailwind Config

File: `tailwind.config.ts`

Replace the entire content with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          light: '#d1fae5',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        warning: {
          light: '#fef3c7',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#fee2e2',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        info: {
          light: '#dbeafe',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

#### Step 1.3: Update Global Styles

File: `app/globals.css`

Replace the entire content with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
  
  h1 {
    @apply text-3xl font-bold;
  }
  
  h2 {
    @apply text-2xl font-semibold;
  }
  
  h3 {
    @apply text-xl font-semibold;
  }
}

@layer components {
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-gray-100 rounded;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400;
  }
  
  /* Card styles */
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .card-hover {
    @apply transition-all duration-200 hover:shadow-lg;
  }
  
  /* Input styles */
  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }
  
  .input-error {
    @apply border-error focus:ring-error;
  }
  
  /* Button base styles */
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500;
  }
  
  .btn-danger {
    @apply bg-error text-white hover:bg-error-dark focus:ring-error;
  }
  
  .btn-outline {
    @apply border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500;
  }
  
  .btn-disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  /* Badge styles */
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  
  .badge-success {
    @apply bg-success-light text-success-dark;
  }
  
  .badge-warning {
    @apply bg-warning-light text-warning-dark;
  }
  
  .badge-error {
    @apply bg-error-light text-error-dark;
  }
  
  .badge-info {
    @apply bg-info-light text-info-dark;
  }
  
  /* Table styles */
  .table-container {
    @apply overflow-x-auto rounded-lg shadow;
  }
  
  .table {
    @apply min-w-full divide-y divide-gray-200;
  }
  
  .table-header {
    @apply bg-gray-50;
  }
  
  .table-header-cell {
    @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
  }
  
  .table-body {
    @apply bg-white divide-y divide-gray-200;
  }
  
  .table-row {
    @apply hover:bg-gray-50 transition-colors duration-150;
  }
  
  .table-cell {
    @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
```

---

### Phase 2: Type Definitions (20 minutes)

#### Step 2.1: Create Type Definitions

Create folder structure:
```bash
mkdir types
```

**File: `types/auth.ts`**
- User interface (id, email, name, role, created_at, updated_at)
- LoginRequest interface (email, password)
- RegisterRequest interface (name, email, password, role_name)
- AuthResponse interface (token, user, message)

**File: `types/member.ts`**
- Member interface (extends User with additional fields)
- MemberListResponse (members array, pagination info)
- CreateMemberRequest interface
- UpdateMemberRequest interface

**File: `types/task.ts`**
- Task interface (id, title, description, status, priority, due_date, created_by, assigned_to, created_at, updated_at)
- TaskStatus enum (pending, in_progress, completed)
- TaskPriority enum (low, medium, high)
- TaskListResponse interface
- CreateTaskRequest interface
- UpdateTaskRequest interface
- AssignTaskRequest interface

---

### Phase 3: API Service Layer (30 minutes)

#### Step 3.1: Create Axios Instance

Create folder:
```bash
mkdir -p lib/api
```

**File: `lib/api/axios.ts`**

Configure Axios with:
- Base URL from environment variables
- Request interceptor to attach JWT token from localStorage
- Response interceptor to handle 401 errors (logout user)
- Error handling utility

#### Step 3.2: Authentication API

**File: `lib/api/auth.ts`**

Functions:
- `register(data: RegisterRequest)` → POST `/auth/register`
- `login(data: LoginRequest)` → POST `/auth/login`
- Store token in localStorage upon successful login
- Return user data and token

#### Step 3.3: Members API

**File: `lib/api/members.ts`**

Functions:
- `getMembers(page?: number, perPage?: number)` → GET `/members?page=1&per_page=10`
- `getMemberById(id: number)` → GET `/members/:id`
- `createMember(data: CreateMemberRequest)` → POST `/members`
- `updateMember(id: number, data: UpdateMemberRequest)` → PATCH `/members/:id`
- `deleteMember(id: number)` → DELETE `/members/:id`

#### Step 3.4: Tasks API

**File: `lib/api/tasks.ts`**

Functions:
- `getTasks(filters?: { page, perPage, status, priority, sort })` → GET `/tasks`
- `getTaskById(id: number)` → GET `/tasks/:id`
- `createTask(data: CreateTaskRequest)` → POST `/tasks`
- `updateTask(id: number, data: UpdateTaskRequest)` → PATCH `/tasks/:id`
- `assignTask(taskId: number, memberIds: number[])` → POST `/tasks/:id/assign`
- `unassignTask(taskId: number, memberId: number)` → DELETE `/tasks/:id/unassign/:memberId`
- `getTaskAssignments(taskId: number)` → GET `/tasks/:id/assignments`

---

### Phase 4: Authentication Context & Utilities (25 minutes)

#### Step 4.1: Create Auth Utilities

**File: `lib/utils/auth.ts`**

Functions:
- `setToken(token: string)` - Store token in localStorage
- `getToken()` - Retrieve token from localStorage
- `removeToken()` - Remove token from localStorage
- `isAuthenticated()` - Check if user is logged in
- `getCurrentUser()` - Get current user from localStorage
- `setCurrentUser(user: User)` - Store user in localStorage

#### Step 4.2: Create Auth Context

**File: `lib/context/AuthContext.tsx`**

Provide:
- `user` state (current logged-in user)
- `isLoading` state
- `login(email, password)` function
- `register(data)` function
- `logout()` function
- `isAuthenticated` boolean

Wrap entire app with AuthProvider in root layout.

#### Step 4.3: Create Constants

**File: `lib/utils/constants.ts`**

Define:
- Task statuses array
- Task priorities array
- Role names array
- Pagination defaults

#### Step 4.4: Create Formatters

**File: `lib/utils/formatters.ts`**

Utility functions:
- `formatDate(date: string)` - Format dates using date-fns
- `getStatusColor(status: string)` - Return Tailwind color class
- `getPriorityColor(priority: string)` - Return Tailwind color class

---

### Phase 5: Reusable UI Components (45 minutes)

Create folder:
```bash
mkdir -p components/ui
```

#### Step 5.1: Button Component

**File: `components/ui/Button.tsx`**

Props:
- variant: 'primary' | 'secondary' | 'danger' | 'outline'
- size: 'sm' | 'md' | 'lg'
- disabled, loading, onClick
- children

#### Step 5.2: Input Component

**File: `components/ui/Input.tsx`**

Props:
- label, type, name, placeholder, error
- register (from react-hook-form)
- required

#### Step 5.3: Card Component

**File: `components/ui/Card.tsx`**

Simple container with shadow and rounded corners.

#### Step 5.4: Table Component

**File: `components/ui/Table.tsx`**

Props:
- columns array (header, accessor, render function)
- data array
- loading state

#### Step 5.5: Modal Component

**File: `components/ui/Modal.tsx`**

Props:
- isOpen, onClose
- title, children
- size

#### Step 5.6: Badge Component

**File: `components/ui/Badge.tsx`**

Props:
- variant: 'success' | 'warning' | 'error' | 'info'
- children

#### Step 5.7: Pagination Component

**File: `components/ui/Pagination.tsx`**

Props:
- currentPage, totalPages
- onPageChange

---

### Phase 6: Layout Components (30 minutes)

Create folder:
```bash
mkdir -p components/layout
```

#### Step 6.1: Header Component

**File: `components/layout/Header.tsx`**

Features:
- Display app logo/name
- Show current user name and role
- Logout button
- Responsive mobile menu

#### Step 6.2: Sidebar Component

**File: `components/layout/Sidebar.tsx`**

Navigation links:
- Dashboard
- Tasks
- Members (only for admin)
- Highlight active route

#### Step 6.3: Dashboard Layout

**File: `app/(dashboard)/layout.tsx`**

- Check authentication (redirect to login if not authenticated)
- Wrap with Sidebar and Header
- Main content area

---

### Phase 7: Authentication Pages (40 minutes)

Create auth route group:
```bash
mkdir -p app/\(auth\)/login
mkdir -p app/\(auth\)/register
```

#### Step 7.1: Login Page

**File: `app/(auth)/login/page.tsx`**

Features:
- Email and password inputs
- Form validation using react-hook-form
- Show loading state during login
- Display error messages
- Redirect to dashboard on success
- Link to register page

Form fields:
- Email (required, email validation)
- Password (required, min 6 characters)

#### Step 7.2: Register Page

**File: `app/(auth)/register/page.tsx`**

Features:
- Name, email, password, role inputs
- Form validation
- Show loading state
- Display error messages
- Redirect to dashboard on success
- Link to login page

Form fields:
- Name (required)
- Email (required, email validation)
- Password (required, min 6 characters)
- Role (select: admin or user)

---

### Phase 8: Dashboard Home (20 minutes)

#### Step 8.1: Dashboard Page

**File: `app/(dashboard)/dashboard/page.tsx`**

Display:
- Welcome message with user name
- Statistics cards:
  - Total tasks
  - Pending tasks
  - Completed tasks
  - Assigned to me
- Recent tasks list (last 5 tasks)

---

### Phase 9: Members Management (60 minutes)

Create folders:
```bash
mkdir -p app/\(dashboard\)/members/new
mkdir -p app/\(dashboard\)/members/\[id\]
mkdir -p components/members
```

#### Step 9.1: Members List Page

**File: `app/(dashboard)/members/page.tsx`**

Features:
- Display members in a table
- Pagination controls
- "Add New Member" button (admin only)
- Search/filter functionality
- Actions: View, Edit, Delete

Columns:
- ID
- Name
- Email
- Role
- Created At
- Actions

#### Step 9.2: Member Form Component

**File: `components/members/MemberForm.tsx`**

Reusable form for create/edit:
- Name input
- Email input
- Password input (only for create, optional for edit)
- Role select
- Submit button
- Cancel button

#### Step 9.3: Create Member Page

**File: `app/(dashboard)/members/new/page.tsx`**

- Render MemberForm
- Handle form submission
- Show success message
- Redirect to members list

#### Step 9.4: View/Edit Member Page

**File: `app/(dashboard)/members/[id]/page.tsx`**

- Fetch member by ID
- Show member details
- Edit mode toggle
- Render MemberForm with initial values
- Update member on submit
- Delete member button (with confirmation)

---

### Phase 10: Tasks Management (90 minutes)

Create folders:
```bash
mkdir -p app/\(dashboard\)/tasks/new
mkdir -p app/\(dashboard\)/tasks/\[id\]
mkdir -p app/\(dashboard\)/tasks/\[id\]/assign
mkdir -p components/tasks
```

#### Step 10.1: Tasks List Page

**File: `app/(dashboard)/tasks/page.tsx`**

Features:
- Display tasks in cards or table view
- Filters:
  - Status (all, pending, in_progress, completed)
  - Priority (all, low, medium, high)
  - Sort by (created_at, due_date, priority)
- Pagination
- "Create New Task" button
- Actions: View, Edit, Assign, Delete

Task Card/Row shows:
- Title
- Description (truncated)
- Status badge
- Priority badge
- Due date
- Assigned members count
- Actions

#### Step 10.2: Task Form Component

**File: `components/tasks/TaskForm.tsx`**

Reusable form for create/edit:
- Title input
- Description textarea
- Status select (pending, in_progress, completed)
- Priority select (low, medium, high)
- Due date picker
- Submit button
- Cancel button

#### Step 10.3: Create Task Page

**File: `app/(dashboard)/tasks/new/page.tsx`**

- Render TaskForm
- Handle form submission
- Show success message
- Redirect to tasks list

#### Step 10.4: View/Edit Task Page

**File: `app/(dashboard)/tasks/[id]/page.tsx`**

Sections:
- Task details display
- Edit mode toggle
- Render TaskForm with initial values
- Update task on submit
- Delete task button
- Assigned members list
- "Assign Members" button

#### Step 10.5: Task Assignment Component

**File: `components/tasks/TaskAssignment.tsx`**

Features:
- Fetch all members
- Display members list with checkboxes
- Show currently assigned members
- Assign multiple members at once
- Unassign individual members

#### Step 10.6: Task Assignment Page

**File: `app/(dashboard)/tasks/[id]/assign/page.tsx`**

- Render TaskAssignment component
- Handle assignment submission
- Show success message
- Navigate back to task details

---

### Phase 11: Error Handling & Loading States (20 minutes)

#### Step 11.1: Create Loading Components

**File: `app/loading.tsx`**
- Global loading spinner

**File: `app/(dashboard)/loading.tsx`**
- Dashboard loading skeleton

#### Step 11.2: Create Error Components

**File: `app/error.tsx`**
- Global error boundary

**File: `app/(dashboard)/error.tsx`**
- Dashboard error handler

#### Step 11.3: Create Not Found Page

**File: `app/not-found.tsx`**
- Custom 404 page

---

### Phase 12: Styling & Polish (30 minutes)

#### Step 12.1: Responsive Design

Ensure all pages work on:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

#### Step 12.2: Color Scheme

Apply consistent colors:
- Primary: Blue shades
- Success: Green
- Warning: Yellow
- Error: Red
- Neutral: Gray shades

#### Step 12.3: Transitions & Animations

Add smooth transitions:
- Button hover effects
- Modal fade in/out
- Page transitions
- Loading spinners

---

### Phase 13: Testing & Validation (30 minutes)

#### Step 13.1: Test Authentication Flow

1. Register new user
2. Login with credentials
3. Verify token storage
4. Test logout
5. Test protected routes

#### Step 13.2: Test Members Management

1. Create member (admin only)
2. View members list with pagination
3. Edit member details
4. Delete member
5. Test role-based access

#### Step 13.3: Test Tasks Management

1. Create new task
2. View tasks list with filters
3. Edit task details
4. Assign task to members
5. Unassign members
6. Delete task
7. Test pagination and sorting

#### Step 13.4: Test Error Scenarios

1. Invalid login credentials
2. Network errors
3. Unauthorized access
4. Invalid form submissions
5. 404 pages

---

## Running the Application

### Development Mode

```bash
# Start development server
npm run dev

# Open browser at
http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and deploy to production
vercel --prod
```

### Environment Variables on Vercel

Add in Vercel Dashboard:
- `NEXT_PUBLIC_API_URL`: `https://tms-backend-uf8q.onrender.com/api`

---

## Git Workflow

### Initial Setup

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TMS Frontend with Next.js"

# Create GitHub repository (via GitHub website)
# Then add remote
git remote add origin https://github.com/YOUR_USERNAME/tms-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/member-management

# Make changes and commit
git add .
git commit -m "Add member management pages"

# Push to GitHub
git push origin feature/member-management

# Create pull request on GitHub
# Merge to main after review
```

---

## API Integration Summary

### Authentication Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Members Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/members` | Get all members | Yes |
| GET | `/api/members/:id` | Get member by ID | Yes |
| POST | `/api/members` | Create member | Yes (Admin) |
| PATCH | `/api/members/:id` | Update member | Yes (Admin) |
| DELETE | `/api/members/:id` | Delete member | Yes (Admin) |

### Tasks Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/tasks` | Get all tasks | Yes |
| GET | `/api/tasks/:id` | Get task by ID | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PATCH | `/api/tasks/:id` | Update task | Yes |
| POST | `/api/tasks/:id/assign` | Assign members | Yes |
| DELETE | `/api/tasks/:id/unassign/:memberId` | Unassign member | Yes |
| GET | `/api/tasks/:id/assignments` | Get assignments | Yes |

---

## Key Features Implementation

### 1. Role-Based Access Control

- Admin: Full access to all features
- User: Limited access (can't manage members)
- Implement in AuthContext
- Check role before rendering admin-only components

### 2. Pagination

- Implement on members list page
- Implement on tasks list page
- Use query parameters: `?page=1&per_page=10`
- Show page numbers and next/prev buttons

### 3. Task Filtering

- Filter by status (pending, in_progress, completed)
- Filter by priority (low, medium, high)
- Sort by date, priority
- Update URL with query parameters

### 4. Task Assignment

- Select multiple members from list
- Assign all at once
- Display assigned members on task card
- Allow unassignment with confirmation

### 5. Form Validation

- Use react-hook-form for all forms
- Client-side validation
- Display error messages inline
- Disable submit button during submission

### 6. Loading States

- Show spinners during API calls
- Disable buttons during submission
- Skeleton loaders for lists
- Progress indicators

### 7. Error Handling

- Display API error messages
- Toast notifications for success/error
- Fallback UI for errors
- Retry mechanisms

---

## Timeline Estimate

| Phase | Duration | Total |
|-------|----------|-------|
| Setup & Configuration | 15 min | 0:15 |
| Type Definitions | 20 min | 0:35 |
| API Service Layer | 30 min | 1:05 |
| Auth Context & Utils | 25 min | 1:30 |
| UI Components | 45 min | 2:15 |
| Layout Components | 30 min | 2:45 |
| Auth Pages | 40 min | 3:25 |
| Dashboard | 20 min | 3:45 |
| Members Management | 60 min | 4:45 |
| Tasks Management | 90 min | 6:15 |
| Error Handling | 20 min | 6:35 |
| Styling & Polish | 30 min | 7:05 |
| Testing | 30 min | 7:35 |

**Total Estimated Time: ~8 hours**

---

## Best Practices

1. **Component Reusability**: Create reusable UI components
2. **Type Safety**: Use TypeScript for all files
3. **Error Boundaries**: Implement error handling at multiple levels
4. **Loading States**: Always show feedback during async operations
5. **Responsive Design**: Mobile-first approach
6. **Code Organization**: Group related components and utilities
7. **API Error Handling**: Centralized error handling in Axios interceptors
8. **Security**: Never expose sensitive data, validate on both client and server
9. **Performance**: Use Next.js Image component, lazy loading, code splitting
10. **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation

---

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Backend should have CORS enabled for frontend domain
- Check API URL in .env.local

**2. Authentication Errors**
- Verify token is stored in localStorage
- Check token format in request headers
- Ensure token is not expired

**3. Build Errors**
- Clear .next folder: `rm -rf .next`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

**4. Environment Variables Not Working**
- Ensure .env.local is in root directory
- Restart dev server after adding env variables
- Variables must start with NEXT_PUBLIC_ for client-side access

---

## Additional Resources

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Hook Form: https://react-hook-form.com/
- Axios: https://axios-http.com/docs/intro
- TypeScript: https://www.typescriptlang.org/docs/

---

## Conclusion

This flow provides a comprehensive guide to building a production-ready Task Management System frontend with Next.js. Follow each phase sequentially, test thoroughly, and maintain code quality throughout the development process.

The resulting application will be:
- ✅ Fully functional with all API endpoints integrated
- ✅ Role-based access control implemented
- ✅ Responsive and mobile-friendly
- ✅ Type-safe with TypeScript
- ✅ Production-ready and deployable
- ✅ Well-organized and maintainable

Good luck with your implementation! 🚀
