import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    MapPin, DollarSign, Clock, Users, Briefcase, Calendar,
    Building2, Share2, Bookmark, BookmarkCheck, Send, ArrowLeft,
    CheckCircle, Flag, AlertTriangle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const JobDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { jobs, savedJobs, toggleSaveJob, applyJob } = useData();
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [applySuccess, setApplySuccess] = useState(false);
    const [reportData, setReportData] = useState({
        reason: '',
        description: ''
    });

    const job = jobs.find(j => j.id === parseInt(id));
    const isSaved = savedJobs.some(s => s.jobId === parseInt(id) && s.candidateId === user?.id);

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Không tìm thấy công việc
                    </h2>
                    <Link to="/jobs">
                        <Button>Quay lại danh sách</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleSaveJob = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        toggleSaveJob(job.id, user.id);
    };

    const handleApply = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'candidate') {
            alert('Chỉ ứng viên mới có thể ứng tuyển');
            return;
        }
        setShowApplyModal(true);
    };

    const submitApplication = () => {
        if (!user || user.role !== 'candidate') {
            alert('Chỉ ứng viên mới có thể ứng tuyển');
            return;
        }
        applyJob({
            jobId: job.id,
            candidateId: user.id,
            coverLetter
        });
        setShowApplyModal(false);
        setApplySuccess(true);
        setTimeout(() => setApplySuccess(false), 3000);
    };

    const handleReport = () => {
        setShowReportModal(true);
    };

    const submitReport = () => {
        if (!reportData.reason) {
            alert('Vui lòng chọn lý do báo cáo');
            return;
        }
        // In real app, would send to backend
        console.log('Report submitted:', { jobId: job.id, ...reportData });
        alert('Báo cáo của bạn đã được gửi. Chúng tôi sẽ xem xét trong 24h.');
        setShowReportModal(false);
        setReportData({ reason: '', description: '' });
    };

    const relatedJobs = jobs
        .filter(j => j.id !== job.id && (j.category === job.category || j.location === job.location))
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link to="/jobs" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Quay lại danh sách
                </Link>

                {/* Success Message */}
                {applySuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Ứng tuyển thành công! Nhà tuyển dụng sẽ liên hệ với bạn sớm.
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header */}
                        <Card padding="lg">
                            <div className="flex items-start gap-4 mb-6">
                                <img
                                    src={job.employerLogo}
                                    alt={job.employerName}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {job.title}
                                    </h1>
                                    <Link
                                        to={`/companies/${job.employerId}`}
                                        className="text-lg text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        {job.employerName}
                                    </Link>
                                </div>
                                {job.featured && (
                                    <Badge variant="warning" size="lg">
                                        ⭐ Nổi bật
                                    </Badge>
                                )}
                            </div>

                            {/* Key Info Grid */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center text-gray-700">
                                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Địa điểm</p>
                                        <p className="font-medium">{job.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mức lương</p>
                                        <p className="font-medium">
                                            {job.salary.negotiable ? 'Thỏa thuận' :
                                                `${(job.salary.min / 1000000).toFixed(0)}-${(job.salary.max / 1000000).toFixed(0)} triệu VND`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Cấp bậc</p>
                                        <p className="font-medium">{job.level}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Users className="w-5 h-5 mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Số lượng</p>
                                        <p className="font-medium">{job.positions} người</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Hạn nộp</p>
                                        <p className="font-medium">
                                            {new Date(job.deadline).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock className="w-5 h-5 mr-3 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Hình thức</p>
                                        <p className="font-medium">{job.workType}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="primary">{job.category}</Badge>
                                <Badge variant="success">{job.workType}</Badge>
                                {job.urgent && <Badge variant="danger">🔥 Tuyển gấp</Badge>}
                            </div>
                        </Card>

                        {/* Job Description */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Mô tả công việc
                            </h2>
                            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                {job.description}
                            </div>
                        </Card>

                        {/* Requirements */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Yêu cầu ứng viên
                            </h2>
                            <ul className="space-y-2">
                                {job.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Skills */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Kỹ năng cần thiết
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                    <Badge key={index} variant="default" size="lg">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </Card>

                        {/* Benefits */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Quyền lợi
                            </h2>
                            <ul className="space-y-2">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Action Buttons */}
                            <Card padding="lg">
                                <div className="space-y-3">
                                    <Button
                                        size="lg"
                                        className="w-full"
                                        onClick={handleApply}
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Ứng tuyển ngay
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full"
                                        onClick={handleSaveJob}
                                    >
                                        {isSaved ? (
                                            <>
                                                <BookmarkCheck className="w-5 h-5 mr-2" />
                                                Đã lưu
                                            </>
                                        ) : (
                                            <>
                                                <Bookmark className="w-5 h-5 mr-2" />
                                                Lưu tin
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="w-full"
                                    >
                                        <Share2 className="w-5 h-5 mr-2" />
                                        Chia sẻ
                                    </Button>
                                    <button
                                        onClick={handleReport}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Flag className="w-4 h-4" />
                                        Báo cáo tin vi phạm
                                    </button>
                                </div>
                            </Card>

                            {/* Company Info */}
                            <Card padding="lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Về công ty
                                </h3>
                                <div className="text-center mb-4">
                                    <img
                                        src={job.employerLogo}
                                        alt={job.employerName}
                                        className="w-24 h-24 rounded-lg mx-auto mb-3 object-cover"
                                    />
                                    <h4 className="font-semibold text-gray-900">
                                        {job.employerName}
                                    </h4>
                                </div>
                                <Link to={`/companies/${job.employerId}`}>
                                    <Button variant="outline" className="w-full">
                                        <Building2 className="w-5 h-5 mr-2" />
                                        Xem trang công ty
                                    </Button>
                                </Link>
                            </Card>

                            {/* Related Jobs */}
                            {relatedJobs.length > 0 && (
                                <Card padding="lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Việc làm liên quan
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedJobs.map(relJob => (
                                            <Link
                                                key={relJob.id}
                                                to={`/jobs/${relJob.id}`}
                                                className="block group"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <img
                                                        src={relJob.employerLogo}
                                                        alt={relJob.employerName}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                            {relJob.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 truncate">
                                                            {relJob.employerName}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {relJob.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            <Modal
                isOpen={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                title="Ứng tuyển công việc"
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                        <p className="text-gray-600">{job.employerName}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thư giới thiệu (không bắt buộc)
                        </label>
                        <textarea
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Viết vài dòng giới thiệu về bản thân và lý do bạn phù hợp với vị trí này..."
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowApplyModal(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={submitApplication}
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Gửi hồ sơ
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Report Modal */}
            <Modal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                title="Báo cáo tin vi phạm"
            >
                <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div className="text-sm text-yellow-800">
                                <p className="font-medium mb-1">Lưu ý quan trọng</p>
                                <p>Báo cáo sai sự thật có thể dẫn đến khóa tài khoản. Vui lòng chỉ báo cáo những tin tuyển dụng thực sự vi phạm.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do báo cáo <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={reportData.reason}
                            onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">-- Chọn lý do --</option>
                            <option value="fake">Tin tuyển dụng giả mạo</option>
                            <option value="scam">Lừa đảo / Thu phí bất hợp lý</option>
                            <option value="inappropriate">Nội dung không phù hợp</option>
                            <option value="duplicate">Tin trùng lặp</option>
                            <option value="expired">Tin đã hết hạn nhưng vẫn hiển thị</option>
                            <option value="wrong_info">Thông tin sai lệch</option>
                            <option value="other">Lý do khác</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả chi tiết
                        </label>
                        <textarea
                            rows={4}
                            value={reportData.description}
                            onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Vui lòng mô tả cụ thể vấn đề bạn gặp phải..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => setShowReportModal(false)}
                            className="flex-1"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={submitReport}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                            <Flag className="w-4 h-4 mr-2" />
                            Gửi báo cáo
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default JobDetailPage;
