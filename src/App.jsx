import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import CandidateLayout from './layouts/CandidateLayout';
import EmployerLayout from './layouts/EmployerLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import JobsPage from './pages/public/JobsPage';
import JobDetailPage from './pages/public/JobDetailPage';
import CompaniesPage from './pages/public/CompaniesPage';

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CandidateProfilePage from './pages/candidate/CandidateProfilePage';
import CandidateApplicationsPage from './pages/candidate/CandidateApplicationsPage';
import CandidateSavedJobsPage from './pages/candidate/CandidateSavedJobsPage';
import CandidateInterviewsPage from './pages/candidate/CandidateInterviewsPage';
import CandidateMessagesPage from './pages/candidate/CandidateMessagesPage';
import CandidateNotificationsPage from './pages/candidate/CandidateNotificationsPage';
import CandidateSettingsPage from './pages/candidate/CandidateSettingsPage';
import CandidatePremiumPage from './pages/candidate/CandidatePremiumPage';

// Employer Pages
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EmployerJobsPage from './pages/employer/EmployerJobsPage';
import EmployerCreateJobPage from './pages/employer/EmployerCreateJobPage';
import EmployerApplicantsPage from './pages/employer/EmployerApplicantsPage';
import EmployerEditJobPage from './pages/employer/EmployerEditJobPage';
import EmployerCandidatesPage from './pages/employer/EmployerCandidatesPage';
import EmployerAnalyticsPage from './pages/employer/EmployerAnalyticsPage';
import EmployerCompanyProfilePage from './pages/employer/EmployerCompanyProfilePage';
import EmployerBillingPage from './pages/employer/EmployerBillingPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminJobsPage from './pages/admin/AdminJobsPage';
import AdminCompaniesPage from './pages/admin/AdminCompaniesPage';
import AdminKYCPage from './pages/admin/AdminKYCPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminPackagesPage from './pages/admin/AdminPackagesPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

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
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<MainLayout><JobsPage /></MainLayout>} />
            <Route path="/jobs/:id" element={<MainLayout><JobDetailPage /></MainLayout>} />
            <Route path="/companies" element={<MainLayout><CompaniesPage /></MainLayout>} />
            <Route path="/companies/:id" element={<MainLayout><ComingSoon title="Chi tiết công ty" /></MainLayout>} />
            <Route path="/pricing" element={<MainLayout><ComingSoon title="Bảng giá" /></MainLayout>} />
            <Route path="/forgot-password" element={<MainLayout><ComingSoon title="Quên mật khẩu" /></MainLayout>} />

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
                <Route path="messages" element={<ComingSoon title="Tin nhắn" />} />
                <Route path="settings" element={<ComingSoon title="Cài đặt" />} />
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
    );
}

export default App;
