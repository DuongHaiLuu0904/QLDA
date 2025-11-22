// Mock Categories, Locations, and Service Packages

export const mockCategories = [
    { id: 1, name: 'Công nghệ thông tin', slug: 'cong-nghe-thong-tin', count: 1234 },
    { id: 2, name: 'Thiết kế', slug: 'thiet-ke', count: 567 },
    { id: 3, name: 'Marketing', slug: 'marketing', count: 432 },
    { id: 4, name: 'Kinh doanh', slug: 'kinh-doanh', count: 876 },
    { id: 5, name: 'Kế toán', slug: 'ke-toan', count: 345 },
    { id: 6, name: 'Nhân sự', slug: 'nhan-su', count: 234 },
    { id: 7, name: 'Quản lý sản phẩm', slug: 'quan-ly-san-pham', count: 189 },
    { id: 8, name: 'Phân tích dữ liệu', slug: 'phan-tich-du-lieu', count: 298 }
];

export const mockLocations = [
    { id: 1, name: 'TP.HCM', slug: 'tp-hcm', count: 3456 },
    { id: 2, name: 'Hà Nội', slug: 'ha-noi', count: 2890 },
    { id: 3, name: 'Đà Nẵng', slug: 'da-nang', count: 567 },
    { id: 4, name: 'Cần Thơ', slug: 'can-tho', count: 234 },
    { id: 5, name: 'Bình Dương', slug: 'binh-duong', count: 445 },
    { id: 6, name: 'Đồng Nai', slug: 'dong-nai', count: 312 },
    { id: 7, name: 'Hải Phòng', slug: 'hai-phong', count: 178 }
];

export const mockServicePackages = [
    {
        id: 1,
        name: 'Basic',
        tier: 'basic',
        price: 0,
        duration: 30,
        features: [
            'Đăng 3 tin tuyển dụng/tháng',
            'Hiển thị 30 ngày',
            'Xem CV ứng viên',
            'Email support'
        ],
        limits: {
            jobPosts: 3,
            featured: 0,
            cvViews: 50
        },
        popular: false
    },
    {
        id: 2,
        name: 'Pro',
        tier: 'pro',
        price: 2990000,
        duration: 30,
        features: [
            'Đăng 20 tin tuyển dụng/tháng',
            'Hiển thị 60 ngày',
            '5 tin nổi bật',
            'Tìm kiếm ứng viên',
            'Xem CV không giới hạn',
            'Priority support',
            'Analytics dashboard'
        ],
        limits: {
            jobPosts: 20,
            featured: 5,
            cvViews: -1
        },
        popular: true
    },
    {
        id: 3,
        name: 'Enterprise',
        tier: 'enterprise',
        price: 9990000,
        duration: 30,
        features: [
            'Đăng tin không giới hạn',
            'Tin nổi bật không giới hạn',
            'Trang thương hiệu nhà tuyển dụng',
            'Headhunting support',
            'API access',
            'Dedicated account manager',
            'Custom integration',
            'Advanced analytics'
        ],
        limits: {
            jobPosts: -1,
            featured: -1,
            cvViews: -1
        },
        popular: false
    }
];
