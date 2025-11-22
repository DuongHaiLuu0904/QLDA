import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
    Crown, Check, X, Zap, Star, Users, FileText,
    TrendingUp, Shield, Sparkles, CreditCard, Clock,
    ArrowRight, Award, Target, Eye, MessageCircle
} from 'lucide-react';

const CandidatePremiumPage = () => {
    const { user } = useAuth();
    const [selectedPlan, setSelectedPlan] = useState('monthly'); // monthly, quarterly, yearly

    const isPremium = user?.profile?.isPremium;

    const plans = [
        {
            id: 'monthly',
            name: 'Hàng tháng',
            price: 99000,
            period: 'tháng',
            discount: null,
            popular: false
        },
        {
            id: 'quarterly',
            name: '3 tháng',
            price: 249000,
            period: '3 tháng',
            discount: 15,
            popular: true,
            savings: 48000
        },
        {
            id: 'yearly',
            name: 'Hàng năm',
            price: 799000,
            period: 'năm',
            discount: 33,
            popular: false,
            savings: 389000
        }
    ];

    const features = [
        {
            icon: Eye,
            title: 'Xem không giới hạn',
            description: 'Xem chi tiết công việc và hồ sơ công ty không giới hạn',
            free: '10/tháng',
            premium: 'Không giới hạn'
        },
        {
            icon: FileText,
            title: 'Ứng tuyển ưu tiên',
            description: 'CV của bạn được hiển thị trên cùng cho nhà tuyển dụng',
            free: false,
            premium: true
        },
        {
            icon: Zap,
            title: 'Ứng tuyển nhanh',
            description: 'Ứng tuyển nhanh chóng với một cú nhấp chuột',
            free: false,
            premium: true
        },
        {
            icon: Award,
            title: 'Huy hiệu Premium',
            description: 'Nổi bật với huy hiệu ứng viên Premium',
            free: false,
            premium: true
        },
        {
            icon: TrendingUp,
            title: 'Phân tích CV',
            description: 'Công cụ AI phân tích và đánh giá CV của bạn',
            free: 'Cơ bản',
            premium: 'Nâng cao'
        },
        {
            icon: MessageCircle,
            title: 'Tin nhắn trực tiếp',
            description: 'Nhắn tin trực tiếp với nhà tuyển dụng',
            free: '5/tháng',
            premium: 'Không giới hạn'
        },
        {
            icon: Target,
            title: 'Gợi ý công việc AI',
            description: 'Gợi ý công việc phù hợp với AI thông minh',
            free: 'Cơ bản',
            premium: 'Nâng cao'
        },
        {
            icon: Shield,
            title: 'Hồ sơ ẩn danh',
            description: 'Ứng tuyển mà không để lộ thông tin cá nhân',
            free: false,
            premium: true
        },
        {
            icon: Users,
            title: 'Hỗ trợ ưu tiên',
            description: 'Hỗ trợ khách hàng ưu tiên 24/7',
            free: false,
            premium: true
        },
        {
            icon: Star,
            title: 'Lưu công việc',
            description: 'Lưu và theo dõi các công việc yêu thích',
            free: '10',
            premium: 'Không giới hạn'
        }
    ];

    const benefits = [
        {
            icon: Crown,
            title: 'Tăng 3x cơ hội được tuyển dụng',
            description: 'Ứng viên Premium được nhà tuyển dụng liên hệ nhiều hơn 300%'
        },
        {
            icon: Sparkles,
            title: 'Hồ sơ nổi bật',
            description: 'Hồ sơ của bạn được ưu tiên hiển thị trong kết quả tìm kiếm'
        },
        {
            icon: Clock,
            title: 'Tiết kiệm thời gian',
            description: 'Ứng tuyển nhanh chóng với công cụ tự động thông minh'
        },
        {
            icon: TrendingUp,
            title: 'Thống kê chi tiết',
            description: 'Xem ai đã xem hồ sơ và phân tích hiệu quả ứng tuyển'
        }
    ];

    const testimonials = [
        {
            name: 'Nguyễn Văn A',
            position: 'Senior Developer',
            avatar: '👨‍💻',
            content: 'Premium giúp tôi tìm được công việc mơ ước chỉ sau 2 tuần. CV được ưu tiên và tôi nhận được nhiều lời mời phỏng vấn hơn!',
            rating: 5
        },
        {
            name: 'Trần Thị B',
            position: 'Marketing Manager',
            avatar: '👩‍💼',
            content: 'Công cụ AI phân tích CV rất hữu ích. Tôi đã cải thiện CV và tăng tỷ lệ phản hồi lên 200%.',
            rating: 5
        },
        {
            name: 'Lê Văn C',
            position: 'Data Analyst',
            avatar: '👨‍🔬',
            content: 'Ứng tuyển nhanh giúp tôi tiết kiệm rất nhiều thời gian. Chỉ cần 1 click là xong!',
            rating: 5
        }
    ];

    const handleUpgrade = () => {
        const selectedPlanData = plans.find(p => p.id === selectedPlan);
        alert(`Nâng cấp gói ${selectedPlanData.name} - ${selectedPlanData.price.toLocaleString()}đ`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            {isPremium ? (
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <Crown className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        Bạn đang dùng Premium
                                        <Badge variant="warning">
                                            <Crown className="h-3 w-3 mr-1" />
                                            Premium
                                        </Badge>
                                    </h1>
                                    <p className="text-gray-600">Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi</p>
                                </div>
                            </div>
                            <Button variant="outline">
                                Quản lý gói
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                        <Crown className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Nâng cấp lên Premium
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Mở khóa tất cả tính năng cao cấp và tăng gấp 3 lần cơ hội được tuyển dụng
                    </p>
                </div>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <div className="p-6 text-center">
                                <div className="inline-flex items-center justify-center h-12 w-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-4">
                                    <Icon className="h-6 w-6 text-orange-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600">{benefit.description}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {!isPremium && (
                <>
                    {/* Pricing Plans */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                Chọn gói phù hợp với bạn
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan === plan.id
                                                ? 'border-orange-500 bg-orange-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            } ${plan.popular ? 'ring-2 ring-orange-500' : ''}`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <Badge variant="warning">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Phổ biến nhất
                                                </Badge>
                                            </div>
                                        )}

                                        <div className="text-center">
                                            <h3 className="font-semibold text-gray-900 mb-2">{plan.name}</h3>

                                            <div className="mb-4">
                                                <span className="text-3xl font-bold text-gray-900">
                                                    {formatPrice(plan.price)}đ
                                                </span>
                                                <span className="text-gray-600">/{plan.period}</span>
                                            </div>

                                            {plan.discount && (
                                                <div className="space-y-1">
                                                    <Badge variant="success">
                                                        Tiết kiệm {plan.discount}%
                                                    </Badge>
                                                    {plan.savings && (
                                                        <p className="text-sm text-gray-600">
                                                            Tiết kiệm {formatPrice(plan.savings)}đ
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {selectedPlan === plan.id && (
                                            <div className="absolute top-4 right-4">
                                                <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center">
                                                    <Check className="h-4 w-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <Button onClick={handleUpgrade} size="lg" className="px-12">
                                    <Crown className="h-5 w-5 mr-2" />
                                    Nâng cấp ngay
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                                <p className="text-sm text-gray-600 mt-4">
                                    Hủy bất cứ lúc nào • Hoàn tiền trong 7 ngày
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Feature Comparison */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                So sánh tính năng
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-4 px-4">Tính năng</th>
                                            <th className="text-center py-4 px-4">Miễn phí</th>
                                            <th className="text-center py-4 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Crown className="h-5 w-5 text-orange-500" />
                                                    Premium
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {features.map((feature, index) => {
                                            const Icon = feature.icon;
                                            return (
                                                <tr key={index} className="border-b hover:bg-gray-50">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-start gap-3">
                                                            <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
                                                            <div>
                                                                <p className="font-medium text-gray-900">{feature.title}</p>
                                                                <p className="text-sm text-gray-600">{feature.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        {typeof feature.free === 'boolean' ? (
                                                            feature.free ? (
                                                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                                                            )
                                                        ) : (
                                                            <span className="text-sm text-gray-600">{feature.free}</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        {typeof feature.premium === 'boolean' ? (
                                                            feature.premium ? (
                                                                <Check className="h-5 w-5 text-orange-500 mx-auto" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                                                            )
                                                        ) : (
                                                            <span className="text-sm font-medium text-orange-600">{feature.premium}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>

                    {/* Testimonials */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                            Ứng viên nói gì về Premium
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index}>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">{testimonial.avatar}</div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                                <p className="text-sm text-gray-600">{testimonial.position}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 mb-3">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 text-sm italic">"{testimonial.content}"</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                Câu hỏi thường gặp
                            </h2>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        question: 'Tôi có thể hủy bất cứ lúc nào không?',
                                        answer: 'Có, bạn có thể hủy gói Premium bất cứ lúc nào. Bạn vẫn có thể sử dụng Premium đến hết chu kỳ thanh toán hiện tại.'
                                    },
                                    {
                                        question: 'Có được hoàn tiền không?',
                                        answer: 'Chúng tôi cung cấp chính sách hoàn tiền trong 7 ngày đầu tiên nếu bạn không hài lòng với dịch vụ.'
                                    },
                                    {
                                        question: 'Tôi có thể chuyển đổi gói đăng ký không?',
                                        answer: 'Có, bạn có thể nâng cấp hoặc hạ cấp gói đăng ký bất cứ lúc nào. Số tiền sẽ được tính theo tỷ lệ.'
                                    },
                                    {
                                        question: 'Premium có giúp tôi tìm được việc nhanh hơn không?',
                                        answer: 'Theo thống kê của chúng tôi, ứng viên Premium có cơ hội được tuyển dụng cao hơn 300% và nhận được lời mời phỏng vấn nhiều hơn 5 lần so với tài khoản thường.'
                                    }
                                ].map((faq, index) => (
                                    <div key={index} className="border-b pb-6 last:border-0">
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Final CTA */}
                    <Card className="bg-gradient-to-r from-orange-500 to-yellow-500">
                        <div className="p-12 text-center text-white">
                            <Crown className="h-16 w-16 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold mb-4">
                                Sẵn sàng nâng tầm sự nghiệp?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Tham gia cùng hàng nghìn ứng viên Premium thành công
                            </p>
                            <Button
                                onClick={handleUpgrade}
                                size="lg"
                                className="bg-white text-orange-600 hover:bg-gray-100 px-12"
                            >
                                Bắt đầu ngay hôm nay
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};

export default CandidatePremiumPage;
