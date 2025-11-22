// Main Mock Data Index - Exports all mock data from separate files

import { mockCompanies } from './companies';
import { mockUsers } from './users';
import { mockCandidates } from './candidates';
import { mockJobs } from './jobs';
import { mockApplications } from './applications';
import { mockSavedJobs } from './savedJobs';
import { mockNotifications } from './notifications';
import { mockCategories, mockLocations, mockServicePackages } from './metadata';
import { delay } from './helpers';

// Combine all users (companies + candidates + users + admin)
const allUsers = [...mockCompanies, ...mockCandidates, ...mockUsers];

// Mock API Simulation Functions

// Auth APIs
export const authAPI = {
    login: async (email, password) => {
        await delay(800);
        const user = allUsers.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Email hoặc mật khẩu không đúng');
        }
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token: 'mock-jwt-token-' + user.id };
    },

    register: async (userData) => {
        await delay(1000);
        const newUser = {
            id: allUsers.length + 1,
            ...userData,
            avatar: 'https://i.pravatar.cc/150?img=' + (allUsers.length + 1)
        };
        return { user: newUser, token: 'mock-jwt-token-' + newUser.id };
    },

    forgotPassword: async (email) => {
        await delay(800);
        const user = allUsers.find(u => u.email === email);
        if (!user) {
            throw new Error('Email không tồn tại');
        }
        return { message: 'Email đặt lại mật khẩu đã được gửi' };
    }
};

// Job APIs
export const jobAPI = {
    getAll: async (filters = {}) => {
        await delay(600);
        let jobs = [...mockJobs];

        if (filters.search) {
            jobs = jobs.filter(j =>
                j.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                j.employerName.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.location) {
            jobs = jobs.filter(j => j.location === filters.location);
        }

        if (filters.category) {
            jobs = jobs.filter(j => j.category === filters.category);
        }

        if (filters.level) {
            jobs = jobs.filter(j => j.level === filters.level);
        }

        return jobs;
    },

    getById: async (id) => {
        await delay(400);
        const job = mockJobs.find(j => j.id === parseInt(id));
        if (!job) throw new Error('Không tìm thấy công việc');
        return job;
    },

    create: async (jobData) => {
        await delay(800);
        const newJob = {
            id: mockJobs.length + 1,
            ...jobData,
            postedDate: new Date().toISOString().split('T')[0],
            views: 0,
            applicationsCount: 0,
            status: 'active',
            approvalStatus: 'pending'
        };
        mockJobs.push(newJob);
        return newJob;
    },

    update: async (id, jobData) => {
        await delay(600);
        const index = mockJobs.findIndex(j => j.id === parseInt(id));
        if (index === -1) throw new Error('Không tìm thấy công việc');
        mockJobs[index] = { ...mockJobs[index], ...jobData };
        return mockJobs[index];
    },

    delete: async (id) => {
        await delay(500);
        const index = mockJobs.findIndex(j => j.id === parseInt(id));
        if (index === -1) throw new Error('Không tìm thấy công việc');
        mockJobs.splice(index, 1);
        return { message: 'Đã xóa tin tuyển dụng' };
    }
};

// Application APIs
export const applicationAPI = {
    apply: async (jobId, candidateId, data) => {
        await delay(800);
        const newApp = {
            id: mockApplications.length + 1,
            jobId,
            candidateId,
            ...data,
            appliedDate: new Date().toISOString().split('T')[0],
            status: 'pending'
        };
        mockApplications.push(newApp);
        return newApp;
    },

    getByCandidate: async (candidateId) => {
        await delay(500);
        return mockApplications.filter(a => a.candidateId === candidateId);
    },

    getByJob: async (jobId) => {
        await delay(500);
        return mockApplications.filter(a => a.jobId === parseInt(jobId));
    },

    updateStatus: async (id, status, notes) => {
        await delay(400);
        const app = mockApplications.find(a => a.id === parseInt(id));
        if (!app) throw new Error('Không tìm thấy đơn ứng tuyển');
        app.status = status;
        if (notes) app.notes = notes;
        return app;
    }
};

// Saved Jobs API
export const savedJobAPI = {
    toggle: async (candidateId, jobId) => {
        await delay(300);
        const existing = mockSavedJobs.findIndex(
            s => s.candidateId === candidateId && s.jobId === jobId
        );

        if (existing !== -1) {
            mockSavedJobs.splice(existing, 1);
            return { saved: false };
        } else {
            mockSavedJobs.push({
                id: mockSavedJobs.length + 1,
                candidateId,
                jobId,
                savedDate: new Date().toISOString().split('T')[0]
            });
            return { saved: true };
        }
    },

    getByCandidate: async (candidateId) => {
        await delay(400);
        return mockSavedJobs.filter(s => s.candidateId === candidateId);
    }
};

// Profile APIs
export const profileAPI = {
    update: async (userId, profileData) => {
        await delay(600);
        const user = allUsers.find(u => u.id === userId);
        if (!user) throw new Error('Không tìm thấy người dùng');
        user.profile = { ...user.profile, ...profileData };
        return user;
    },

    uploadCV: async (userId, file) => {
        await delay(1200);
        return { cvUrl: '/uploads/cv/mock_cv_' + Date.now() + '.pdf' };
    }
};

// Notification APIs
export const notificationAPI = {
    getByUser: async (userId) => {
        await delay(400);
        return mockNotifications.filter(n => n.userId === userId);
    },

    markAsRead: async (id) => {
        await delay(200);
        const notif = mockNotifications.find(n => n.id === id);
        if (notif) notif.read = true;
        return notif;
    }
};

// Admin APIs
export const adminAPI = {
    getStats: async () => {
        await delay(600);
        return {
            totalUsers: allUsers.length,
            totalJobs: mockJobs.length,
            totalApplications: mockApplications.length,
            activeJobs: mockJobs.filter(j => j.status === 'active').length,
            pendingApprovals: mockJobs.filter(j => j.approvalStatus === 'pending').length,
            revenue: 45890000,
            newUsersThisMonth: 24,
            newJobsThisMonth: 12
        };
    },

    verifyCompany: async (userId, status) => {
        await delay(500);
        const user = allUsers.find(u => u.id === userId);
        if (user && user.role === 'employer') {
            user.isVerified = status === 'approved';
            user.verifiedDate = new Date().toISOString().split('T')[0];
        }
        return user;
    },

    approveJob: async (jobId, status) => {
        await delay(400);
        const job = mockJobs.find(j => j.id === jobId);
        if (job) job.approvalStatus = status;
        return job;
    }
};

// Export all data and APIs
export {
    mockCompanies,
    mockUsers,
    mockCandidates,
    mockJobs,
    mockApplications,
    mockSavedJobs,
    mockNotifications,
    mockCategories,
    mockLocations,
    mockServicePackages,
    allUsers
};

export default {
    mockCompanies,
    mockUsers,
    mockCandidates,
    mockJobs,
    mockApplications,
    mockSavedJobs,
    mockNotifications,
    mockCategories,
    mockLocations,
    mockServicePackages,
    authAPI,
    jobAPI,
    applicationAPI,
    savedJobAPI,
    profileAPI,
    notificationAPI,
    adminAPI
};
