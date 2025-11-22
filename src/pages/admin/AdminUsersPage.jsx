import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import {
    Users, Search, UserPlus, Edit, Trash2,
    Shield, Ban, CheckCircle, Crown, Building2, UserCheck
} from 'lucide-react';

const AdminUsersPage = () => {
    const { users, updateUser, deleteUser, blockUser } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Filter users
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchSearch =
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchRole = filterRole === 'all' || user.role === filterRole;

            const matchStatus =
                filterStatus === 'all' ||
                (filterStatus === 'active' && !user.isBlocked) ||
                (filterStatus === 'blocked' && user.isBlocked) ||
                (filterStatus === 'verified' && (user.isVerified || user.companyProfile?.isVerified)) ||
                (filterStatus === 'premium' && user.isPremium);

            return matchSearch && matchRole && matchStatus;
        });
    }, [users, searchTerm, filterRole, filterStatus]);

    // Stats
    const stats = useMemo(() => ({
        total: users.length,
        candidates: users.filter(u => u.role === 'candidate').length,
        employers: users.filter(u => u.role === 'employer').length,
        admins: users.filter(u => u.role === 'admin').length,
        blocked: users.filter(u => u.isBlocked).length,
        verified: users.filter(u => u.isVerified || u.companyProfile?.isVerified).length
    }), [users]);

    const handleBlockUser = (userId) => {
        if (confirm('Bạn có chắc chắn muốn khóa/mở khóa người dùng này?')) {
            blockUser(userId);
        }
    };

    const handleDeleteUser = (userId) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác!')) {
            deleteUser(userId);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleSaveUser = () => {
        updateUser(selectedUser.id, selectedUser);
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const getRoleBadge = (role) => {
        const variants = {
            admin: 'danger',
            employer: 'warning',
            candidate: 'info'
        };
        const labels = {
            admin: 'Admin',
            employer: 'Nhà tuyển dụng',
            candidate: 'Ứng viên'
        };
        return <Badge variant={variants[role]}>{labels[role]}</Badge>;
    };

    const columns = [
        {
            header: 'Người dùng',
            accessor: 'user',
            render: (user) => (
                <div className="flex items-center gap-3">
                    <img
                        src={user.avatar || 'https://i.pravatar.cc/150'}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Vai trò',
            accessor: 'role',
            render: (user) => getRoleBadge(user.role)
        },
        {
            header: 'Số điện thoại',
            accessor: 'phone',
            render: (user) => (
                <span className="text-gray-700">{user.phone || '—'}</span>
            )
        },
        {
            header: 'Trạng thái',
            accessor: 'status',
            render: (user) => (
                <div className="space-y-1">
                    {user.isBlocked ? (
                        <Badge variant="danger">Đã khóa</Badge>
                    ) : (
                        <Badge variant="success">Hoạt động</Badge>
                    )}
                    {(user.isVerified || user.companyProfile?.isVerified) && (
                        <Badge variant="info" className="ml-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                        </Badge>
                    )}
                    {user.isPremium && (
                        <Badge variant="warning" className="ml-1">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                        </Badge>
                    )}
                </div>
            )
        },
        {
            header: 'Hành động',
            accessor: 'actions',
            render: (user) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBlockUser(user.id)}
                        className={user.isBlocked ? 'text-green-600' : 'text-orange-600'}
                    >
                        {user.isBlocked ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <Ban className="h-4 w-4" />
                        )}
                    </Button>
                    {user.role !== 'admin' && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                    <p className="text-gray-600">Quản lý tất cả người dùng trong hệ thống</p>
                </div>
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm người dùng
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Tổng người dùng', value: stats.total, icon: Users, color: 'blue' },
                    { label: 'Ứng viên', value: stats.candidates, icon: UserCheck, color: 'green' },
                    { label: 'Nhà tuyển dụng', value: stats.employers, icon: Building2, color: 'purple' },
                    { label: 'Admin', value: stats.admins, icon: Shield, color: 'red' },
                    { label: 'Đã xác thực', value: stats.verified, icon: CheckCircle, color: 'cyan' },
                    { label: 'Bị khóa', value: stats.blocked, icon: Ban, color: 'orange' }
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <div className="p-4">
                                <div className={`inline-flex items-center justify-center w-10 h-10 bg-${stat.color}-100 rounded-lg mb-3`}>
                                    <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả vai trò</option>
                                <option value="candidate">Ứng viên</option>
                                <option value="employer">Nhà tuyển dụng</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Hoạt động</option>
                                <option value="blocked">Bị khóa</option>
                                <option value="verified">Đã xác thực</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Users Table */}
            <Card>
                <div className="p-6">
                    <Table
                        columns={columns}
                        data={filteredUsers}
                        emptyMessage="Không tìm thấy người dùng nào"
                    />
                </div>
            </Card>

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <Modal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedUser(null);
                    }}
                    title="Chỉnh sửa người dùng"
                >
                    <div className="space-y-4">
                        <Input
                            label="Tên"
                            value={selectedUser.name || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={selectedUser.email}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        />

                        <Input
                            label="Số điện thoại"
                            value={selectedUser.phone || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Vai trò
                            </label>
                            <select
                                value={selectedUser.role}
                                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="candidate">Ứng viên</option>
                                <option value="employer">Nhà tuyển dụng</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedUser.isBlocked || false}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, isBlocked: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Khóa tài khoản</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedUser.isVerified || false}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, isVerified: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Xác thực tài khoản</span>
                            </label>

                            {selectedUser.role === 'candidate' && (
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedUser.isPremium || false}
                                        onChange={(e) => setSelectedUser({
                                            ...selectedUser,
                                            isPremium: e.target.checked,
                                            profile: { ...selectedUser.profile, isPremium: e.target.checked }
                                        })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Premium</span>
                                </label>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setSelectedUser(null);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button onClick={handleSaveUser}>
                                Lưu thay đổi
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminUsersPage;
