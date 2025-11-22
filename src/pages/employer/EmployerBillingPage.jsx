import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockServicePackages } from '../../services/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
    CreditCard, Package, CheckCircle, XCircle, Star,
    DollarSign, Receipt, Download, TrendingUp,
    Zap, Award, Clock
} from 'lucide-react';

const EmployerBillingPage = () => {
    const { user } = useAuth();
    const [selectedPlan, setSelectedPlan] = useState(user?.companyProfile?.subscription || 'basic');

    // Mock payment history
    const paymentHistory = [
        {
            id: 1,
            date: '2024-11-01',
            package: 'Pro',
            amount: 2990000,
            status: 'success',
            invoiceUrl: '#'
        },
        {
            id: 2,
            date: '2024-10-01',
            package: 'Pro',
            amount: 2990000,
            status: 'success',
            invoiceUrl: '#'
        },
        {
            id: 3,
            date: '2024-09-01',
            package: 'Basic',
            amount: 0,
            status: 'success',
            invoiceUrl: '#'
        }
    ];

    const currentPlan = mockServicePackages.find(p => p.name.toLowerCase() === selectedPlan);

    const handleUpgrade = (packageName) => {
        if (confirm(`Xác nhận nâng cấp lên gói ${packageName}?`)) {
            setSelectedPlan(packageName.toLowerCase());
            alert(`Đã nâng cấp lên gói ${packageName} thành công!`);
        }
    };

    const handleDownloadInvoice = (invoiceUrl) => {
        window.open(invoiceUrl, '_blank');
    };

    const usageStats = {
        jobPostsUsed: 15,
        jobPostsLimit: currentPlan?.limits.jobPosts || 3,
        featuredUsed: 3,
        featuredLimit: currentPlan?.limits.featured || 0,
        cvViewsUsed: 234,
        cvViewsLimit: currentPlan?.limits.cvViews || 50
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Gói dịch vụ & Thanh toán</h1>
                <p className="text-gray-600">Quản lý gói dịch vụ và lịch sử thanh toán</p>
            </div>

            {/* Current Plan */}
            <Card>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-600" />
                                Gói hiện tại
                            </h2>
                        </div>
                        <Badge variant={currentPlan?.popular ? 'primary' : 'secondary'}>
                            {currentPlan?.nameVi || currentPlan?.name}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Plan Details */}
                        <div>
                            <div className="mb-4">
                                <p className="text-3xl font-bold text-gray-900">
                                    {currentPlan?.price === 0
                                        ? 'Miễn phí'
                                        : `${currentPlan?.price?.toLocaleString('vi-VN')} VND`
                                    }
                                </p>
                                <p className="text-sm text-gray-600">/{currentPlan?.duration} ngày</p>
                            </div>

                            <div className="space-y-2">
                                {currentPlan?.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Usage Stats */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-4">Sử dụng trong tháng</h3>

                            <div className="space-y-4">
                                {/* Job Posts */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-700">Tin tuyển dụng</span>
                                        <span className="font-medium text-gray-900">
                                            {usageStats.jobPostsUsed} / {usageStats.jobPostsLimit === -1 ? '∞' : usageStats.jobPostsLimit}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{
                                                width: usageStats.jobPostsLimit === -1
                                                    ? '100%'
                                                    : `${Math.min((usageStats.jobPostsUsed / usageStats.jobPostsLimit) * 100, 100)}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Featured Posts */}
                                {usageStats.featuredLimit > 0 && (
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-700">Tin nổi bật</span>
                                            <span className="font-medium text-gray-900">
                                                {usageStats.featuredUsed} / {usageStats.featuredLimit === -1 ? '∞' : usageStats.featuredLimit}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-yellow-600 h-2 rounded-full transition-all"
                                                style={{
                                                    width: usageStats.featuredLimit === -1
                                                        ? '100%'
                                                        : `${Math.min((usageStats.featuredUsed / usageStats.featuredLimit) * 100, 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* CV Views */}
                                {usageStats.cvViewsLimit !== -1 && (
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-700">Lượt xem CV</span>
                                            <span className="font-medium text-gray-900">
                                                {usageStats.cvViewsUsed} / {usageStats.cvViewsLimit}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min((usageStats.cvViewsUsed / usageStats.cvViewsLimit) * 100, 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t">
                                <p className="text-xs text-gray-600">
                                    <Clock className="h-3 w-3 inline mr-1" />
                                    Gia hạn vào: {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Available Packages */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Các gói dịch vụ</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockServicePackages.map((pkg) => {
                        const isCurrentPlan = pkg.name.toLowerCase() === selectedPlan;
                        const isUpgrade = pkg.price > (currentPlan?.price || 0);

                        return (
                            <Card key={pkg.id} className={pkg.popular ? 'ring-2 ring-blue-500' : ''}>
                                <div className="p-6">
                                    {pkg.popular && (
                                        <div className="mb-4">
                                            <Badge variant="primary">
                                                <Star className="h-3 w-3 mr-1" />
                                                Phổ biến nhất
                                            </Badge>
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {pkg.nameVi}
                                    </h3>

                                    <div className="mb-6">
                                        <p className="text-3xl font-bold text-gray-900">
                                            {pkg.price === 0
                                                ? 'Miễn phí'
                                                : `${pkg.price.toLocaleString('vi-VN')}đ`
                                            }
                                        </p>
                                        <p className="text-sm text-gray-600">/{pkg.duration} ngày</p>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {pkg.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {isCurrentPlan ? (
                                        <Button variant="outline" className="w-full" disabled>
                                            Gói hiện tại
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full"
                                            variant={pkg.popular ? 'primary' : 'outline'}
                                            onClick={() => handleUpgrade(pkg.name)}
                                        >
                                            {isUpgrade ? (
                                                <>
                                                    <TrendingUp className="h-4 w-4 mr-2" />
                                                    Nâng cấp
                                                </>
                                            ) : (
                                                'Chọn gói này'
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Payment History */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                        <Receipt className="h-5 w-5 text-purple-600" />
                        Lịch sử thanh toán
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        Ngày
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        Gói dịch vụ
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                                        Số tiền
                                    </th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                                        Trạng thái
                                    </th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                                        Hóa đơn
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentHistory.map((payment) => (
                                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-900">
                                            {new Date(payment.date).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-900">
                                            {payment.package}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                                            {payment.amount === 0
                                                ? 'Miễn phí'
                                                : `${payment.amount.toLocaleString('vi-VN')}đ`
                                            }
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {payment.status === 'success' ? (
                                                <Badge variant="success">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Thành công
                                                </Badge>
                                            ) : (
                                                <Badge variant="danger">
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Thất bại
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownloadInvoice(payment.invoiceUrl)}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {paymentHistory.length === 0 && (
                        <div className="py-12 text-center">
                            <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Chưa có lịch sử thanh toán</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Payment Methods */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                        <CreditCard className="h-5 w-5 text-indigo-600" />
                        Phương thức thanh toán
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-50 rounded">
                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Thẻ ngân hàng</p>
                                    <p className="text-xs text-gray-600">Visa, Mastercard</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-50 rounded">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Chuyển khoản</p>
                                    <p className="text-xs text-gray-600">Internet Banking</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-50 rounded">
                                    <Zap className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Ví điện tử</p>
                                    <p className="text-xs text-gray-600">MoMo, ZaloPay</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Support */}
            <Card>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Award className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Cần hỗ trợ về thanh toán?
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp bạn với mọi thắc mắc về gói dịch vụ và thanh toán.
                            </p>
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Liên hệ hỗ trợ
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Câu hỏi thường gặp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EmployerBillingPage;
