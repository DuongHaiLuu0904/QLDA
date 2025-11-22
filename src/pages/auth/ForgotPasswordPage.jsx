import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate email
        if (!email) {
            setError('Vui lòng nhập email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Email không hợp lệ');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
                <Card className="w-full max-w-md" padding="lg">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Kiểm tra email của bạn
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email:
                        </p>
                        <p className="text-lg font-semibold text-blue-600 mb-6">
                            {email}
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Vui lòng kiểm tra hộp thư đến (và cả thư rác) của bạn. Link đặt lại mật khẩu có hiệu lực trong 24 giờ.
                        </p>
                        <div className="space-y-3">
                            <Link to="/login">
                                <Button className="w-full">
                                    Quay lại đăng nhập
                                </Button>
                            </Link>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setEmail('');
                                }}
                                className="w-full text-sm text-gray-600 hover:text-gray-900"
                            >
                                Gửi lại email
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Login */}
                <Link
                    to="/login"
                    className="inline-flex items-center text-white hover:text-blue-200 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Quay lại đăng nhập
                </Link>

                <Card padding="lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Quên mật khẩu?
                        </h1>
                        <p className="text-gray-600">
                            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail className="w-5 h-5" />}
                                disabled={loading}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Đang gửi...
                                </>
                            ) : (
                                'Gửi hướng dẫn'
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm">
                        <p className="text-gray-600">
                            Bạn chưa có tài khoản?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </Card>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-blue-100">
                        Cần hỗ trợ?{' '}
                        <a href="mailto:support@jobportal.vn" className="text-white hover:underline font-medium">
                            Liên hệ với chúng tôi
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
