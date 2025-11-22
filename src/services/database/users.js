// Mock Users Data (Candidates + Admin)

export const mockUsers = [
    {
        id: 101,
        email: 'candidate@example.com',
        password: '123456',
        role: 'candidate',
        name: 'Nguyễn Văn An',
        phone: '0901234567',
        avatar: 'https://i.pravatar.cc/150?u=candidate1',
        isPremium: false
    },
    {
        id: 102,
        email: 'candidate2@example.com',
        password: '123456',
        role: 'candidate',
        name: 'Trần Thị Bình',
        phone: '0912345678',
        avatar: 'https://i.pravatar.cc/150?u=candidate2',
        isPremium: true
    },
    {
        id: 103,
        email: 'candidate3@example.com',
        password: '123456',
        role: 'candidate',
        name: 'Lê Hoàng Châu',
        phone: '0923456789',
        avatar: 'https://i.pravatar.cc/150?u=candidate3',
        isPremium: false
    },
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
