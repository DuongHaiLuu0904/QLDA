// Mock Data Service - Simulates API calls with realistic Vietnamese data
// Updated: 2025-11-22 - Complete overhaul with 50+ jobs, 20+ companies, 30+ candidates, 100+ applications

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const fetchMockData = (data, delayMs = 800) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), delayMs);
    });
};

// Generate date within last N days
const getRandomDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString().split('T')[0];
};

// Generate date within specific range
const getDateInRange = (startDaysAgo, endDaysAgo) => {
    const date = new Date();
    const randomDays = Math.floor(Math.random() * (startDaysAgo - endDaysAgo + 1)) + endDaysAgo;
    date.setDate(date.getDate() - randomDays);
    return date.toISOString().split('T')[0];
};

// ============================================================================
// MOCK COMPANIES DATA (20+ Companies)
// ============================================================================

export const mockCompanies = [
    {
        id: 1,
        name: 'FPT Software',
        email: 'hr@fpt-software.com',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
        taxCode: '0309066388',
        industry: 'Công nghệ thông tin',
        companySize: '1000+',
        website: 'https://www.fpt-software.com',
        address: 'Tòa nhà FPT, Đường Tân Thuận, Q.7, TP.HCM',
        phone: '028-3844-3388',
        description: 'FPT Software là công ty phần mềm hàng đầu Việt Nam với hơn 30.000 nhân viên trên toàn cầu. Chuyên cung cấp các giải pháp chuyển đổi số cho doanh nghiệp.',
        benefits: ['Bảo hiểm sức khỏe cao cấp', 'Thưởng hiệu suất hàng quý', 'Du lịch công ty hàng năm', 'Đào tạo nâng cao kỹ năng', 'Làm việc hybrid'],
        isVerified: true,
        verifiedDate: '2025-01-15',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company1'
    },
    {
        id: 2,
        name: 'VNG Corporation',
        email: 'recruit@vng.com.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VNG.png',
        banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
        taxCode: '0312120782',
        industry: 'Công nghệ - Game',
        companySize: '500-1000',
        website: 'https://www.vng.com.vn',
        address: '182 Lê Đại Hành, P.15, Q.11, TP.HCM',
        phone: '028-3962-0140',
        description: 'VNG là tập đoàn công nghệ hàng đầu Việt Nam, sở hữu Zalo, ZaloPay, Zing MP3 và nhiều sản phẩm game nổi tiếng.',
        benefits: ['Lương thưởng cạnh tranh top 10%', 'Cổ phiếu nhân viên', 'Gym & Yoga miễn phí', 'Game room & giải trí', 'Bữa trưa buffet'],
        isVerified: true,
        verifiedDate: '2025-02-01',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company2'
    },
    {
        id: 3,
        name: 'Shopee Vietnam',
        email: 'careers@shopee.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
        banner: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
        taxCode: '0312370623',
        industry: 'Thương mại điện tử',
        companySize: '1000+',
        website: 'https://careers.shopee.vn',
        address: 'Tòa nhà Circo, 222 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
        phone: '028-7106-9999',
        description: 'Shopee là nền tảng thương mại điện tử hàng đầu Đông Nam Á, phục vụ hàng triệu người dùng mỗi ngày.',
        benefits: ['Thưởng KPI hấp dẫn', 'Bảo hiểm toàn diện', 'Môi trường quốc tế', 'Team building định kỳ', 'Cơ hội thăng tiến nhanh'],
        isVerified: true,
        verifiedDate: '2025-01-20',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company3'
    },
    {
        id: 4,
        name: 'Tiki Corporation',
        email: 'hr@tiki.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Tiki.png',
        banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
        taxCode: '0315415368',
        industry: 'Thương mại điện tử',
        companySize: '500-1000',
        website: 'https://tiki.vn/careers',
        address: '52 Út Tịch, P.4, Q.Tân Bình, TP.HCM',
        phone: '028-7309-8888',
        description: 'Tiki là nền tảng thương mại điện tử và dịch vụ giao hàng nhanh hàng đầu Việt Nam.',
        benefits: ['Lương tháng 13, 14', 'Review lương 2 lần/năm', 'Chế độ nghỉ phép linh hoạt', 'Khám sức khỏe định kỳ', 'Sách & khóa học miễn phí'],
        isVerified: true,
        verifiedDate: '2025-02-10',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company4'
    },
    {
        id: 5,
        name: 'Viettel Solutions',
        email: 'tuyendung@viettel.com.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Viettel.png',
        banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
        taxCode: '0100109106',
        industry: 'Viễn thông - IT',
        companySize: '1000+',
        website: 'https://viettelsolutions.vn',
        address: 'Tầng 5, Tòa nhà Viettel, 285 Cách Mạng Tháng 8, Q.10, TP.HCM',
        phone: '028-3930-0200',
        description: 'Viettel Solutions là đơn vị cung cấp giải pháp công nghệ thông tin hàng đầu, thuộc Tập đoàn Viễn thông Quân đội Viettel.',
        benefits: ['Lương cạnh tranh', 'Chế độ BHXH đầy đủ', 'Thưởng dự án', 'Đào tạo chuyên môn', 'Ổn định lâu dài'],
        isVerified: true,
        verifiedDate: '2025-01-25',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company5'
    },
    {
        id: 6,
        name: 'Grab Vietnam',
        email: 'recruitment@grab.com',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Grab.png',
        banner: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200',
        taxCode: '0313978187',
        industry: 'Công nghệ - Vận tải',
        companySize: '500-1000',
        website: 'https://grab.careers',
        address: 'Lầu 9, Tòa nhà Sài Gòn Centre, 65 Lê Lợi, Q.1, TP.HCM',
        phone: '1900-1877',
        description: 'Grab là siêu ứng dụng hàng đầu Đông Nam Á, cung cấp dịch vụ di chuyển, giao đồ ăn và thanh toán.',
        benefits: ['Lương USD', 'Stock options', 'Bảo hiểm quốc tế', 'Làm việc linh hoạt', 'Văn hóa sáng tạo'],
        isVerified: true,
        verifiedDate: '2025-02-05',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company6'
    },
    {
        id: 7,
        name: 'Momo',
        email: 'jobs@momo.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo.png',
        banner: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
        taxCode: '0312120782',
        industry: 'Fintech',
        companySize: '500-1000',
        website: 'https://momo.vn/careers',
        address: 'Lầu 3, Toà nhà Phước Long, 404-406 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
        phone: '028-7106-8888',
        description: 'MoMo là ví điện tử và nền tảng thanh toán di động hàng đầu Việt Nam với hơn 30 triệu người dùng.',
        benefits: ['Lương thưởng hấp dẫn', 'Cổ phần nhân viên', 'Du lịch nước ngoài', 'Happy hour mỗi tuần', 'Snack & coffee miễn phí'],
        isVerified: true,
        verifiedDate: '2025-02-12',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company7'
    },
    {
        id: 8,
        name: 'VNLife',
        email: 'hr@vnlife.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=VNLife',
        banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
        taxCode: '0108888888',
        industry: 'Bảo hiểm - Fintech',
        companySize: '100-500',
        website: 'https://vnlife.vn',
        address: '123 Lý Tự Trọng, Q.1, TP.HCM',
        phone: '028-3823-5555',
        description: 'VNLife là startup fintech chuyên cung cấp giải pháp bảo hiểm số và quản lý tài chính cá nhân.',
        benefits: ['Startup năng động', 'Equity cho nhân viên xuất sắc', 'Flexible working', 'Học tiếng Anh miễn phí', 'Teambuilding monthly'],
        isVerified: false,
        verifiedDate: null,
        tier: 'basic',
        avatar: 'https://i.pravatar.cc/150?u=company8'
    },
    {
        id: 9,
        name: 'TechViet Solutions',
        email: 'contact@techviet.com',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=TechViet',
        banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
        taxCode: '0109999999',
        industry: 'IT Outsourcing',
        companySize: '100-500',
        website: 'https://techviet.com',
        address: '45 Nguyễn Văn Cừ, Long Biên, Hà Nội',
        phone: '024-3876-5432',
        description: 'TechViet là công ty outsourcing IT với khách hàng từ Nhật Bản, Hàn Quốc và Singapore.',
        benefits: ['Lương theo năng lực', 'Làm việc với khách hàng quốc tế', 'Đào tạo tiếng Nhật', 'Cơ hội onsite', 'BHYT bổ sung'],
        isVerified: true,
        verifiedDate: '2025-03-01',
        tier: 'basic',
        avatar: 'https://i.pravatar.cc/150?u=company9'
    },
    {
        id: 10,
        name: 'Ngân hàng ACB',
        email: 'hr@acb.com.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-ACB.png',
        banner: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200',
        taxCode: '0303030303',
        industry: 'Ngân hàng',
        companySize: '1000+',
        website: 'https://acb.com.vn/careers',
        address: '442 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
        phone: '1900-545-441',
        description: 'ACB là một trong những ngân hàng thương mại cổ phần hàng đầu Việt Nam với mạng lưới chi nhánh rộng khắp.',
        benefits: ['Lương cứng + KPI', 'Thưởng theo hiệu quả', 'BHXH, BHYT đầy đủ', 'Đào tạo bài bản', 'Môi trường chuyên nghiệp'],
        isVerified: true,
        verifiedDate: '2025-01-10',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company10'
    },
    {
        id: 11,
        name: 'Vingroup Digital',
        email: 'recruitment@vingroup.net',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-VinGroup.png',
        banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
        taxCode: '0104567890',
        industry: 'Tập đoàn đa ngành',
        companySize: '1000+',
        website: 'https://vingroup.net/careers',
        address: 'Tầng 45, Keangnam Landmark 72, Phạm Hùng, Hà Nội',
        phone: '024-3974-9999',
        description: 'Vingroup Digital là bộ phận chuyển đổi số của Tập đoàn Vingroup, phát triển các giải pháp công nghệ cho hệ sinh thái VinFast, VinSmart, VinID.',
        benefits: ['Lương cạnh tranh top thị trường', 'Thưởng theo dự án', 'Môi trường làm việc đẳng cấp', 'Cơ hội phát triển lớn', 'Chế độ phúc lợi toàn diện'],
        isVerified: true,
        verifiedDate: '2025-01-18',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company11'
    },
    {
        id: 12,
        name: 'TopDev',
        email: 'hello@topdev.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/00D9FF/FFFFFF?text=TopDev',
        banner: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
        taxCode: '0315555555',
        industry: 'Tuyển dụng IT',
        companySize: '50-100',
        website: 'https://topdev.vn',
        address: '32 Thảo Điền, Q.2, TP.HCM',
        phone: '028-3636-9999',
        description: 'TopDev là nền tảng tuyển dụng IT hàng đầu Việt Nam, kết nối hàng nghìn IT professionals với các công ty công nghệ.',
        benefits: ['Startup văn hóa trẻ', 'No dress code', 'Team outing quarterly', 'Ngày nghỉ linh hoạt', 'Thưởng theo performance'],
        isVerified: true,
        verifiedDate: '2025-02-20',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company12'
    },
    {
        id: 13,
        name: 'BAEMIN Vietnam',
        email: 'careers@baemin.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/00C73C/FFFFFF?text=BAEMIN',
        banner: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200',
        taxCode: '0316789012',
        industry: 'Food Delivery',
        companySize: '500-1000',
        website: 'https://careers.baemin.vn',
        address: 'Tầng 8, Tòa nhà Sài Gòn Trade Center, 37 Tôn Đức Thắng, Q.1, TP.HCM',
        phone: '1900-xxxx',
        description: 'BAEMIN là ứng dụng giao đồ ăn hàng đầu được yêu thích bởi giới trẻ Việt Nam.',
        benefits: ['Lương thưởng hấp dẫn', 'Bảo hiểm cao cấp', 'Free lunch & dinner', 'Văn hóa Hàn Quốc', 'Cơ hội du lịch Hàn Quốc'],
        isVerified: true,
        verifiedDate: '2025-02-15',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company13'
    },
    {
        id: 14,
        name: 'Be Group',
        email: 'jobs@be.com.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/FFD700/000000?text=Be',
        banner: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200',
        taxCode: '0317654321',
        industry: 'Ride-hailing',
        companySize: '500-1000',
        website: 'https://be.com.vn/careers',
        address: 'Tầng 10, Tòa nhà Me Linh Point, 2 Ngô Đức Kế, Q.1, TP.HCM',
        phone: '1900-xxxx',
        description: 'Be Group là nền tảng di chuyển và giao hàng được phát triển bởi người Việt, dành cho người Việt.',
        benefits: ['Lương thưởng cạnh tranh', 'Startup environment', 'Tự chủ công việc', 'Team building monthly', 'Phụ cấp ăn trưa'],
        isVerified: false,
        verifiedDate: null,
        tier: 'basic',
        avatar: 'https://i.pravatar.cc/150?u=company14'
    },
    {
        id: 15,
        name: 'Vietcombank',
        email: 'tuyendung@vietcombank.com.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png',
        banner: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200',
        taxCode: '0100100100',
        industry: 'Ngân hàng',
        companySize: '1000+',
        website: 'https://vietcombank.com.vn',
        address: '198 Trần Quang Khải, Q.Hoàn Kiếm, Hà Nội',
        phone: '1900-5588-86',
        description: 'Vietcombank là ngân hàng thương mại cổ phần lớn nhất Việt Nam về vốn điều lệ và quy mô tài sản.',
        benefits: ['Lương và thưởng hấp dẫn', 'Chế độ BHXH đầy đủ', 'Đào tạo chuyên sâu', 'Môi trường ổn định', 'Cơ hội thăng tiến rõ ràng'],
        isVerified: true,
        verifiedDate: '2025-01-05',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company15'
    },
    {
        id: 16,
        name: 'LogiGear Vietnam',
        email: 'hr@logigear.com',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/2E86AB/FFFFFF?text=LogiGear',
        banner: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200',
        taxCode: '0318888888',
        industry: 'Software Testing',
        companySize: '100-500',
        website: 'https://logigear.com',
        address: '17 Tôn Thất Tùng, Q.1, TP.HCM',
        phone: '028-3910-5555',
        description: 'LogiGear là công ty chuyên về dịch vụ kiểm thử phần mềm với 30 năm kinh nghiệm phục vụ khách hàng toàn cầu.',
        benefits: ['Lương theo USD', 'Onsite opportunities', 'Đào tạo testing chuyên sâu', 'Flexible hours', 'Annual bonus'],
        isVerified: true,
        verifiedDate: '2025-02-08',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company16'
    },
    {
        id: 17,
        name: 'Sendo',
        email: 'careers@sendo.vn',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/E63946/FFFFFF?text=Sendo',
        banner: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
        taxCode: '0319876543',
        industry: 'E-commerce',
        companySize: '100-500',
        website: 'https://sendo.vn/careers',
        address: 'Tầng 6, Tòa nhà An Phú Plaza, 117-119 Lý Chính Thắng, Q.3, TP.HCM',
        phone: '028-7300-5555',
        description: 'Sendo là sàn thương mại điện tử C2C hàng đầu Việt Nam, kết nối người mua và người bán trên toàn quốc.',
        benefits: ['Lương cạnh tranh', 'Review lương 2 lần/năm', 'Team building định kỳ', 'Happy Friday', 'Bảo hiểm đầy đủ'],
        isVerified: false,
        verifiedDate: null,
        tier: 'basic',
        avatar: 'https://i.pravatar.cc/150?u=company17'
    },
    {
        id: 18,
        name: 'Got It',
        email: 'jobs@got-it.ai',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/7209B7/FFFFFF?text=GotIt',
        banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
        taxCode: '0320111111',
        industry: 'AI - Machine Learning',
        companySize: '50-100',
        website: 'https://got-it.ai',
        address: 'Lầu 5, Tòa nhà Helios, 75 Tam Trinh, Hoàng Mai, Hà Nội',
        phone: '024-3333-5555',
        description: 'Got It là startup AI với backing từ Silicon Valley, phát triển các giải pháp conversational AI và machine learning.',
        benefits: ['Stock options', 'US-based salary', 'Flexible remote', 'Latest tech stack', 'Conferences & training'],
        isVerified: false,
        verifiedDate: null,
        tier: 'basic',
        avatar: 'https://i.pravatar.cc/150?u=company18'
    },
    {
        id: 19,
        name: 'Luxoft Vietnam',
        email: 'recruitment@luxoft.com',
        password: '123456',
        role: 'employer',
        logo: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=Luxoft',
        banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
        taxCode: '0321234567',
        industry: 'IT Services',
        companySize: '500-1000',
        website: 'https://luxoft.com',
        address: 'Tầng 18, Vincom Center, 72 Lê Thánh Tôn, Q.1, TP.HCM',
        phone: '028-3827-7777',
        description: 'Luxoft là công ty dịch vụ IT hàng đầu thế giới, chuyên phát triển giải pháp cho các tập đoàn Fortune 500.',
        benefits: ['Lương USD', 'Dự án quốc tế', 'Premium healthcare', 'Onsite EU/US', 'Certification sponsorship'],
        isVerified: true,
        verifiedDate: '2025-02-25',
        tier: 'pro',
        avatar: 'https://i.pravatar.cc/150?u=company19'
    },
    {
        id: 20,
        name: 'PwC Vietnam',
        email: 'careers@pwc.com',
        password: '123456',
        role: 'employer',
        logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-PwC.png',
        banner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
        taxCode: '0322345678',
        industry: 'Tư vấn - Kiểm toán',
        companySize: '1000+',
        website: 'https://pwc.com/vn',
        address: 'Tầng 16, Keangnam Hanoi Landmark Tower, Phạm Hùng, Hà Nội',
        phone: '024-3946-2246',
        description: 'PwC là một trong bốn công ty kiểm toán lớn nhất thế giới (Big 4), cung cấp dịch vụ tư vấn và kiểm toán chuyên nghiệp.',
        benefits: ['Lương theo chuẩn quốc tế', 'Đào tạo chuyên sâu', 'Career path rõ ràng', 'Global exposure', 'Professional certification'],
        isVerified: true,
        verifiedDate: '2025-01-30',
        tier: 'enterprise',
        avatar: 'https://i.pravatar.cc/150?u=company20'
    }
];

// ============================================================================
// MOCK CANDIDATES DATA (30+ Candidates)
// ============================================================================

export const mockCandidates = [
    {
        id: 101,
        email: 'candidate@example.com',
        password: '123456',
        role: 'candidate',
        name: 'Phạm Thị Minh Thư',
        phone: '0901234567',
        avatar: 'https://i.pravatar.cc/150?u=1',
        isPremium: true,
        profile: {
            dateOfBirth: '1995-05-15',
            gender: 'Nữ',
            address: '123 Lê Lợi, Quận 1, TP.HCM',
            bio: 'Senior Full-stack Developer với 6 năm kinh nghiệm xây dựng ứng dụng web quy mô lớn. Thành thạo React, Node.js, và các công nghệ cloud hiện đại.',
            skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
            experience: [
                {
                    id: 1,
                    company: 'FPT Software',
                    position: 'Senior Full-stack Developer',
                    startDate: '2020-01',
                    endDate: null,
                    current: true,
                    description: 'Phát triển ứng dụng web cho khách hàng quốc tế, quản lý team 5 người, code review và mentoring junior developers.'
                },
                {
                    id: 2,
                    company: 'Viettel Solutions',
                    position: 'Full-stack Developer',
                    startDate: '2018-06',
                    endDate: '2019-12',
                    current: false,
                    description: 'Xây dựng hệ thống quản lý nội bộ, tối ưu hiệu năng database và API.'
                }
            ],
            education: [
                {
                    id: 1,
                    school: 'ĐH Bách Khoa TP.HCM',
                    degree: 'Kỹ sư',
                    major: 'Công nghệ thông tin',
                    startDate: '2013-09',
                    endDate: '2017-06',
                    gpa: '3.5/4.0'
                }
            ],
            cvUrl: '/uploads/cv/phamminhthu_cv.pdf',
            expectedSalary: '30000000',
            workLocation: ['TP.HCM', 'Remote']
        }
    },

    // CANDIDATE 2 - UI/UX Designer
    {
        id: 2,
        email: 'lethanhnam@gmail.com',
        password: '123456',
        role: 'candidate',
        name: 'Lê Thanh Nam',
        phone: '0912345678',
        avatar: 'https://i.pravatar.cc/150?u=2',
        isPremium: false,
        profile: {
            dateOfBirth: '1998-08-20',
            gender: 'Nam',
            address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
            bio: 'UI/UX Designer với đam mê tạo ra trải nghiệm người dùng tuyệt vời. 3 năm kinh nghiệm thiết kế cho startups và corporate.',
            skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research', 'Wireframing'],
            experience: [
                {
                    id: 1,
                    company: 'Tiki Vietnam',
                    position: 'Senior UI/UX Designer',
                    startDate: '2021-03',
                    endDate: null,
                    current: true,
                    description: 'Thiết kế giao diện app mobile và web, thực hiện user research và A/B testing.'
                }
            ],
            education: [
                {
                    id: 1,
                    school: 'ĐH Mỹ thuật TP.HCM',
                    degree: 'Cử nhân',
                    major: 'Thiết kế đồ họa',
                    startDate: '2016-09',
                    endDate: '2020-06',
                    gpa: '3.7/4.0'
                }
            ],
            cvUrl: '/uploads/cv/lethanhnam_cv.pdf',
            expectedSalary: '20000000',
            workLocation: ['TP.HCM']
        }
    },

    // CANDIDATE 3 - Frontend Developer
    {
        id: 3,
        email: 'tranquoctuan@gmail.com',
        password: '123456',
        role: 'candidate',
        name: 'Trần Quốc Tuấn',
        phone: '0923456789',
        avatar: 'https://i.pravatar.cc/150?u=3',
        isPremium: true,
        profile: {
            dateOfBirth: '1996-03-10',
            gender: 'Nam',
            address: '78 Trần Hưng Đạo, Ba Đình, Hà Nội',
            bio: 'Frontend Developer chuyên về React và Vue.js. Đam mê xây dựng giao diện người dùng mượt mà và hiệu năng cao.',
            skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux', 'Vite'],
            experience: [
                {
                    id: 1,
                    company: 'VNG Corporation',
                    position: 'Senior Frontend Developer',
                    startDate: '2021-06',
                    endDate: null,
                    current: true,
                    description: 'Phát triển frontend cho các sản phẩm game và social network.'
                },
                {
                    id: 2,
                    company: 'TopDev',
                    position: 'Frontend Developer',
                    startDate: '2019-03',
                    endDate: '2021-05',
                    current: false,
                    description: 'Xây dựng platform tuyển dụng IT.'
                }
            ],
            education: [
                {
                    id: 1,
                    school: 'ĐH Bách Khoa Hà Nội',
                    degree: 'Kỹ sư',
                    major: 'Khoa học máy tính',
                    startDate: '2014-09',
                    endDate: '2018-06',
                    gpa: '3.6/4.0'
                }
            ],
            cvUrl: '/uploads/cv/tranquoctuan_cv.pdf',
            expectedSalary: '28000000',
            workLocation: ['Hà Nội', 'Remote']
        }
    },
    {
        id: 3,
        email: 'company@fpt.vn',
        password: '123456',
        role: 'employer',
        name: 'FPT Software',
        phone: '0283844 3388',
        avatar: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        companyProfile: {
            companyName: 'FPT Software',
            taxCode: '0123456789',
            industry: 'Công nghệ thông tin',
            companySize: '1000+',
            website: 'https://www.fpt-software.com',
            address: 'Lô 07 - 08, Đường Tân Thuận, KCX Tân Thuận, Q.7, TP.HCM',
            logo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
            banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
            description: 'FPT Software là công ty thành viên của Tập đoàn FPT, là công ty dịch vụ phần mềm hàng đầu Việt Nam với hơn 20 năm kinh nghiệm.',
            benefits: ['Bảo hiểm sức khỏe', 'Đào tạo', 'Du lịch hàng năm', 'Thưởng hiệu suất'],
            isVerified: true,
            verificationDate: '2024-01-15',
            subscription: 'enterprise'
        },
        teamMembers: [
            { id: 1, email: 'hr@fpt.vn', name: 'Nguyễn Thị C', role: 'admin' },
            { id: 2, email: 'recruiter@fpt.vn', name: 'Lê Văn D', role: 'recruiter' }
        ]
    },
    {
        id: 4,
        email: 'hr@shopee.vn',
        password: '123456',
        role: 'employer',
        name: 'Shopee Vietnam',
        phone: '0219001888',
        avatar: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
        companyProfile: {
            companyName: 'Shopee Vietnam',
            taxCode: '0987654321',
            industry: 'Thương mại điện tử',
            companySize: '500-1000',
            website: 'https://careers.shopee.vn',
            address: 'Toà nhà Circo, 222 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
            logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
            banner: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
            description: 'Shopee là nền tảng thương mại điện tử hàng đầu khu vực Đông Nam Á và Đài Loan.',
            benefits: ['Lương thưởng hấp dẫn', 'Môi trường quốc tế', 'Cơ hội thăng tiến', 'Team building'],
            isVerified: true,
            verificationDate: '2024-02-20',
            subscription: 'pro'
        }
    }
];

// Combine all users (companies + candidates + admin)
export const mockUsers = [
    ...mockCompanies,
    ...mockCandidates,
    {
        id: 999,
        email: 'admin@system.vn',
        password: 'admin123',
        role: 'admin',
        name: 'System Admin',
        phone: '0900000000',
        avatar: 'https://i.pravatar.cc/150?img=33'
    }
];

// Mock Jobs Data
export const mockJobs = [
    {
        id: 1,
        employerId: 3,
        employerName: 'FPT Software',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        title: 'Senior React Developer',
        slug: 'senior-react-developer-fpt',
        category: 'Công nghệ thông tin',
        industry: 'IT - Phần mềm',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 25000000,
            max: 40000000,
            currency: 'VND',
            period: 'tháng',
            negotiable: true
        },
        description: `
      <h3>Mô tả công việc</h3>
      <ul>
        <li>Phát triển ứng dụng web sử dụng React, Redux</li>
        <li>Làm việc với team để thiết kế và xây dựng tính năng mới</li>
        <li>Optimize hiệu suất ứng dụng</li>
        <li>Code review và mentor junior developers</li>
      </ul>
      <h3>Yêu cầu công việc</h3>
      <ul>
        <li>5+ năm kinh nghiệm React/JavaScript</li>
        <li>Thành thạo TypeScript, Redux, React Hooks</li>
        <li>Kinh nghiệm với RESTful API, GraphQL</li>
        <li>Có kinh nghiệm làm việc Agile/Scrum</li>
      </ul>
    `,
        requirements: ['React', 'TypeScript', 'Redux', 'API'],
        benefits: ['Lương thưởng hấp dẫn', 'Bảo hiểm đầy đủ', 'Đào tạo', 'Du lịch'],
        skills: ['React', 'TypeScript', 'Redux', 'JavaScript', 'Git'],
        slots: 3,
        status: 'active',
        featured: true,
        urgent: false,
        postedDate: '2024-11-01',
        expiryDate: '2024-12-01',
        views: 1250,
        applications: 45,
        approvalStatus: 'approved'
    },
    {
        id: 2,
        employerId: 4,
        employerName: 'Shopee Vietnam',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
        title: 'UI/UX Designer',
        slug: 'ui-ux-designer-shopee',
        category: 'Thiết kế',
        industry: 'Thương mại điện tử',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Middle',
        salary: {
            min: 15000000,
            max: 25000000,
            currency: 'VND',
            period: 'tháng',
            negotiable: true
        },
        description: `
      <h3>Mô tả công việc</h3>
      <ul>
        <li>Thiết kế giao diện app mobile và web</li>
        <li>Thực hiện user research và testing</li>
        <li>Tạo wireframe, prototype</li>
        <li>Làm việc với team development</li>
      </ul>
    `,
        requirements: ['Figma', 'Adobe XD', 'Prototype', 'User Research'],
        benefits: ['Lương cạnh tranh', 'Môi trường sáng tạo', 'Phúc lợi tốt'],
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop'],
        slots: 2,
        status: 'active',
        featured: true,
        urgent: true,
        postedDate: '2024-11-05',
        expiryDate: '2024-12-05',
        views: 890,
        applications: 32,
        approvalStatus: 'approved'
    },
    {
        id: 3,
        employerId: 3,
        employerName: 'FPT Software',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        title: 'Backend Developer (Node.js)',
        slug: 'backend-nodejs-developer',
        category: 'Công nghệ thông tin',
        industry: 'IT - Phần mềm',
        location: 'Hà Nội',
        workType: 'Full-time',
        level: 'Middle',
        salary: {
            min: 18000000,
            max: 30000000,
            currency: 'VND',
            period: 'tháng',
            negotiable: true
        },
        description: `
      <h3>Mô tả công việc</h3>
      <ul>
        <li>Phát triển RESTful API sử dụng Node.js</li>
        <li>Thiết kế database MongoDB/PostgreSQL</li>
        <li>Tối ưu hiệu năng hệ thống</li>
      </ul>
    `,
        requirements: ['Node.js', 'Express', 'MongoDB', 'API Design'],
        benefits: ['Lương cao', 'Đào tạo kỹ năng', 'Môi trường chuyên nghiệp'],
        skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
        slots: 5,
        status: 'active',
        featured: false,
        urgent: false,
        postedDate: '2024-11-10',
        expiryDate: '2024-12-10',
        views: 567,
        applications: 28,
        approvalStatus: 'approved'
    },
    {
        id: 4,
        employerId: 3,
        employerName: 'FPT Software',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
        title: 'DevOps Engineer',
        slug: 'devops-engineer-fpt',
        category: 'Công nghệ thông tin',
        industry: 'IT - Phần mềm',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 30000000,
            max: 50000000,
            currency: 'VND',
            period: 'tháng',
            negotiable: true
        },
        description: '<p>Quản lý infrastructure, CI/CD pipeline, monitoring</p>',
        requirements: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
        benefits: ['Lương cao', 'Dự án quốc tế', 'Đào tạo chuyên sâu'],
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
        slots: 2,
        status: 'active',
        featured: true,
        urgent: false,
        postedDate: '2024-11-15',
        expiryDate: '2024-12-15',
        views: 423,
        applications: 15,
        approvalStatus: 'approved'
    },
    {
        id: 5,
        employerId: 4,
        employerName: 'Shopee Vietnam',
        employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
        title: 'Product Manager',
        slug: 'product-manager-shopee',
        category: 'Quản lý sản phẩm',
        industry: 'Thương mại điện tử',
        location: 'TP.HCM',
        workType: 'Full-time',
        level: 'Senior',
        salary: {
            min: 35000000,
            max: 60000000,
            currency: 'VND',
            period: 'tháng',
            negotiable: true
        },
        description: '<p>Quản lý sản phẩm từ ý tưởng đến launch, phân tích thị trường</p>',
        requirements: ['Product Management', 'Data Analysis', 'Agile'],
        benefits: ['Lương khủng', 'Stock options', 'Thưởng theo KPI'],
        skills: ['Product Strategy', 'Analytics', 'SQL', 'Agile'],
        slots: 1,
        status: 'active',
        featured: false,
        urgent: false,
        postedDate: '2024-11-18',
        expiryDate: '2024-12-18',
        views: 312,
        applications: 8,
        approvalStatus: 'pending'
    }
];

// Mock Applications Data
export const mockApplications = [
    {
        id: 1,
        jobId: 1,
        candidateId: 1,
        candidateName: 'Nguyễn Văn A',
        candidateEmail: 'nguyenvana@gmail.com',
        candidatePhone: '0901234567',
        candidateAvatar: 'https://i.pravatar.cc/150?img=1',
        cvUrl: '/uploads/cv/nguyenvana_cv.pdf',
        coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp.',
        appliedDate: '2024-11-12',
        status: 'shortlisted',
        notes: 'Ứng viên có kinh nghiệm tốt, sắp xếp phỏng vấn',
        rating: 4,
        interviewDate: '2024-11-25',
        interviewTime: '14:00'
    },
    {
        id: 2,
        jobId: 1,
        candidateId: 2,
        candidateName: 'Trần Thị B',
        candidateEmail: 'tranthib@gmail.com',
        candidatePhone: '0912345678',
        candidateAvatar: 'https://i.pravatar.cc/150?img=5',
        cvUrl: '/uploads/cv/tranthib_cv.pdf',
        coverLetter: 'Mong muốn được làm việc trong môi trường chuyên nghiệp.',
        appliedDate: '2024-11-13',
        status: 'rejected',
        notes: 'Không đủ kinh nghiệm về React',
        rating: 2
    },
    {
        id: 3,
        jobId: 2,
        candidateId: 2,
        candidateName: 'Trần Thị B',
        candidateEmail: 'tranthib@gmail.com',
        candidatePhone: '0912345678',
        candidateAvatar: 'https://i.pravatar.cc/150?img=5',
        cvUrl: '/uploads/cv/tranthib_cv.pdf',
        coverLetter: 'Tôi đam mê thiết kế và có portfolio phong phú.',
        appliedDate: '2024-11-14',
        status: 'interview',
        notes: 'Portfolio rất ấn tượng',
        rating: 5,
        interviewDate: '2024-11-26',
        interviewTime: '10:00'
    }
];

// Mock Saved Jobs
export const mockSavedJobs = [
    { id: 1, candidateId: 1, jobId: 2, savedDate: '2024-11-10' },
    { id: 2, candidateId: 1, jobId: 4, savedDate: '2024-11-15' },
    { id: 3, candidateId: 2, jobId: 1, savedDate: '2024-11-12' }
];

// Mock Notifications
export const mockNotifications = [
    {
        id: 1,
        userId: 1,
        type: 'application',
        title: 'Hồ sơ của bạn đã được xem',
        message: 'FPT Software đã xem hồ sơ ứng tuyển của bạn cho vị trí Senior React Developer',
        read: false,
        createdAt: '2024-11-20T10:30:00',
        link: '/candidate/applications'
    },
    {
        id: 2,
        userId: 1,
        type: 'interview',
        title: 'Lịch phỏng vấn mới',
        message: 'Bạn có lịch phỏng vấn vào 25/11/2024 lúc 14:00 cho vị trí Senior React Developer',
        read: false,
        createdAt: '2024-11-19T15:00:00',
        link: '/candidate/interviews'
    },
    {
        id: 3,
        userId: 3,
        type: 'application',
        title: 'Ứng viên mới',
        message: 'Có 3 ứng viên mới ứng tuyển vào vị trí Senior React Developer',
        read: true,
        createdAt: '2024-11-18T09:00:00',
        link: '/employer/applications/1'
    }
];

// Mock Service Packages
export const mockServicePackages = [
    {
        id: 1,
        name: 'Basic',
        nameVi: 'Cơ bản',
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
        }
    },
    {
        id: 2,
        name: 'Pro',
        nameVi: 'Chuyên nghiệp',
        price: 2990000,
        duration: 30,
        popular: true,
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
        }
    },
    {
        id: 3,
        name: 'Enterprise',
        nameVi: 'Doanh nghiệp',
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
        }
    }
];

// Mock Categories & Industries
export const mockCategories = [
    { id: 1, name: 'Công nghệ thông tin', slug: 'cong-nghe-thong-tin', count: 1234 },
    { id: 2, name: 'Thiết kế', slug: 'thiet-ke', count: 567 },
    { id: 3, name: 'Marketing', slug: 'marketing', count: 432 },
    { id: 4, name: 'Kinh doanh', slug: 'kinh-doanh', count: 876 },
    { id: 5, name: 'Kế toán', slug: 'ke-toan', count: 345 },
    { id: 6, name: 'Nhân sự', slug: 'nhan-su', count: 234 },
    { id: 7, name: 'Quản lý sản phẩm', slug: 'quan-ly-san-pham', count: 189 }
];

export const mockLocations = [
    { id: 1, name: 'TP.HCM', slug: 'tp-hcm', count: 3456 },
    { id: 2, name: 'Hà Nội', slug: 'ha-noi', count: 2890 },
    { id: 3, name: 'Đà Nẵng', slug: 'da-nang', count: 567 },
    { id: 4, name: 'Cần Thơ', slug: 'can-tho', count: 234 },
    { id: 5, name: 'Bình Dương', slug: 'binh-duong', count: 445 },
    { id: 6, name: 'Đồng Nai', slug: 'dong-nai', count: 312 }
];

// API Simulation Functions

// Auth APIs
export const authAPI = {
    login: async (email, password) => {
        await delay(800);
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Email hoặc mật khẩu không đúng');
        }
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token: 'mock-jwt-token-' + user.id };
    },

    register: async (userData) => {
        await delay(1000);
        // Simulate registration
        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            avatar: 'https://i.pravatar.cc/150?img=' + (mockUsers.length + 1)
        };
        return { user: newUser, token: 'mock-jwt-token-' + newUser.id };
    },

    forgotPassword: async (email) => {
        await delay(800);
        const user = mockUsers.find(u => u.email === email);
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
            applications: 0,
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
        const user = mockUsers.find(u => u.id === userId);
        if (!user) throw new Error('Không tìm thấy người dùng');
        user.profile = { ...user.profile, ...profileData };
        return user;
    },

    uploadCV: async (userId, file) => {
        await delay(1200);
        // Simulate file upload
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
            totalUsers: mockUsers.length,
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
        const user = mockUsers.find(u => u.id === userId);
        if (user && user.companyProfile) {
            user.companyProfile.isVerified = status === 'approved';
            user.companyProfile.verificationDate = new Date().toISOString().split('T')[0];
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

export default {
    mockUsers,
    mockJobs,
    mockApplications,
    mockSavedJobs,
    mockNotifications,
    mockServicePackages,
    mockCategories,
    mockLocations,
    authAPI,
    jobAPI,
    applicationAPI,
    savedJobAPI,
    profileAPI,
    notificationAPI,
    adminAPI
};
