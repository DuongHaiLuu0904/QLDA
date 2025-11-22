// Mock Applications Data

export const mockApplications = [
    {
        id: 1,
        jobId: 1,
        candidateId: 101,
        candidateName: 'Nguyễn Văn An',
        candidateEmail: 'candidate@example.com',
        candidatePhone: '0901234567',
        candidateAvatar: 'https://i.pravatar.cc/150?u=candidate1',
        cvUrl: '/uploads/cv/nguyenvana_cv.pdf',
        coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp với yêu cầu công việc.',
        appliedDate: '2025-11-12',
        status: 'pending',
        notes: null,
        rating: null
    },
    {
        id: 2,
        jobId: 1,
        candidateId: 102,
        candidateName: 'Trần Thị Bình',
        candidateEmail: 'candidate2@example.com',
        candidatePhone: '0912345678',
        candidateAvatar: 'https://i.pravatar.cc/150?u=candidate2',
        cvUrl: '/uploads/cv/tranthib_cv.pdf',
        coverLetter: 'Mong muốn được làm việc trong môi trường chuyên nghiệp và phát triển kỹ năng.',
        appliedDate: '2025-11-13',
        status: 'shortlisted',
        notes: 'Ứng viên có kinh nghiệm tốt',
        rating: 4
    },
    {
        id: 3,
        jobId: 2,
        candidateId: 103,
        candidateName: 'Lê Hoàng Châu',
        candidateEmail: 'candidate3@example.com',
        candidatePhone: '0923456789',
        candidateAvatar: 'https://i.pravatar.cc/150?u=candidate3',
        cvUrl: '/uploads/cv/lehoanuchau_cv.pdf',
        coverLetter: 'Tôi đam mê thiết kế và có portfolio phong phú về UI/UX.',
        appliedDate: '2025-11-14',
        status: 'interview',
        notes: 'Portfolio rất ấn tượng',
        rating: 5
    },
    {
        id: 4,
        jobId: 3,
        candidateId: 101,
        candidateName: 'Nguyễn Văn An',
        candidateEmail: 'candidate@example.com',
        candidatePhone: '0901234567',
        candidateAvatar: 'https://i.pravatar.cc/150?u=candidate1',
        cvUrl: '/uploads/cv/nguyenvana_cv.pdf',
        coverLetter: 'Có kinh nghiệm phát triển backend với Node.js và Express.',
        appliedDate: '2025-11-16',
        status: 'rejected',
        notes: 'Không đủ kinh nghiệm về database optimization',
        rating: 2
    },
    {
        id: 5,
        jobId: 4,
        candidateId: 102,
        candidateName: 'Trần Thị Bình',
        candidateEmail: 'candidate2@example.com',
        candidatePhone: '0912345678',
        candidateAvatar: 'https://i.pravatar.cc/150?u=candidate2',
        cvUrl: '/uploads/cv/tranthib_cv.pdf',
        coverLetter: 'Mong muốn học hỏi và phát triển trong vai trò DevOps.',
        appliedDate: '2025-11-17',
        status: 'pending',
        notes: null,
        rating: null
    }
];
