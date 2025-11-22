import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
    const { user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        subject: '',
        message: '',
        category: 'general'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // In real app, this would send to backend/email service
        console.log('Contact form submitted:', formData);
        
        setSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                ...formData,
                subject: '',
                message: '',
                category: 'general'
            });
        }, 3000);
    };

    const categories = [
        { value: 'general', label: 'Câu hỏi chung' },
        { value: 'technical', label: 'Hỗ trợ kỹ thuật' },
        { value: 'billing', label: 'Thanh toán & Gói dịch vụ' },
        { value: 'report', label: 'Báo cáo vi phạm' },
        { value: 'feedback', label: 'Góp ý cải thiện' }
    ];

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card padding="lg">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Gửi thành công!
                        </h2>
                        <p className="text-gray-600">
                            Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Liên hệ hỗ trợ
                </h1>
                <p className="text-gray-600">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn. Vui lòng điền form bên dưới.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                    <Card padding="lg">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Email</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    support@jobportal.vn
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Phone className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Hotline</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    1900 1234
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    8:00 - 18:00 (T2-T6)
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Live Chat</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Trò chuyện trực tiếp
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-2">
                    <Card padding="lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Họ và tên"
                                    icon={<Mail className="w-5 h-5" />}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    icon={<Mail className="w-5 h-5" />}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Số điện thoại"
                                    icon={<Phone className="w-5 h-5" />}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Danh mục
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <Input
                                label="Tiêu đề"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Nhập tiêu đề..."
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nội dung
                                </label>
                                <textarea
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Mô tả chi tiết vấn đề của bạn..."
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                <Send className="w-5 h-5 mr-2" />
                                Gửi tin nhắn
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>

            {/* FAQ Section */}
            <Card padding="lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Câu hỏi thường gặp
                </h2>
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                            Làm thế nào để ứng tuyển vào một công việc?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Bạn chỉ cần đăng nhập, tìm công việc phù hợp và nhấn nút "Ứng tuyển ngay". 
                            Hệ thống sẽ tự động gửi hồ sơ của bạn đến nhà tuyển dụng.
                        </p>
                    </div>
                    <div className="border-b pb-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                            Tôi có thể đăng bao nhiêu tin tuyển dụng?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Số lượng tin tuyển dụng phụ thuộc vào gói dịch vụ bạn đang sử dụng. 
                            Gói Basic: 3 tin, Pro: 20 tin, Enterprise: không giới hạn.
                        </p>
                    </div>
                    <div className="border-b pb-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                            Làm sao để nâng cấp tài khoản Premium?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Vào mục "Gói Premium" trong menu và chọn gói phù hợp với nhu cầu của bạn.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ContactPage;
