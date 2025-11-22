import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(formData.email, formData.password);

            // Navigate based on role
            if (response.user.role === 'candidate') {
                navigate('/candidate/dashboard');
            } else if (response.user.role === 'employer') {
                navigate('/employer/dashboard');
            } else if (response.user.role === 'admin') {
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async (email, password) => {
        setFormData({ email, password });
        setError('');
        setLoading(true);

        try {
            const response = await login(email, password);

            if (response.user.role === 'candidate') {
                navigate('/candidate/dashboard');
            } else if (response.user.role === 'employer') {
                navigate('/employer/dashboard');
            } else if (response.user.role === 'admin') {
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Đăng nhập
                    </h2>
                    <p className="text-gray-600">
                        Chào mừng bạn quay trở lại!
                    </p>
                </div>

                <Card padding="lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email"
                            type="email"
                            required
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@email.com"
                        />

                        <Input
                            label="Mật khẩu"
                            type="password"
                            required
                            icon={<Lock className="w-5 h-5" />}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>

                            <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Demo Login Section */}
                <Card padding="md" className="bg-purple-50 border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-3 text-center">Demo Accounts</h3>
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            onClick={() => handleDemoLogin('nguyenvana@gmail.com', '123456')}
                            disabled={loading}
                        >
                            Login as Candidate
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            onClick={() => handleDemoLogin('company@fpt.vn', '123456')}
                            disabled={loading}
                        >
                            Login as Employer
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            onClick={() => handleDemoLogin('admin@system.vn', 'admin123')}
                            disabled={loading}
                        >
                            Login as Admin
                        </Button>
                    </div>
                </Card>

                <p className="text-center text-sm text-gray-600">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
