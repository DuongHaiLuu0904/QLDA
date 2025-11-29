import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PageLoader } from './components/common/LoadingStates';

// Layouts (Keep these as direct imports - they're used frequently)
import MainLayout from './layouts/MainLayout';
import CandidateLayout from './layouts/CandidateLayout';
import EmployerLayout from './layouts/EmployerLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Pages (Keep direct - needed early)
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Lazy load public pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const JobsPage = lazy(() => import('./pages/public/JobsPage'));
const JobDetailPage = lazy(() => import('./pages/public/JobDetailPage'));
const CompaniesPage = lazy(() => import('./pages/public/CompaniesPage'));
const CompanyDetailPage = lazy(() => import('./pages/public/CompanyDetailPage'));
const PricingPage = lazy(() => import('./pages/public/PricingPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const NotificationsPage = lazy(() => import('./pages/public/NotificationsPage'));

// Lazy load Candidate Pages
const CandidateDashboard = lazy(() => import('./pages/candidate/CandidateDashboard'));
const CandidateProfilePage = lazy(() => import('./pages/candidate/CandidateProfilePage'));
const CandidateApplicationsPage = lazy(() => import('./pages/candidate/CandidateApplicationsPage'));
const CandidateSavedJobsPage = lazy(() => import('./pages/candidate/CandidateSavedJobsPage'));
const CandidateInterviewsPage = lazy(() => import('./pages/candidate/CandidateInterviewsPage'));
const CandidateMessagesPage = lazy(() => import('./pages/candidate/CandidateMessagesPage'));
const CandidateNotificationsPage = lazy(() => import('./pages/candidate/CandidateNotificationsPage'));
const CandidateSettingsPage = lazy(() => import('./pages/candidate/CandidateSettingsPage'));
const CandidatePremiumPage = lazy(() => import('./pages/candidate/CandidatePremiumPage'));
const CVBuilderPage = lazy(() => import('./pages/candidate/CVBuilderPage'));
const JobComparisonPage = lazy(() => import('./pages/candidate/JobComparisonPage'));
const CoverLetterTemplatesPage = lazy(() => import('./pages/candidate/CoverLetterTemplatesPage'));

// Lazy load Employer Pages
const EmployerDashboard = lazy(() => import('./pages/employer/EmployerDashboard'));
const EmployerJobsPage = lazy(() => import('./pages/employer/EmployerJobsPage'));
const EmployerCreateJobPage = lazy(() => import('./pages/employer/EmployerCreateJobPage'));
const EmployerApplicantsPage = lazy(() => import('./pages/employer/EmployerApplicantsPage'));
const EmployerEditJobPage = lazy(() => import('./pages/employer/EmployerEditJobPage'));
const EmployerCandidatesPage = lazy(() => import('./pages/employer/EmployerCandidatesPage'));
const EmployerAnalyticsPage = lazy(() => import('./pages/employer/EmployerAnalyticsPage'));
const EmployerCompanyProfilePage = lazy(() => import('./pages/employer/EmployerCompanyProfilePage'));
const EmployerBillingPage = lazy(() => import('./pages/employer/EmployerBillingPage'));
const EmployerSettingsPage = lazy(() => import('./pages/employer/EmployerSettingsPage'));
const EmployerMessagesPage = lazy(() => import('./pages/employer/EmployerMessagesPage'));

// Lazy load Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminJobsPage = lazy(() => import('./pages/admin/AdminJobsPage'));
const AdminCompaniesPage = lazy(() => import('./pages/admin/AdminCompaniesPage'));
const AdminKYCPage = lazy(() => import('./pages/admin/AdminKYCPage'));
const AdminContentPage = lazy(() => import('./pages/admin/AdminContentPage'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage'));
const AdminPackagesPage = lazy(() => import('./pages/admin/AdminPackagesPage'));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// Placeholder component for unimplemented pages
const ComingSoon = ({ title }) => (
    <div className="text-center py-12">
        <div className="mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <span className="text-4xl">🚧</span>
            </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">Trang này đang được phát triển</p>
    </div>
);

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/jobs" element={<MainLayout><JobsPage /></MainLayout>} />
                <Route path="/jobs/:id" element={<MainLayout><JobDetailPage /></MainLayout>} />
                <Route path="/companies" element={<MainLayout><CompaniesPage /></MainLayout>} />
                <Route path="/companies/:id" element={<MainLayout><CompanyDetailPage /></MainLayout>} />
                <Route path="/pricing" element={<MainLayout><PricingPage /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
                <Route path="/notifications" element={<MainLayout><NotificationsPage /></MainLayout>} />

            {/* Candidate Routes */}
            <Route
                path="/candidate/*"
                element={
                    <ProtectedRoute allowedRoles={['candidate']}>
                        <CandidateLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<CandidateDashboard />} />
                <Route path="profile" element={<CandidateProfilePage />} />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="applications" element={<CandidateApplicationsPage />} />
                <Route path="saved-jobs" element={<CandidateSavedJobsPage />} />
                <Route path="interviews" element={<CandidateInterviewsPage />} />
                <Route path="messages" element={<CandidateMessagesPage />} />
                <Route path="notifications" element={<CandidateNotificationsPage />} />
                <Route path="settings" element={<CandidateSettingsPage />} />
                <Route path="premium" element={<CandidatePremiumPage />} />
                <Route path="cv-builder" element={<CVBuilderPage />} />
                <Route path="job-comparison" element={<JobComparisonPage />} />
                <Route path="cover-letter" element={<CoverLetterTemplatesPage />} />
            </Route>

            {/* Employer Routes */}
            <Route
                path="/employer/*"
                element={
                    <ProtectedRoute allowedRoles={['employer']}>
                        <EmployerLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<EmployerDashboard />} />
                <Route path="jobs" element={<EmployerJobsPage />} />
                <Route path="jobs/create" element={<EmployerCreateJobPage />} />
                <Route path="jobs/:jobId/applicants" element={<EmployerApplicantsPage />} />
                <Route path="jobs/:id/edit" element={<EmployerEditJobPage />} />
                <Route path="candidates" element={<EmployerCandidatesPage />} />
                <Route path="analytics" element={<EmployerAnalyticsPage />} />
                <Route path="company-profile" element={<EmployerCompanyProfilePage />} />
                <Route path="billing" element={<EmployerBillingPage />} />
                <Route path="messages" element={<EmployerMessagesPage />} />
                <Route path="settings" element={<EmployerSettingsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="jobs" element={<AdminJobsPage />} />
                <Route path="companies" element={<AdminCompaniesPage />} />
                <Route path="kyc-verification" element={<AdminKYCPage />} />
                <Route path="content" element={<AdminContentPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="packages" element={<AdminPackagesPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* 404 Route */}
            <Route
                path="*"
                element={
                    <MainLayout>
                        <div className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                                <p className="text-xl text-gray-600 mb-8">Trang không tồn tại</p>
                                <a
                                    href="/"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Về trang chủ
                                </a>
                            </div>
                        </div>
                    </MainLayout>
                }
            />
            </Routes>
        </Suspense>
    );
}

export default App;
