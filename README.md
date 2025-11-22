# Recruitment Portal System (Job Board)

A comprehensive full-featured recruitment platform built with React, featuring three distinct user roles: Candidates, Employers, and Administrators.

## 🚀 Features

### For Candidates (Người tìm việc)
- ✅ **Authentication**: Register, Login (Social/Email), Forgot Password
- ✅ **Profile Management**: Create and manage CV, Education, Experience, Skills
- ✅ **Job Search**: Advanced search with filters (Location, Salary, Industry)
- ✅ **Applications**: Apply to jobs, track application status
- ✅ **Saved Jobs**: Bookmark interesting positions
- ✅ **Interviews**: Calendar view for scheduled interviews
- ✅ **Premium Badge**: Special features for premium users
- ✅ **Notifications**: Real-time updates on applications

### For Employers (Nhà tuyển dụng)
- ✅ **Company Profile**: Employer branding page with logo, banner, description
- ✅ **Job Management**: Create, edit, delete job postings
- ✅ **Candidate Management**: View applications, filter candidates
- ✅ **Analytics Dashboard**: Charts for views, applications, conversion rates
- ✅ **Service Packages**: Basic, Pro, Enterprise plans
- ✅ **Multi-user**: Admin and Recruiter roles within company
- ✅ **KYC Verification**: Company verification status

### For Administrators (Quản trị viên)
- ✅ **Dashboard**: System overview with key metrics
- ✅ **User Management**: Manage candidates and employers
- ✅ **Job Moderation**: Approve/reject job postings
- ✅ **Company Verification**: KYC approval workflow
- ✅ **Content Management**: Manage categories, locations
- ✅ **Service Packages**: Configure pricing and features
- ✅ **Reports**: System analytics and statistics

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS (Mobile-first, Responsive)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Charts**: Recharts
- **Data Strategy**: Mock Data (No backend - frontend prototype)

## 📁 Project Structure

```
recruitment-portal/
├── src/
│   ├── components/
│   │   └── common/          # Reusable UI components
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Card.jsx
│   │       ├── Modal.jsx
│   │       ├── Table.jsx
│   │       └── Badge.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication & role management
│   │   └── DataContext.jsx  # Global data state
│   ├── layouts/             # Layout components
│   │   ├── MainLayout.jsx   # Public pages layout
│   │   ├── CandidateLayout.jsx
│   │   ├── EmployerLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/               # Page components
│   │   ├── auth/            # Login, Register
│   │   ├── public/          # Homepage, Job listings
│   │   ├── candidate/       # Candidate dashboard & features
│   │   ├── employer/        # Employer dashboard & features
│   │   └── admin/           # Admin dashboard & features
│   ├── services/
│   │   └── mockData.js      # Centralized mock data & API simulation
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd QLDA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔑 Demo Accounts

The application includes pre-configured demo accounts for testing:

### Candidate Account
- **Email**: `nguyenvana@gmail.com`
- **Password**: `123456`
- **Features**: Premium candidate with complete profile

### Employer Account
- **Email**: `company@fpt.vn`
- **Password**: `123456`
- **Features**: Verified company (FPT Software) with Enterprise plan

### Admin Account
- **Email**: `admin@system.vn`
- **Password**: `admin123`
- **Features**: Full system access

### Quick Login
Use the "Demo Accounts" buttons on the login page for instant access!

## 🎨 Design System

### Color Palette
- **Primary Blue**: Professional and trustworthy
- **Success Green**: Positive actions
- **Warning Yellow**: Alerts and premium features
- **Danger Red**: Errors and critical actions
- **Gray Scale**: UI elements and text

### Components
All components follow a consistent design language:
- **Mobile-first**: Responsive from 320px+
- **Accessible**: WCAG AA compliant
- **Consistent**: Reusable component library

## 🔄 Development Features

### Demo Switcher
A special development feature allows instant role switching:
- Located in the top navigation bar
- Switch between Candidate, Employer, and Admin roles
- No need to logout/login repeatedly during development

### Mock Data Service
All data is simulated using `mockData.js`:
- Realistic Vietnamese data samples
- API delay simulation (500ms)
- CRUD operations with state management
- 5+ candidates, employers, jobs, and applications

## 📱 Key Pages & Routes

### Public Routes
- `/` - Homepage
- `/login` - Login page
- `/register` - Registration (Coming soon)
- `/jobs` - Job listings (Coming soon)
- `/jobs/:id` - Job details (Coming soon)

### Candidate Routes (Protected)
- `/candidate/dashboard` - ✅ Dashboard with stats
- `/candidate/profile` - Profile management
- `/candidate/jobs` - Job search
- `/candidate/applications` - Application tracking
- `/candidate/saved-jobs` - Saved positions

### Employer Routes (Protected)
- `/employer/dashboard` - ✅ Analytics dashboard
- `/employer/jobs` - Job management
- `/employer/jobs/create` - Post new job
- `/employer/candidates` - Applicant management
- `/employer/analytics` - Detailed analytics
- `/employer/billing` - Subscription management

### Admin Routes (Protected)
- `/admin/dashboard` - ✅ System overview
- `/admin/users` - User management
- `/admin/jobs` - Job moderation
- `/admin/companies` - Company verification
- `/admin/kyc-verification` - KYC approval
- `/admin/reports` - Analytics & reports

## 🔐 Authentication & Authorization

### AuthContext Features
- Login/Logout functionality
- Role-based access control
- Protected routes
- Persistent sessions (localStorage)
- Demo role switching

### Role Permissions
- **Candidate**: Access to job search and applications
- **Employer**: Access to job posting and candidate management
- **Admin**: Full system access

## 📊 Data Management

### DataContext Features
- Centralized state for jobs, applications, saved jobs
- CRUD operations with instant updates
- Notification system
- Real-time statistics

### Mock Data Categories
- **Users**: Candidates, Employers, Admins
- **Jobs**: Active, Featured, Urgent positions
- **Applications**: Various statuses (pending, interview, accepted, rejected)
- **Categories**: IT, Design, Marketing, etc.
- **Locations**: Major Vietnamese cities
- **Service Packages**: Basic, Pro, Enterprise

## 🎯 Development Roadmap

### ✅ Completed (Phase 1)
- [x] Project setup and configuration
- [x] Mock data service
- [x] Authentication system
- [x] Layout components
- [x] Dashboard pages for all roles
- [x] Routing and navigation
- [x] Common UI components

### 🔄 In Progress (Phase 2)
- [ ] Candidate profile CRUD
- [ ] Job search and filtering
- [ ] Application management
- [ ] Employer job posting
- [ ] Candidate kanban board

### 📋 Planned (Phase 3)
- [ ] Admin user management
- [ ] KYC verification workflow
- [ ] Service package selection
- [ ] Advanced analytics
- [ ] Chat/messaging system
- [ ] Calendar integration
- [ ] CV upload simulation
- [ ] Rich text editor for job descriptions

## 🏗️ Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📝 Code Style

- **ESLint**: Code linting
- **Prettier**: Code formatting (recommended)
- **Component naming**: PascalCase
- **File naming**: PascalCase for components
- **CSS**: Tailwind utility classes

## 🤝 Contributing

This is a prototype/demo project. Key areas for contribution:
1. Additional page implementations
2. More mock data scenarios
3. Enhanced UI/UX
4. Additional features

## 📄 License

This project is created for demonstration purposes.

## 🆘 Support

For issues or questions:
1. Check the mock data in `src/services/mockData.js`
2. Review route configuration in `src/App.jsx`
3. Verify role permissions in AuthContext

## 🎓 Learning Resources

This project demonstrates:
- React Context API for state management
- React Router v6 protected routes
- Tailwind CSS responsive design
- Component composition patterns
- Mock API simulation
- Role-based access control

## 🌟 Acknowledgments

- Vietnamese job market data for realistic examples
- Tailwind CSS for the utility-first framework
- Lucide React for beautiful icons
- Recharts for data visualization

---

**Built with ❤️ using React + Vite + Tailwind CSS**
