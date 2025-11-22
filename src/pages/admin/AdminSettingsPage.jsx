import { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Settings, Mail, DollarSign, Shield, Save } from 'lucide-react';

const AdminSettingsPage = () => {
    const [settings, setSettings] = useState({
        siteName: 'Job Portal',
        siteEmail: 'admin@jobportal.vn',
        supportEmail: 'support@jobportal.vn',
        maintenanceMode: false,
        allowRegistration: true,
        emailNotifications: true,
        smsNotifications: false,
        paymentGateway: 'vnpay',
        commissionRate: 10,
        minWithdraw: 100000,
        autoApproveJobs: false,
        requireKYC: true
    });

    const handleSave = () => {
        alert('Đã lưu cài đặt!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
                <p className="text-gray-600">Cấu hình các thông số hệ thống</p>
            </div>

            {/* General Settings */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-blue-600" />
                        Cài đặt chung
                    </h2>
                    <div className="space-y-4">
                        <Input label="Tên website" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
                        <Input label="Email website" type="email" value={settings.siteEmail} onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })} />
                        <Input label="Email hỗ trợ" type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} />

                        <div className="space-y-3 pt-4 border-t">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} className="rounded" />
                                <span className="text-sm text-gray-700">Chế độ bảo trì</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={settings.allowRegistration} onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })} className="rounded" />
                                <span className="text-sm text-gray-700">Cho phép đăng ký mới</span>
                            </label>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Email & Notifications */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-purple-600" />
                        Email & Thông báo
                    </h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} className="rounded" />
                            <span className="text-sm text-gray-700">Bật thông báo email</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={settings.smsNotifications} onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })} className="rounded" />
                            <span className="text-sm text-gray-700">Bật thông báo SMS</span>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Payment Settings */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Thanh toán
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cổng thanh toán</label>
                            <select value={settings.paymentGateway} onChange={(e) => setSettings({ ...settings, paymentGateway: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="vnpay">VNPay</option>
                                <option value="momo">MoMo</option>
                                <option value="zalopay">ZaloPay</option>
                            </select>
                        </div>
                        <Input label="Tỷ lệ hoa hồng (%)" type="number" value={settings.commissionRate} onChange={(e) => setSettings({ ...settings, commissionRate: parseInt(e.target.value) })} />
                        <Input label="Số tiền rút tối thiểu (VND)" type="number" value={settings.minWithdraw} onChange={(e) => setSettings({ ...settings, minWithdraw: parseInt(e.target.value) })} />
                    </div>
                </div>
            </Card>

            {/* Security & Privacy */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-red-600" />
                        Bảo mật & Quyền riêng tư
                    </h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={settings.autoApproveJobs} onChange={(e) => setSettings({ ...settings, autoApproveJobs: e.target.checked })} className="rounded" />
                            <span className="text-sm text-gray-700">Tự động duyệt tin tuyển dụng</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={settings.requireKYC} onChange={(e) => setSettings({ ...settings, requireKYC: e.target.checked })} className="rounded" />
                            <span className="text-sm text-gray-700">Yêu cầu xác minh KYC cho nhà tuyển dụng</span>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button onClick={handleSave} size="lg">
                    <Save className="h-5 w-5 mr-2" />
                    Lưu cài đặt
                </Button>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
