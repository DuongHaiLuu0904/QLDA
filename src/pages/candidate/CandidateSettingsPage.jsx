import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
    User, Mail, Lock, Bell, Shield, Eye, EyeOff,
    Globe, Smartphone, Trash2, Download, AlertCircle,
    CheckCircle, Save, Settings as SettingsIcon
} from 'lucide-react';

const CandidateSettingsPage = () => {
    const { user, updateUser } = useAuth();

    const [activeTab, setActiveTab] = useState('account'); // account, privacy, notifications, security

    // Account Settings
    const [accountData, setAccountData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        dateOfBirth: user?.profile?.dateOfBirth || '',
        gender: user?.profile?.gender || ''
    });

    // Password Change
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    // Privacy Settings
    const [privacySettings, setPrivacySettings] = useState({
        profileVisible: true,
        emailVisible: false,
        phoneVisible: false,
        searchable: true,
        showActivity: true
    });

    // Notification Settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNewJob: true,
        emailApplication: true,
        emailInterview: true,
        emailMessage: true,
        pushNewJob: false,
        pushApplication: true,
        pushInterview: true,
        pushMessage: true,
        smsInterview: false
    });

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        updateUser({
            ...user,
            name: accountData.name,
            email: accountData.email,
            phone: accountData.phone,
            profile: {
                ...user.profile,
                dateOfBirth: accountData.dateOfBirth,
                gender: accountData.gender
            }
        });
        alert('Cập nhật thông tin thành công!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

        // Validate current password (in real app, this would check against stored password)
        if (!passwordData.currentPassword) {
            alert('Vui lòng nhập mật khẩu hiện tại!');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        if (passwordData.newPassword === passwordData.currentPassword) {
            alert('Mật khẩu mới phải khác mật khẩu hiện tại!');
            return;
        }

        // Check password strength
        const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
        const hasLowerCase = /[a-z]/.test(passwordData.newPassword);
        const hasNumber = /\d/.test(passwordData.newPassword);
        
        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            if (!confirm('Mật khẩu nên chứa chữ hoa, chữ thường và số để bảo mật tốt hơn. Bạn có muốn tiếp tục?')) {
                return;
            }
        }

        // In real app, would call API to update password
        alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handlePrivacyUpdate = () => {
        // Simulate privacy update
        alert('Cập nhật cài đặt bảo mật thành công!');
    };

    const handleNotificationUpdate = () => {
        // Simulate notification update
        alert('Cập nhật cài đặt thông báo thành công!');
    };

    const handleDeleteAccount = () => {
        if (confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
            alert('Chức năng xóa tài khoản đang được phát triển');
        }
    };

    const handleDownloadData = () => {
        alert('Đang chuẩn bị dữ liệu của bạn...');
    };

    const tabs = [
        { id: 'account', label: 'Tài khoản', icon: User },
        { id: 'security', label: 'Bảo mật', icon: Lock },
        { id: 'privacy', label: 'Quyền riêng tư', icon: Shield },
        { id: 'notifications', label: 'Thông báo', icon: Bell }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
                <p className="text-gray-600">Quản lý tài khoản và tùy chọn cá nhân của bạn</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="col-span-12 lg:col-span-3">
                    <Card>
                        <div className="p-4">
                            <nav className="space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </Card>
                </div>

                {/* Content */}
                <div className="col-span-12 lg:col-span-9">
                    {/* Account Settings */}
                    {activeTab === 'account' && (
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Thông tin tài khoản
                                </h2>

                                <form onSubmit={handleAccountSubmit} className="space-y-4">
                                    <Input
                                        label="Họ và tên"
                                        value={accountData.name}
                                        onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                                        required
                                    />

                                    <Input
                                        label="Email"
                                        type="email"
                                        value={accountData.email}
                                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                                        required
                                    />

                                    <Input
                                        label="Số điện thoại"
                                        type="tel"
                                        value={accountData.phone}
                                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Ngày sinh"
                                            type="date"
                                            value={accountData.dateOfBirth}
                                            onChange={(e) => setAccountData({ ...accountData, dateOfBirth: e.target.value })}
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Giới tính
                                            </label>
                                            <select
                                                value={accountData.gender}
                                                onChange={(e) => setAccountData({ ...accountData, gender: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit">
                                            <Save className="h-4 w-4 mr-2" />
                                            Lưu thay đổi
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <Card>
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-blue-600" />
                                        Đổi mật khẩu
                                    </h2>

                                    <form onSubmit={handlePasswordChange} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mật khẩu hiện tại
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords.current ? 'text' : 'password'}
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showPasswords.current ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mật khẩu mới
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords.new ? 'text' : 'password'}
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showPasswords.new ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Xác nhận mật khẩu mới
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords.confirm ? 'text' : 'password'}
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showPasswords.confirm ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button type="submit">
                                                Đổi mật khẩu
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Card>

                            <Card>
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Phiên đăng nhập</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Globe className="h-5 w-5 text-gray-600" />
                                                <div>
                                                    <p className="font-medium text-gray-900">Chrome - Windows</p>
                                                    <p className="text-sm text-gray-600">Hoạt động hiện tại</p>
                                                </div>
                                            </div>
                                            <Badge variant="success">Đang dùng</Badge>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Privacy Settings */}
                    {activeTab === 'privacy' && (
                        <div className="space-y-6">
                            <Card>
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                        Quyền riêng tư
                                    </h2>

                                    <div className="space-y-4">
                                        {[
                                            { key: 'profileVisible', label: 'Hiển thị hồ sơ công khai', description: 'Cho phép nhà tuyển dụng tìm thấy hồ sơ của bạn' },
                                            { key: 'emailVisible', label: 'Hiển thị email', description: 'Email của bạn sẽ hiển thị trên hồ sơ công khai' },
                                            { key: 'phoneVisible', label: 'Hiển thị số điện thoại', description: 'Số điện thoại của bạn sẽ hiển thị trên hồ sơ công khai' },
                                            { key: 'searchable', label: 'Cho phép tìm kiếm', description: 'Hồ sơ của bạn xuất hiện trong kết quả tìm kiếm' },
                                            { key: 'showActivity', label: 'Hiển thị hoạt động', description: 'Hiển thị lần online gần nhất và hoạt động ứng tuyển' }
                                        ].map((setting) => (
                                            <div key={setting.key} className="flex items-start justify-between py-3 border-b">
                                                <div>
                                                    <p className="font-medium text-gray-900">{setting.label}</p>
                                                    <p className="text-sm text-gray-600">{setting.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={privacySettings[setting.key]}
                                                        onChange={(e) => setPrivacySettings({ ...privacySettings, [setting.key]: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6">
                                        <Button onClick={handlePrivacyUpdate}>
                                            <Save className="h-4 w-4 mr-2" />
                                            Lưu cài đặt
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Download className="h-5 w-5 text-blue-600" />
                                        Dữ liệu của bạn
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Tải xuống dữ liệu</p>
                                                <p className="text-sm text-gray-600">Tải về tất cả dữ liệu cá nhân của bạn</p>
                                            </div>
                                            <Button variant="outline" onClick={handleDownloadData}>
                                                <Download className="h-4 w-4 mr-2" />
                                                Tải xuống
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div>
                                                <p className="font-medium text-red-900">Xóa tài khoản</p>
                                                <p className="text-sm text-red-600">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</p>
                                            </div>
                                            <Button variant="outline" onClick={handleDeleteAccount} className="text-red-600 border-red-600">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Xóa tài khoản
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-blue-600" />
                                    Cài đặt thông báo
                                </h2>

                                <div className="space-y-6">
                                    {/* Email Notifications */}
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                            <Mail className="h-5 w-5 text-purple-600" />
                                            Thông báo Email
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'emailNewJob', label: 'Công việc mới phù hợp', description: 'Nhận email khi có công việc phù hợp với hồ sơ' },
                                                { key: 'emailApplication', label: 'Cập nhật đơn ứng tuyển', description: 'Thông báo về trạng thái đơn ứng tuyển' },
                                                { key: 'emailInterview', label: 'Lịch phỏng vấn', description: 'Nhắc nhở về lịch phỏng vấn sắp tới' },
                                                { key: 'emailMessage', label: 'Tin nhắn mới', description: 'Thông báo khi có tin nhắn từ nhà tuyển dụng' }
                                            ].map((setting) => (
                                                <div key={setting.key} className="flex items-start justify-between py-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{setting.label}</p>
                                                        <p className="text-xs text-gray-600">{setting.description}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notificationSettings[setting.key]}
                                                            onChange={(e) => setNotificationSettings({ ...notificationSettings, [setting.key]: e.target.checked })}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Push Notifications */}
                                    <div className="pt-4 border-t">
                                        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                            <Smartphone className="h-5 w-5 text-green-600" />
                                            Thông báo đẩy
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'pushNewJob', label: 'Công việc mới', description: 'Thông báo trên trình duyệt' },
                                                { key: 'pushApplication', label: 'Cập nhật ứng tuyển', description: 'Thông báo ngay lập tức' },
                                                { key: 'pushInterview', label: 'Lịch phỏng vấn', description: 'Nhắc nhở trước 1 giờ' },
                                                { key: 'pushMessage', label: 'Tin nhắn', description: 'Thông báo tin nhắn mới' }
                                            ].map((setting) => (
                                                <div key={setting.key} className="flex items-start justify-between py-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{setting.label}</p>
                                                        <p className="text-xs text-gray-600">{setting.description}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notificationSettings[setting.key]}
                                                            onChange={(e) => setNotificationSettings({ ...notificationSettings, [setting.key]: e.target.checked })}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button onClick={handleNotificationUpdate}>
                                            <Save className="h-4 w-4 mr-2" />
                                            Lưu cài đặt
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateSettingsPage;
