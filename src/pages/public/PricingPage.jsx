import { Link } from 'react-router-dom';
import { Check, X, Star, TrendingUp, Zap, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const PricingPage = () => {
    const { servicePackages } = useData();

    const features = {
        basic: [
            { name: 'Đăng tối đa 5 tin tuyển dụng/tháng', included: true },
            { name: 'Hiển thị logo công ty', included: true },
            { name: 'Tìm kiếm ứng viên cơ bản', included: true },
            { name: 'Hỗ trợ qua email', included: true },
            { name: 'Tin tuyển dụng nổi bật', included: false },
            { name: 'Quảng cáo trên trang chủ', included: false },
            { name: 'API tích hợp', included: false },
            { name: 'Tài khoản quản lý phụ', included: false },
        ],
        pro: [
            { name: 'Đăng tối đa 20 tin tuyển dụng/tháng', included: true },
            { name: 'Hiển thị logo công ty', included: true },
            { name: 'Tìm kiếm ứng viên nâng cao', included: true },
            { name: 'Hỗ trợ ưu tiên 24/7', included: true },
            { name: '5 tin nổi bật miễn phí/tháng', included: true },
            { name: 'Quảng cáo banner', included: true },
            { name: 'Thống kê chi tiết', included: true },
            { name: 'API tích hợp', included: false },
        ],
        enterprise: [
            { name: 'Không giới hạn tin tuyển dụng', included: true },
            { name: 'Trang công ty tùy chỉnh', included: true },
            { name: 'Tìm kiếm & headhunting', included: true },
            { name: 'Account Manager riêng', included: true },
            { name: 'Tin nổi bật không giới hạn', included: true },
            { name: 'Quảng cáo độc quyền trang chủ', included: true },
            { name: 'API & Webhook đầy đủ', included: true },
            { name: 'Nhiều tài khoản quản lý', included: true },
        ],
    };

    const getPackageIcon = (tier) => {
        switch (tier) {
            case 'basic':
                return <Star className="w-6 h-6" />;
            case 'pro':
                return <TrendingUp className="w-6 h-6" />;
            case 'enterprise':
                return <Award className="w-6 h-6" />;
            default:
                return <Zap className="w-6 h-6" />;
        }
    };

    const getPackageColor = (tier) => {
        switch (tier) {
            case 'basic':
                return 'from-gray-500 to-gray-700';
            case 'pro':
                return 'from-blue-500 to-blue-700';
            case 'enterprise':
                return 'from-amber-500 to-amber-700';
            default:
                return 'from-gray-500 to-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Bảng giá dịch vụ
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Chọn gói dịch vụ phù hợp để tuyển dụng nhân tài hiệu quả nhất
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {servicePackages.map((pkg, index) => {
                        const tierFeatures = features[pkg.tier] || [];
                        const isPopular = pkg.popular;
                        
                        return (
                            <div
                                key={pkg.id}
                                className={`relative ${isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <Badge variant="warning" size="lg">
                                            ⭐ PHỔ BIẾN NHẤT
                                        </Badge>
                                    </div>
                                )}
                                
                                <Card
                                    padding="none"
                                    className={`overflow-hidden h-full ${
                                        isPopular ? 'border-2 border-blue-500 shadow-xl' : ''
                                    }`}
                                >
                                    {/* Header */}
                                    <div className={`bg-gradient-to-r ${getPackageColor(pkg.tier)} text-white p-8`}>
                                        <div className="flex items-center justify-center mb-4">
                                            {getPackageIcon(pkg.tier)}
                                        </div>
                                        <h3 className="text-2xl font-bold text-center mb-2">
                                            {pkg.name}
                                        </h3>
                                        <div className="text-center">
                                            <div className="flex items-end justify-center">
                                                <span className="text-4xl font-bold">
                                                    {pkg.price === 0 ? 'Miễn phí' : `${(pkg.price / 1000000).toFixed(1)}tr`}
                                                </span>
                                                {pkg.price > 0 && (
                                                    <span className="text-lg ml-2 mb-1">/tháng</span>
                                                )}
                                            </div>
                                            {pkg.price > 0 && (
                                                <p className="text-sm text-blue-100 mt-2">
                                                    Tiết kiệm 20% khi thanh toán năm
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="p-8">
                                        <ul className="space-y-4 mb-8">
                                            {tierFeatures.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    {feature.included ? (
                                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                                                        {feature.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link to="/register?role=employer">
                                            <Button
                                                variant={isPopular ? 'primary' : 'outline'}
                                                size="lg"
                                                className="w-full"
                                            >
                                                {pkg.price === 0 ? 'Bắt đầu miễn phí' : 'Chọn gói này'}
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* Comparison Table */}
                <Card padding="lg" className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        So sánh chi tiết các gói
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 text-gray-900 font-semibold">
                                        Tính năng
                                    </th>
                                    {servicePackages.map(pkg => (
                                        <th key={pkg.id} className="text-center py-4 px-4">
                                            <div className="font-semibold text-gray-900">{pkg.name}</div>
                                            <div className="text-sm text-gray-600 font-normal">
                                                {pkg.price === 0 ? 'Miễn phí' : `${(pkg.price / 1000000).toFixed(1)}tr/tháng`}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="py-4 px-4 text-gray-700">Số tin tuyển dụng</td>
                                    <td className="py-4 px-4 text-center text-gray-900">5/tháng</td>
                                    <td className="py-4 px-4 text-center text-gray-900">20/tháng</td>
                                    <td className="py-4 px-4 text-center text-gray-900 font-semibold">Không giới hạn</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="py-4 px-4 text-gray-700">Tin nổi bật</td>
                                    <td className="py-4 px-4 text-center">
                                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-center text-gray-900">5/tháng</td>
                                    <td className="py-4 px-4 text-center text-gray-900 font-semibold">Không giới hạn</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-4 text-gray-700">Tìm kiếm ứng viên</td>
                                    <td className="py-4 px-4 text-center text-gray-900">Cơ bản</td>
                                    <td className="py-4 px-4 text-center text-gray-900">Nâng cao</td>
                                    <td className="py-4 px-4 text-center text-gray-900 font-semibold">Headhunting</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="py-4 px-4 text-gray-700">Hỗ trợ</td>
                                    <td className="py-4 px-4 text-center text-gray-900">Email</td>
                                    <td className="py-4 px-4 text-center text-gray-900">24/7</td>
                                    <td className="py-4 px-4 text-center text-gray-900 font-semibold">Account Manager</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-4 text-gray-700">Quảng cáo</td>
                                    <td className="py-4 px-4 text-center">
                                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                                    </td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="py-4 px-4 text-gray-700">API tích hợp</td>
                                    <td className="py-4 px-4 text-center">
                                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Câu hỏi thường gặp
                    </h2>
                    
                    <div className="space-y-6">
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Tôi có thể thay đổi gói dịch vụ sau khi đăng ký không?
                            </h3>
                            <p className="text-gray-600">
                                Có, bạn có thể nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào. Chúng tôi sẽ tính phí theo tỷ lệ cho thời gian sử dụng.
                            </p>
                        </Card>

                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Có chính sách hoàn tiền không?
                            </h3>
                            <p className="text-gray-600">
                                Chúng tôi có chính sách hoàn tiền 100% trong vòng 7 ngày đầu tiên nếu bạn không hài lòng với dịch vụ.
                            </p>
                        </Card>

                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Thanh toán như thế nào?
                            </h3>
                            <p className="text-gray-600">
                                Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, và ví điện tử. Thanh toán theo tháng hoặc theo năm (tiết kiệm 20%).
                            </p>
                        </Card>

                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Gói Enterprise có những lợi ích gì đặc biệt?
                            </h3>
                            <p className="text-gray-600">
                                Gói Enterprise bao gồm Account Manager riêng, hỗ trợ tùy chỉnh trang công ty, headhunting service, và nhiều tính năng độc quyền khác để tối ưu hóa chiến lược tuyển dụng của bạn.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Card padding="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Bạn cần tư vấn thêm?
                        </h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Đội ngũ của chúng tôi sẵn sàng tư vấn miễn phí để giúp bạn chọn gói dịch vụ phù hợp nhất
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/register?role=employer">
                                <Button variant="secondary" size="lg">
                                    Đăng ký ngay
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                                Liên hệ tư vấn
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
