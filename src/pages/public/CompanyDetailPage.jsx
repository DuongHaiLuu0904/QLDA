import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    MapPin, Users, Building2, Globe, Mail, Phone, CheckCircle,
    Briefcase, ArrowLeft, ExternalLink, Facebook, Twitter, Linkedin,
    Calendar, TrendingUp, Star, ThumbsUp
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { mockCompanies } from '../../services/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const CompanyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { jobs } = useData();
    const [isFollowing, setIsFollowing] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem(`company_reviews_${id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [newReview, setNewReview] = useState({
        rating: 5,
        title: '',
        pros: '',
        cons: '',
        position: '',
        employmentStatus: 'current'
    });

    const company = mockCompanies.find(c => c.id === parseInt(id));
    const companyJobs = jobs.filter(j => j.employerId === parseInt(id));
    const activeJobs = companyJobs.filter(j => j.status === 'active');

    if (!company) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Không tìm thấy công ty
                    </h2>
                    <Link to="/companies">
                        <Button>Quay lại danh sách</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleFollow = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setIsFollowing(!isFollowing);
    };

    const submitReview = () => {
        if (!user) {
            alert('Vui lòng đăng nhập để đánh giá');
            return;
        }

        if (!newReview.title || !newReview.pros) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const review = {
            id: Date.now(),
            companyId: parseInt(id),
            userId: user.id,
            userName: user.name,
            ...newReview,
            createdAt: new Date().toISOString(),
            helpful: 0
        };

        const updated = [review, ...reviews];
        setReviews(updated);
        localStorage.setItem(`company_reviews_${id}`, JSON.stringify(updated));
        
        setShowReviewModal(false);
        setNewReview({
            rating: 5,
            title: '',
            pros: '',
            cons: '',
            position: '',
            employmentStatus: 'current'
        });
        alert('Cảm ơn bạn đã đánh giá!');
    };

    const markHelpful = (reviewId) => {
        const updated = reviews.map(r => 
            r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
        );
        setReviews(updated);
        localStorage.setItem(`company_reviews_${id}`, JSON.stringify(updated));
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div
                className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600"
                style={company.banner ? {
                    backgroundImage: `url(${company.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                } : {}}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="-mt-8 mb-4">
                    <Link to="/companies" className="inline-flex items-center text-white hover:text-gray-200">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Quay lại danh sách
                    </Link>
                </div>

                {/* Company Header */}
                <Card padding="lg" className="-mt-20 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-lg"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {company.name}
                                </h1>
                                {company.isVerified && (
                                    <CheckCircle className="w-7 h-7 text-blue-500" title="Đã xác thực" />
                                )}
                                {company.tier === 'enterprise' && (
                                    <Badge variant="warning" size="lg">⭐ Premium</Badge>
                                )}
                            </div>
                            <p className="text-gray-600 mb-4">{company.industry}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    {company.companySize}+ nhân viên
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {company.address}
                                </div>
                                <div className="flex items-center">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    {activeJobs.length} việc làm đang tuyển
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button
                                variant={isFollowing ? "outline" : "primary"}
                                size="lg"
                                onClick={handleFollow}
                            >
                                {isFollowing ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Đang theo dõi
                                    </>
                                ) : (
                                    <>
                                        <Building2 className="w-5 h-5 mr-2" />
                                        Theo dõi
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="grid lg:grid-cols-3 gap-8 pb-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Giới thiệu công ty
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {company.description || `${company.name} là một trong những công ty hàng đầu trong lĩnh vực ${company.industry}. Chúng tôi cam kết mang đến môi trường làm việc chuyên nghiệp, năng động và nhiều cơ hội phát triển cho nhân viên.

Với đội ngũ hơn ${company.companySize} nhân viên tài năng, chúng tôi luôn tìm kiếm những ứng viên xuất sắc để cùng phát triển và đóng góp vào sự thành công của công ty.

Hãy tham gia cùng chúng tôi để xây dựng tương lai tươi sáng!`}
                            </p>
                        </Card>

                        {/* Jobs */}
                        <Card padding="lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Vị trí đang tuyển ({activeJobs.length})
                                </h2>
                            </div>
                            
                            {activeJobs.length === 0 ? (
                                <div className="text-center py-12">
                                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Chưa có vị trí tuyển dụng
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Công ty hiện không có vị trí tuyển dụng nào
                                    </p>
                                    <Button onClick={handleFollow}>
                                        Theo dõi để nhận thông báo
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activeJobs.map(job => (
                                        <div
                                            key={job.id}
                                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                                        >
                                            <Link to={`/jobs/${job.id}`}>
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-1">
                                                            {job.title}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                            <div className="flex items-center">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                {job.location}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                                {job.salary.negotiable ? 'Thỏa thuận' :
                                                                    `${(job.salary.min / 1000000).toFixed(0)}-${(job.salary.max / 1000000).toFixed(0)} triệu`}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                {new Date(job.postedDate).toLocaleDateString('vi-VN')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {job.featured && (
                                                        <Badge variant="warning">⭐ Nổi bật</Badge>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="primary">{job.level}</Badge>
                                                    <Badge variant="success">{job.workType}</Badge>
                                                    {job.urgent && <Badge variant="danger">🔥 Gấp</Badge>}
                                                    {job.skills.slice(0, 3).map((skill, idx) => (
                                                        <Badge key={idx} variant="default">{skill}</Badge>
                                                    ))}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Contact Info */}
                            <Card padding="lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Thông tin liên hệ
                                </h3>
                                <div className="space-y-3">
                                    {company.website && (
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-gray-700 hover:text-blue-600"
                                        >
                                            <Globe className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="flex-1">Website</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                    {company.email && (
                                        <a
                                            href={`mailto:${company.email}`}
                                            className="flex items-center text-gray-700 hover:text-blue-600"
                                        >
                                            <Mail className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="flex-1 truncate">{company.email}</span>
                                        </a>
                                    )}
                                    {company.phone && (
                                        <a
                                            href={`tel:${company.phone}`}
                                            className="flex items-center text-gray-700 hover:text-blue-600"
                                        >
                                            <Phone className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="flex-1">{company.phone}</span>
                                        </a>
                                    )}
                                    <div className="flex items-center text-gray-700">
                                        <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                                        <span className="flex-1">{company.address}</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Social Media */}
                            {(company.socialMedia?.facebook || company.socialMedia?.linkedin || company.socialMedia?.twitter) && (
                                <Card padding="lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Mạng xã hội
                                    </h3>
                                    <div className="flex gap-3">
                                        {company.socialMedia?.facebook && (
                                            <a
                                                href={company.socialMedia.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                            >
                                                <Facebook className="w-5 h-5" />
                                            </a>
                                        )}
                                        {company.socialMedia?.linkedin && (
                                            <a
                                                href={company.socialMedia.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {company.socialMedia?.twitter && (
                                            <a
                                                href={company.socialMedia.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* Company Stats */}
                            <Card padding="lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Thống kê
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Số lượng nhân viên</span>
                                        <span className="font-semibold text-gray-900">{company.companySize}+</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Việc làm đang tuyển</span>
                                        <span className="font-semibold text-gray-900">{activeJobs.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Trạng thái</span>
                                        {company.isVerified ? (
                                            <Badge variant="success">Đã xác thực</Badge>
                                        ) : (
                                            <Badge variant="default">Chưa xác thực</Badge>
                                        )}
                                    </div>
                                    {company.tier && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Gói dịch vụ</span>
                                            <Badge variant={
                                                company.tier === 'enterprise' ? 'warning' :
                                                company.tier === 'pro' ? 'primary' : 'default'
                                            }>
                                                {company.tier === 'enterprise' ? 'Enterprise' :
                                                 company.tier === 'pro' ? 'Pro' : 'Basic'}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Company Reviews Section */}
                <Card padding="lg" className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Đánh giá từ nhân viên
                            </h2>
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        <Star className="w-6 h-6 text-yellow-500 fill-current" />
                                        <span className="ml-1 text-2xl font-bold text-gray-900">{averageRating}</span>
                                        <span className="ml-2 text-gray-600">({reviews.length} đánh giá)</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => setShowReviewModal(true)}>
                            <Star className="w-4 h-4 mr-2" />
                            Viết đánh giá
                        </Button>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Star className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                            <p>Chưa có đánh giá nào</p>
                            <p className="text-sm mt-2">Hãy là người đầu tiên đánh giá công ty này!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map(review => (
                                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${
                                                                star <= review.rating
                                                                    ? 'text-yellow-500 fill-current'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="font-semibold text-gray-900">{review.title}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {review.userName} • {review.position} • {review.employmentStatus === 'current' ? 'Đang làm việc' : 'Đã nghỉ việc'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {review.pros && (
                                            <div>
                                                <p className="text-sm font-semibold text-green-700 mb-1">✓ Ưu điểm:</p>
                                                <p className="text-gray-700">{review.pros}</p>
                                            </div>
                                        )}
                                        {review.cons && (
                                            <div>
                                                <p className="text-sm font-semibold text-red-700 mb-1">✗ Nhược điểm:</p>
                                                <p className="text-gray-700">{review.cons}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex items-center gap-4">
                                        <button
                                            onClick={() => markHelpful(review.id)}
                                            className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                                        >
                                            <ThumbsUp className="w-4 h-4 mr-1" />
                                            Hữu ích ({review.helpful})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Review Modal */}
                <Modal
                    isOpen={showReviewModal}
                    onClose={() => setShowReviewModal(false)}
                    title="Viết đánh giá công ty"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đánh giá tổng quan
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${
                                                star <= newReview.rating
                                                    ? 'text-yellow-500 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Tiêu đề đánh giá"
                            value={newReview.title}
                            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                            placeholder="VD: Môi trường làm việc tuyệt vời"
                        />

                        <Input
                            label="Vị trí công việc"
                            value={newReview.position}
                            onChange={(e) => setNewReview({ ...newReview, position: e.target.value })}
                            placeholder="VD: Frontend Developer"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tình trạng
                            </label>
                            <select
                                value={newReview.employmentStatus}
                                onChange={(e) => setNewReview({ ...newReview, employmentStatus: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="current">Đang làm việc</option>
                                <option value="former">Đã nghỉ việc</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ưu điểm
                            </label>
                            <textarea
                                value={newReview.pros}
                                onChange={(e) => setNewReview({ ...newReview, pros: e.target.value })}
                                placeholder="Những điều bạn thích khi làm việc tại đây..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows="3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nhược điểm (tùy chọn)
                            </label>
                            <textarea
                                value={newReview.cons}
                                onChange={(e) => setNewReview({ ...newReview, cons: e.target.value })}
                                placeholder="Những điều cần cải thiện..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                rows="3"
                            />
                        </div>

                        <div className="flex gap-2 justify-end pt-4">
                            <Button variant="outline" onClick={() => setShowReviewModal(false)}>
                                Hủy
                            </Button>
                            <Button onClick={submitReview}>
                                Gửi đánh giá
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default CompanyDetailPage;
