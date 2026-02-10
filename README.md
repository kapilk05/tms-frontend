# TMS Frontend - Task Management System

A modern, responsive Task Management System built with Next.js 14, TypeScript, and Tailwind CSS featuring a sleek black and white gradient UI.

## 🎨 Features

- **Authentication System** - Secure login/register with JWT
- **Dashboard** - Overview with task statistics and recent tasks
- **Task Management** - Create, edit, delete, and assign tasks
- **Member Management** - User and admin role management
- **Role-Based Access** - Different permissions for admin and user roles
- **Responsive Design** - Beautiful gradient UI that works on all devices
- **Real-time Updates** - Instant feedback on all operations

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Date Formatting**: date-fns
- **Authentication**: JWT (localStorage)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running at `https://tms-backend-uf8q.onrender.com/api`

## 🛠️ Installation

1. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

3. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
tms-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── members/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── tasks/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   └── layout/
├── lib/
│   ├── api/
│   ├── context/
│   └── utils/
├── types/
└── README.md
\`\`\`

## 🎯 Usage

### Authentication
1. **Register**: Create a new account with name, email, password, and role
2. **Login**: Sign in with your credentials
3. **Logout**: Click logout button in the header

### Dashboard
- View task statistics (Total, Pending, In Progress, Completed)
- See recent tasks
- Quick navigation to tasks and members

### Task Management
- **Create Task**: Click "Create Task" button
- **View Tasks**: Browse all tasks with filters (status, priority)
- **Edit Task**: Click on a task to view/edit details
- **Assign Task**: Assign tasks to team members

### Member Management (Admin Only)
- **Add Member**: Create new user accounts
- **View Members**: See all team members
- **Edit Member**: Update member information
- **Delete Member**: Remove members from the system

## 🎨 UI Design

The application features a modern black and white gradient design with:
- Gradient backgrounds (from-gray-900 via-gray-800 to-black)
- White card-based layouts with shadows
- Smooth hover effects and transitions
- Responsive design for all screen sizes

## 🧪 Development

\`\`\`bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📝 Environment Variables

No environment variables required. API URL is configured in \`lib/api/axios.ts\`.

---

**Happy Task Managing! 🎯**
