import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
    User, Mail, Lock, Bell, Shield, Eye, EyeOff,
    Building2, Smartphone, Trash2, Settings as SettingsIcon,
    CheckCircle, AlertCircle
} from 'lucide-react';

const EmployerSettingsPage = () => {
    const { user, updateUser } = useAuth();

    const [activeTab, setActiveTab] = useState('account');
    
    // Account Settings
    const [accountData, setAccountData] = useState({
        companyName: user?.companyProfile?.companyName || user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        contactPerson: user?.companyProfile?.contactPerson || '',
        taxCode: user?.companyProfile?.taxCode || ''
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

    // Notification Settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNewApplicant: true,
        emailStatusChange: true,
        emailPackageExpiry: true,
        emailNewMessage: true,
        pushNewApplicant: true,
        pushStatusChange: false,
        pushPackageExpiry: true,
        smsImportant: false
    });

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        updateUser({
            ...user,
            name: accountData.companyName,
            email: accountData.email,
            phone: accountData.phone,
            companyProfile: {
                ...user.companyProfile,
                companyName: accountData.companyName,
                contactPerson: accountData.contactPerson,
                taxCode: accountData.taxCode
            }
        });
        alert('Cập nhật thông tin thành công!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

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

        alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleNotificationUpdate = () => {
        updateUser({
            ...user,
            notificationSettings
        });
        alert('Cập nhật cài đặt thông báo thành công!');
    };

    const tabs = [
        { id: 'account', label: 'Tài khoản', icon: Building2 },
        { id: 'security', label: 'Bảo mật', icon: Lock },
        { id: 'notifications', label: 'Thông báo', icon: Bell }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
                <p className="text-gray-600">Quản lý thông tin công ty và tùy chọn cá nhân</p>
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
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </Card>
                </div>

                {/* Content */}
                <div className="col-span-12 lg:col-span-9">
                    {activeTab === 'account' && (
                        <Card padding="lg">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Thông tin tài khoản
                            </h2>
                            <form onSubmit={handleAccountSubmit} className="space-y-4">
                                <Input
                                    label="Tên công ty"
                                    icon={<Building2 className="w-5 h-5" />}
                                    value={accountData.companyName}
                                    onChange={(e) => setAccountData({ ...accountData, companyName: e.target.value })}
                                    required
                                />
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Email"
                                        type="email"
                                        icon={<Mail className="w-5 h-5" />}
                                        value={accountData.email}
                                        disabled
                                        helper="Email không thể thay đổi"
                                    />
                                    <Input
                                        label="Số điện thoại"
                                        icon={<Smartphone className="w-5 h-5" />}
                                        value={accountData.phone}
                                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Người liên hệ"
                                        icon={<User className="w-5 h-5" />}
                                        value={accountData.contactPerson}
                                        onChange={(e) => setAccountData({ ...accountData, contactPerson: e.target.value })}
                                    />
                                    <Input
                                        label="Mã số thuế"
                                        value={accountData.taxCode}
                                        onChange={(e) => setAccountData({ ...accountData, taxCode: e.target.value })}
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit">
                                        Lưu thay đổi
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card padding="lg">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Bảo mật tài khoản
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
                                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div className="text-sm text-blue-800">
                                            <p className="font-medium mb-1">Yêu cầu mật khẩu mạnh</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Tối thiểu 6 ký tự</li>
                                                <li>Nên bao gồm chữ hoa, chữ thường và số</li>
                                                <li>Không sử dụng lại mật khẩu cũ</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit">
                                        Đổi mật khẩu
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card padding="lg">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Cài đặt thông báo
                            </h2>
                            
                            <div className="space-y-6">
                                {/* Email Notifications */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                        <Mail className="w-5 h-5" />
                                        Thông báo qua Email
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { key: 'emailNewApplicant', label: 'Ứng viên mới ứng tuyển' },
                                            { key: 'emailStatusChange', label: 'Thay đổi trạng thái ứng tuyển' },
                                            { key: 'emailPackageExpiry', label: 'Gói dịch vụ sắp hết hạn' },
                                            { key: 'emailNewMessage', label: 'Tin nhắn mới' }
                                        ].map(({ key, label }) => (
                                            <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                                <span className="text-gray-700">{label}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={notificationSettings[key]}
                                                    onChange={(e) => setNotificationSettings({
                                                        ...notificationSettings,
                                                        [key]: e.target.checked
                                                    })}
                                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Push Notifications */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                        <Bell className="w-5 h-5" />
                                        Thông báo đẩy (Push)
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { key: 'pushNewApplicant', label: 'Ứng viên mới ứng tuyển' },
                                            { key: 'pushStatusChange', label: 'Thay đổi trạng thái' },
                                            { key: 'pushPackageExpiry', label: 'Gói dịch vụ sắp hết hạn' }
                                        ].map(({ key, label }) => (
                                            <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                                <span className="text-gray-700">{label}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={notificationSettings[key]}
                                                    onChange={(e) => setNotificationSettings({
                                                        ...notificationSettings,
                                                        [key]: e.target.checked
                                                    })}
                                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* SMS Notifications */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                        <Smartphone className="w-5 h-5" />
                                        Thông báo SMS
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                            <span className="text-gray-700">Chỉ thông báo quan trọng</span>
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.smsImportant}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    smsImportant: e.target.checked
                                                })}
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t">
                                    <Button onClick={handleNotificationUpdate}>
                                        Lưu cài đặt
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerSettingsPage;
