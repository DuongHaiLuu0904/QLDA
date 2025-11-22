// Mock Jobs Data

export const mockJobs = [
    {
        id: 1,
        employerId: 1,
        employerName: 'FPT Software',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        title: 'Senior React Developer',
        slug: 'senior-react-developer-fpt',
        category: 'Công nghệ thông tin',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 25000000,
            max: 40000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Phát triển ứng dụng web sử dụng React, Redux. Làm việc với team quốc tế.',
        requirements: [
            '5+ năm kinh nghiệm React/JavaScript',
            'Thành thạo TypeScript, Redux, React Hooks',
            'Kinh nghiệm với RESTful API, GraphQL',
            'Có kinh nghiệm làm việc Agile/Scrum'
        ],
        benefits: [
            'Lương thưởng hấp dẫn',
            'Bảo hiểm đầy đủ',
            'Đào tạo chuyên môn',
            'Du lịch công ty hàng năm'
        ],
        skills: ['React', 'TypeScript', 'Redux', 'JavaScript', 'Git'],
        slots: 3,
        status: 'active',
        featured: true,
        urgent: false,
        postedDate: '2025-11-01',
        expiryDate: '2025-12-01',
        views: 1250,
        applicationsCount: 45,
        approvalStatus: 'approved'
    },
    {
        id: 2,
        employerId: 3,
        employerName: 'Shopee Vietnam',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
        title: 'UI/UX Designer',
        slug: 'ui-ux-designer-shopee',
        category: 'Thiết kế',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Middle',
        salary: {
            min: 15000000,
            max: 25000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Thiết kế giao diện app mobile và web. Thực hiện user research và testing.',
        requirements: [
            'Figma, Adobe XD',
            'Prototype, User Research',
            '3+ năm kinh nghiệm'
        ],
        benefits: [
            'Lương cạnh tranh',
            'Môi trường sáng tạo',
            'Phúc lợi tốt',
            'Team building'
        ],
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop'],
        slots: 2,
        status: 'active',
        featured: true,
        urgent: true,
        postedDate: '2025-11-05',
        expiryDate: '2025-12-05',
        views: 890,
        applicationsCount: 32,
        approvalStatus: 'approved'
    },
    {
        id: 3,
        employerId: 1,
        employerName: 'FPT Software',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        title: 'Backend Developer (Node.js)',
        slug: 'backend-nodejs-developer',
        category: 'Công nghệ thông tin',
        location: 'Hà Nội',
        workType: 'Full-time',
        level: 'Middle',
        salary: {
            min: 18000000,
            max: 30000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Phát triển RESTful API sử dụng Node.js. Thiết kế database MongoDB/PostgreSQL.',
        requirements: [
            'Node.js, Express',
            'MongoDB, PostgreSQL',
            'API Design',
            'Docker'
        ],
        benefits: [
            'Lương cao',
            'Đào tạo kỹ năng',
            'Môi trường chuyên nghiệp',
            'Thưởng theo dự án'
        ],
        skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
        slots: 5,
        status: 'active',
        featured: false,
        urgent: false,
        postedDate: '2025-11-10',
        expiryDate: '2025-12-10',
        views: 567,
        applicationsCount: 28,
        approvalStatus: 'approved'
    },
    {
        id: 4,
        employerId: 1,
        employerName: 'FPT Software',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        title: 'DevOps Engineer',
        slug: 'devops-engineer-fpt',
        category: 'Công nghệ thông tin',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 30000000,
            max: 50000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Quản lý infrastructure, CI/CD pipeline, monitoring hệ thống.',
        requirements: [
            'AWS, Azure hoặc GCP',
            'Docker, Kubernetes',
            'Jenkins, GitLab CI',
            'Terraform'
        ],
        benefits: [
            'Lương cao',
            'Dự án quốc tế',
            'Đào tạo chuyên sâu',
            'Onsite cơ hội'
        ],
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
        slots: 2,
        status: 'active',
        featured: true,
        urgent: false,
        postedDate: '2025-11-15',
        expiryDate: '2025-12-15',
        views: 423,
        applicationsCount: 15,
        approvalStatus: 'approved'
    },
    {
        id: 5,
        employerId: 3,
        employerName: 'Shopee Vietnam',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
        title: 'Product Manager',
        slug: 'product-manager-shopee',
        category: 'Quản lý sản phẩm',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 35000000,
            max: 60000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Quản lý sản phẩm từ ý tưởng đến launch. Phân tích thị trường và đối thủ.',
        requirements: [
            'Product Management',
            'Data Analysis',
            'Agile/Scrum',
            '5+ năm kinh nghiệm'
        ],
        benefits: [
            'Lương khủng',
            'Stock options',
            'Thưởng theo KPI',
            'Môi trường quốc tế'
        ],
        skills: ['Product Strategy', 'Analytics', 'SQL', 'Agile'],
        slots: 1,
        status: 'active',
        featured: false,
        urgent: false,
        postedDate: '2025-11-18',
        expiryDate: '2025-12-18',
        views: 312,
        applicationsCount: 8,
        approvalStatus: 'pending'
    },
    {
        id: 6,
        employerId: 2,
        employerName: 'VNG Corporation',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VNG.png',
        title: 'Game Developer (Unity)',
        slug: 'game-developer-unity-vng',
        category: 'Công nghệ thông tin',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Middle',
        salary: {
            min: 20000000,
            max: 35000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Phát triển game mobile sử dụng Unity. Làm việc với đội ngũ game design chuyên nghiệp.',
        requirements: [
            '3+ năm kinh nghiệm Unity',
            'C# programming',
            'Mobile game development',
            'Hiểu về game mechanics'
        ],
        benefits: [
            'Lương thưởng hấp dẫn',
            'Môi trường game studio',
            'Free game accounts',
            'Sáng tạo không giới hạn'
        ],
        skills: ['Unity', 'C#', 'Mobile', 'Game Design'],
        slots: 3,
        status: 'active',
        featured: true,
        urgent: false,
        postedDate: '2025-11-12',
        expiryDate: '2025-12-12',
        views: 678,
        applicationsCount: 22,
        approvalStatus: 'approved'
    },
    {
        id: 7,
        employerId: 4,
        employerName: 'Tiki Corporation',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Tiki.png',
        title: 'Data Analyst',
        slug: 'data-analyst-tiki',
        category: 'Phân tích dữ liệu',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Junior',
        salary: {
            min: 12000000,
            max: 20000000,
            currency: 'VND',
            negotiable: false
        },
        description: 'Phân tích dữ liệu người dùng, đưa ra insights để cải thiện sản phẩm.',
        requirements: [
            'SQL, Excel',
            'Python/R',
            'Tableau hoặc Power BI',
            'Tư duy phân tích tốt'
        ],
        benefits: [
            'Học hỏi môi trường e-commerce',
            'Mentor từ senior',
            'Lộ trình thăng tiến rõ ràng'
        ],
        skills: ['SQL', 'Python', 'Excel', 'Tableau'],
        slots: 2,
        status: 'active',
        featured: false,
        urgent: true,
        postedDate: '2025-11-20',
        expiryDate: '2025-12-20',
        views: 234,
        applicationsCount: 18,
        approvalStatus: 'approved'
    },
    {
        id: 8,
        employerId: 5,
        employerName: 'Viettel Solutions',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Viettel.png',
        title: 'Fullstack Developer (.NET)',
        slug: 'fullstack-developer-dotnet',
        category: 'Công nghệ thông tin',
        location: 'Hà Nội',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 22000000,
            max: 38000000,
            currency: 'VND',
            negotiable: true
        },
        description: 'Phát triển hệ thống nội bộ sử dụng .NET Core, Angular/React.',
        requirements: [
            '.NET Core, C#',
            'Angular hoặc React',
            'SQL Server',
            '5+ năm kinh nghiệm'
        ],
        benefits: [
            'Lương ổn định',
            'Dự án lớn',
            'Đào tạo certification',
            'BHYT cao cấp'
        ],
        skills: ['.NET Core', 'C#', 'Angular', 'SQL Server'],
        slots: 4,
        status: 'active',
        featured: false,
        urgent: false,
        postedDate: '2025-11-08',
        expiryDate: '2025-12-08',
        views: 456,
        applicationsCount: 19,
        approvalStatus: 'approved'
    }
];
