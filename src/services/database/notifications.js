// Mock Notifications Data

export const mockNotifications = [
    {
        id: 1,
        userId: 101,
        type: 'application',
        title: 'Hồ sơ của bạn đã được xem',
        message: 'FPT Software đã xem hồ sơ ứng tuyển của bạn cho vị trí Senior React Developer',
        read: false,
        createdAt: '2025-11-20T10:30:00',
        link: '/candidate/applications'
    },
    {
        id: 2,
        userId: 101,
        type: 'interview',
        title: 'Lịch phỏng vấn mới',
        message: 'Bạn có lịch phỏng vấn vào 25/11/2025 lúc 14:00 cho vị trí Senior React Developer',
        read: false,
        createdAt: '2025-11-19T15:00:00',
        link: '/candidate/interviews'
    },
    {
        id: 3,
        userId: 102,
        type: 'job_recommendation',
        title: 'Công việc phù hợp với bạn',
        message: 'Có 3 công việc mới phù hợp với hồ sơ của bạn',
        read: true,
        createdAt: '2025-11-18T09:00:00',
        link: '/jobs'
    },
    {
        id: 4,
        userId: 1,
        type: 'application',
        title: 'Ứng viên mới',
        message: 'Có 3 ứng viên mới ứng tuyển vào vị trí Senior React Developer',
        read: false,
        createdAt: '2025-11-18T09:00:00',
        link: '/employer/applicants/1'
    },
    {
        id: 5,
        userId: 1,
        type: 'job_approved',
        title: 'Tin tuyển dụng đã được duyệt',
        message: 'Tin tuyển dụng "DevOps Engineer" đã được phê duyệt và đang hiển thị',
        read: true,
        createdAt: '2025-11-17T14:20:00',
        link: '/employer/jobs/4'
    },
    {
        id: 6,
        userId: 103,
        type: 'saved_job',
        title: 'Việc làm đã lưu có cập nhật',
        message: 'Vị trí "UI/UX Designer" bạn đã lưu sắp hết hạn ứng tuyển',
        read: false,
        createdAt: '2025-11-20T08:00:00',
        link: '/candidate/saved-jobs'
    }
];
