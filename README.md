# Recruitment Portal System (Job Board)

A comprehensive full-featured recruitment platform built with React, featuring three distinct user roles: Candidates, Employers, and Administrators.

## 🚀 Features

### For Candidates (Người tìm việc)
- ✅ **Authentication**: Register, Login, Forgot Password
- ✅ **Profile Management**: Create and manage CV, Education, Experience, Skills
- ✅ **Job Search**: Advanced search with filters (Location, Salary, Industry)
- ✅ **Applications**: Apply to jobs, track application status
- ✅ **Saved Jobs**: Bookmark interesting positions
- ✅ **Interviews**: Calendar view for scheduled interviews
- ✅ **Messages**: Communication with employers
- ✅ **Premium Features**: CV Builder, Cover Letter Templates, Job Comparison
- ✅ **Notifications**: Real-time updates on applications
- ✅ **Settings**: Profile and account management

### For Employers (Nhà tuyển dụng)
- ✅ **Company Profile**: Employer branding page with logo, banner, description
- ✅ **Job Management**: Create, edit, delete job postings
- ✅ **Applicant Management**: View applications, filter candidates, manage recruitment pipeline
- ✅ **Candidate Database**: Search and browse candidate profiles
- ✅ **Analytics Dashboard**: Charts for views, applications, conversion rates
- ✅ **Billing & Packages**: Basic, Pro, Enterprise plans with subscription management
- ✅ **Settings**: Company and account configuration
- ✅ **KYC Verification**: Company verification status

### For Administrators (Quản trị viên)
- ✅ **Dashboard**: System overview with key metrics
- ✅ **User Management**: Manage candidates and employers
- ✅ **Job Moderation**: Approve/reject job postings
- ✅ **Company Management**: Manage all companies in the system
- ✅ **KYC Verification**: Company verification approval workflow
- ✅ **Categories Management**: Manage job categories and industries
- ✅ **Content Management**: System content and configuration
- ✅ **Package Management**: Configure pricing and features
- ✅ **Reports & Analytics**: System statistics and insights
- ✅ **Settings**: System-wide configuration

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
QLDA/
├── src/
│   ├── components/
│   │   └── common/          # Reusable UI components
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── ErrorBoundary.jsx
│   │       ├── Input.jsx
│   │       ├── LoadingStates.jsx
│   │       ├── Modal.jsx
│   │       ├── Table.jsx
│   │       └── index.js
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication & role management
│   │   └── DataContext.jsx  # Global data state
│   ├── layouts/             # Layout components
│   │   ├── MainLayout.jsx   # Public pages layout
│   │   ├── CandidateLayout.jsx
│   │   ├── EmployerLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/               # Page components
│   │   ├── auth/            # Authentication pages
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── public/          # Public pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── JobsPage.jsx
│   │   │   ├── JobDetailPage.jsx
│   │   │   ├── CompaniesPage.jsx
│   │   │   ├── CompanyDetailPage.jsx
│   │   │   ├── PricingPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── NotificationsPage.jsx
│   │   ├── candidate/       # Candidate dashboard & features
│   │   │   ├── CandidateDashboard.jsx
│   │   │   ├── CandidateProfilePage.jsx
│   │   │   ├── CandidateApplicationsPage.jsx
│   │   │   ├── CandidateSavedJobsPage.jsx
│   │   │   ├── CandidateInterviewsPage.jsx
│   │   │   ├── CandidateMessagesPage.jsx
│   │   │   ├── CandidateNotificationsPage.jsx
│   │   │   ├── CandidateSettingsPage.jsx
│   │   │   ├── CandidatePremiumPage.jsx
│   │   │   ├── CVBuilderPage.jsx
│   │   │   ├── CoverLetterTemplatesPage.jsx
│   │   │   └── JobComparisonPage.jsx
│   │   ├── employer/        # Employer dashboard & features
│   │   │   ├── EmployerDashboard.jsx
│   │   │   ├── EmployerJobsPage.jsx
│   │   │   ├── EmployerCreateJobPage.jsx
│   │   │   ├── EmployerEditJobPage.jsx
│   │   │   ├── EmployerApplicantsPage.jsx
│   │   │   ├── EmployerCandidatesPage.jsx
│   │   │   ├── EmployerAnalyticsPage.jsx
│   │   │   ├── EmployerCompanyProfilePage.jsx
│   │   │   ├── EmployerBillingPage.jsx
│   │   │   └── EmployerSettingsPage.jsx
│   │   └── admin/           # Admin dashboard & features
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminUsersPage.jsx
│   │       ├── AdminJobsPage.jsx
│   │       ├── AdminCompaniesPage.jsx
│   │       ├── AdminKYCPage.jsx
│   │       ├── AdminCategoriesPage.jsx
│   │       ├── AdminPackagesPage.jsx
│   │       ├── AdminReportsPage.jsx
│   │       ├── AdminContentPage.jsx
│   │       └── AdminSettingsPage.jsx
│   ├── services/
│   │   ├── mockData.js      # Legacy mock data
│   │   └── database/        # Modular database services
│   │       ├── index.js     # Main database export
│   │       ├── helpers.js   # Utility functions
│   │       ├── users.js     # User management
│   │       ├── jobs.js      # Job management
│   │       ├── companies.js # Company management
│   │       ├── candidates.js # Candidate management
│   │       ├── applications.js # Application management
│   │       ├── savedJobs.js # Saved jobs management
│   │       ├── notifications.js # Notification management
│   │       └── metadata.js  # Categories, locations, packages
│   ├── utils/
│   │   ├── accessibility.jsx # Accessibility utilities
│   │   └── responsive.js    # Responsive utilities
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles & Tailwind imports
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd e:\QLDA
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
   http://localhost:5173
   ```
   *Note: Vite default port is 5173*

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
- **Accessible**: WCAG AA compliant với accessibility utilities
- **Consistent**: Reusable component library
- **Error Handling**: ErrorBoundary component for graceful error handling
- **Loading States**: Skeleton loaders và loading indicators

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
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/jobs` - Job listings
- `/jobs/:id` - Job details
- `/companies` - Company directory
- `/companies/:id` - Company details
- `/pricing` - Pricing plans
- `/contact` - Contact page
- `/notifications` - Public notifications

### Candidate Routes (Protected)
- `/candidate/dashboard` - ✅ Dashboard with stats
- `/candidate/profile` - ✅ Profile management
- `/candidate/applications` - ✅ Application tracking
- `/candidate/saved-jobs` - ✅ Saved positions
- `/candidate/interviews` - ✅ Interview schedule
- `/candidate/messages` - ✅ Messaging system
- `/candidate/notifications` - ✅ Notification center
- `/candidate/settings` - ✅ Account settings
- `/candidate/premium` - ✅ Premium features
- `/candidate/cv-builder` - ✅ CV Builder tool
- `/candidate/cover-letters` - ✅ Cover letter templates
- `/candidate/job-comparison` - ✅ Compare job offers

### Employer Routes (Protected)
- `/employer/dashboard` - ✅ Analytics dashboard
- `/employer/jobs` - ✅ Job management
- `/employer/jobs/create` - ✅ Post new job
- `/employer/jobs/:id/edit` - ✅ Edit job posting
- `/employer/applicants` - ✅ Applicant management
- `/employer/candidates` - ✅ Candidate database
- `/employer/analytics` - ✅ Detailed analytics
- `/employer/company-profile` - ✅ Company profile management
- `/employer/billing` - ✅ Subscription management
- `/employer/settings` - ✅ Account settings

### Admin Routes (Protected)
- `/admin/dashboard` - ✅ System overview
- `/admin/users` - ✅ User management
- `/admin/jobs` - ✅ Job moderation
- `/admin/companies` - ✅ Company management
- `/admin/kyc-verification` - ✅ KYC approval
- `/admin/categories` - ✅ Category management
- `/admin/packages` - ✅ Package management
- `/admin/reports` - ✅ Analytics & reports
- `/admin/content` - ✅ Content management
- `/admin/settings` - ✅ System settings

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

### Database Service Architecture
Dự án sử dụng kiến trúc database service modular trong `src/services/database/`:

- **index.js**: Main database export và initialization
- **helpers.js**: Utility functions (ID generation, date formatting, search/filter)
- **users.js**: User authentication và management (candidates, employers, admins)
- **jobs.js**: Job posting CRUD operations
- **companies.js**: Company profile management
- **candidates.js**: Candidate profile và CV management
- **applications.js**: Job application lifecycle
- **savedJobs.js**: Bookmark và saved jobs
- **notifications.js**: Notification system
- **metadata.js**: Categories, locations, packages, và system data

### DataContext Features
- Centralized state for jobs, applications, saved jobs
- CRUD operations with instant updates
- Notification system
- Real-time statistics
- Integration with modular database services

### Mock Data Categories
- **Users**: Candidates, Employers, Admins
- **Jobs**: Active, Featured, Urgent positions (100+ sample jobs)
- **Companies**: Tech companies with detailed profiles
- **Applications**: Various statuses (pending, interview, accepted, rejected)
- **Categories**: IT, Design, Marketing, Sales, Finance, etc.
- **Locations**: Major Vietnamese cities (Hà Nội, TP.HCM, Đà Nẵng, etc.)
- **Service Packages**: Basic, Pro, Enterprise with detailed features

## 🎯 Development Roadmap

### ✅ Completed (Phase 1)
- [x] Project setup and configuration
- [x] Modular database service architecture
- [x] Authentication system with role-based access
- [x] Layout components for all user roles
- [x] Dashboard pages for all roles
- [x] Routing and navigation
- [x] Common UI components library
- [x] Error boundary and loading states
- [x] Accessibility and responsive utilities

### ✅ Completed (Phase 2)
- [x] All authentication pages (Login, Register, Forgot Password)
- [x] Public pages (Home, Jobs, Companies, Pricing, Contact)
- [x] Candidate pages (Dashboard, Profile, Applications, Saved Jobs, etc.)
- [x] Employer pages (Dashboard, Jobs, Applicants, Analytics, etc.)
- [x] Admin pages (Dashboard, Users, Jobs, Companies, KYC, etc.)
- [x] Premium features (CV Builder, Cover Letters, Job Comparison)
- [x] Messaging and notification systems
- [x] Complete CRUD operations for all entities

### 📋 Future Enhancements
- [ ] Backend API integration
- [ ] Real-time chat using WebSocket
- [ ] File upload for CV and company documents
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Payment gateway integration
- [ ] Multi-language support (i18n)
- [ ] Mobile app version
- [ ] AI-powered job recommendations
- [ ] Video interview integration

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

This is a comprehensive recruitment portal prototype/demo project. Key areas for contribution:
1. Backend API integration
2. Additional features and enhancements
3. UI/UX improvements
4. Performance optimization
5. Testing coverage
6. Documentation improvements

## 📄 License

This project is created for demonstration purposes.

## 🆘 Support

For issues or questions:
1. Check the database services in `src/services/database/`
2. Review route configuration in `src/App.jsx`
3. Verify role permissions in `src/context/AuthContext.jsx`
4. Check component documentation in `src/components/common/`
5. Review data flow in `src/context/DataContext.jsx`

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
