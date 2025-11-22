import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Building2, MapPin, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const RegisterPage = () => {
    const [userType, setUserType] = useState('candidate'); // 'candidate' or 'employer'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        // Employer specific
        companyName: '',
        taxCode: '',
        companyAddress: '',
        industry: '',
        companySize: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (userType === 'employer' && !formData.companyName) {
            setError('Vui lòng nhập tên công ty');
            return;
        }

        setLoading(true);

        try {
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: userType
            };

            if (userType === 'employer') {
                userData.companyProfile = {
                    companyName: formData.companyName,
                    taxCode: formData.taxCode,
                    address: formData.companyAddress,
                    industry: formData.industry,
                    companySize: formData.companySize
                };
            }

            await register(userData);

            // Navigate based on role
            if (userType === 'candidate') {
                navigate('/candidate/dashboard');
            } else {
                navigate('/employer/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Tạo tài khoản mới
                    </h2>
                    <p className="text-gray-600">
                        Tham gia cộng đồng tuyển dụng hàng đầu Việt Nam
                    </p>
                </div>

                {/* User Type Selection */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => setUserType('candidate')}
                        className={`p-6 rounded-lg border-2 transition-all ${userType === 'candidate'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                    >
                        <User className={`w-12 h-12 mx-auto mb-3 ${userType === 'candidate' ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                        <h3 className="font-semibold text-gray-900 mb-1">
                            Tôi là ứng viên
                        </h3>
                        <p className="text-sm text-gray-600">
                            Tìm kiếm và ứng tuyển công việc
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() => setUserType('employer')}
                        className={`p-6 rounded-lg border-2 transition-all ${userType === 'employer'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                    >
                        <Building2 className={`w-12 h-12 mx-auto mb-3 ${userType === 'employer' ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                        <h3 className="font-semibold text-gray-900 mb-1">
                            Tôi là nhà tuyển dụng
                        </h3>
                        <p className="text-sm text-gray-600">
                            Đăng tin và tìm ứng viên
                        </p>
                    </button>
                </div>

                <Card padding="lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Common Fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Họ và tên"
                                type="text"
                                name="name"
                                required
                                icon={<User className="w-5 h-5" />}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nguyễn Văn A"
                            />

                            <Input
                                label="Số điện thoại"
                                type="tel"
                                name="phone"
                                required
                                icon={<Phone className="w-5 h-5" />}
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="0987654321"
                            />
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            required
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Mật khẩu"
                                type="password"
                                name="password"
                                required
                                icon={<Lock className="w-5 h-5" />}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Tối thiểu 6 ký tự"
                            />

                            <Input
                                label="Xác nhận mật khẩu"
                                type="password"
                                name="confirmPassword"
                                required
                                icon={<Lock className="w-5 h-5" />}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>

                        {/* Employer Specific Fields */}
                        {userType === 'employer' && (
                            <>
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Thông tin công ty
                                    </h3>
                                </div>

                                <Input
                                    label="Tên công ty"
                                    type="text"
                                    name="companyName"
                                    required
                                    icon={<Building2 className="w-5 h-5" />}
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Công ty TNHH ABC"
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Mã số thuế"
                                        type="text"
                                        name="taxCode"
                                        icon={<FileText className="w-5 h-5" />}
                                        value={formData.taxCode}
                                        onChange={handleChange}
                                        placeholder="0123456789"
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quy mô công ty
                                        </label>
                                        <select
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Chọn quy mô</option>
                                            <option value="1-10">1-10 nhân viên</option>
                                            <option value="11-50">11-50 nhân viên</option>
                                            <option value="51-200">51-200 nhân viên</option>
                                            <option value="201-500">201-500 nhân viên</option>
                                            <option value="500+">Trên 500 nhân viên</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngành nghề
                                    </label>
                                    <select
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Chọn ngành nghề</option>
                                        <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Kinh doanh">Kinh doanh</option>
                                        <option value="Tài chính">Tài chính</option>
                                        <option value="Giáo dục">Giáo dục</option>
                                        <option value="Y tế">Y tế</option>
                                        <option value="Sản xuất">Sản xuất</option>
                                        <option value="Dịch vụ">Dịch vụ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>

                                <Input
                                    label="Địa chỉ công ty"
                                    type="text"
                                    name="companyAddress"
                                    icon={<MapPin className="w-5 h-5" />}
                                    value={formData.companyAddress}
                                    onChange={handleChange}
                                    placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                />
                            </>
                        )}

                        {/* Terms */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-600">
                                Tôi đồng ý với{' '}
                                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                                    Điều khoản dịch vụ
                                </Link>{' '}
                                và{' '}
                                <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                                    Chính sách bảo mật
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Đăng nhập ngay
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;
