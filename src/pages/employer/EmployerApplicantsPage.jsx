import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { mockUsers } from '../../services/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { Eye, Mail, Phone, CheckCircle, Clock, ArrowLeft, Star } from 'lucide-react';

const EmployerApplicantsPage = () => {
    const { jobId } = useParams();
    const { user } = useAuth();
    const { jobs, applications, updateApplicationStatus } = useData();
    const [statusFilter, setStatusFilter] = useState('all');
    const [shortlistedIds, setShortlistedIds] = useState([]);

    const job = jobs.find(j => j.id === parseInt(jobId) && j.employerId === user?.id);

    if (!job) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Không tìm thấy tin tuyển dụng
                </h2>
                <Link to="/employer/jobs">
                    <Button>Quay lại danh sách</Button>
                </Link>
            </div>
        );
    }

    const jobApplications = applications
        .filter(a => a.jobId === parseInt(jobId))
        .map(app => ({
            ...app,
            candidate: mockUsers.find(u => u.id === app.candidateId)
        }))
        .filter(app => app.candidate);

    const filteredApplications = statusFilter === 'all'
        ? jobApplications
        : jobApplications.filter(a => a.status === statusFilter);

    const handleStatusChange = (applicationId, newStatus) => {
        updateApplicationStatus(applicationId, newStatus);
    };

    const toggleShortlist = (applicationId) => {
        setShortlistedIds(prev => 
            prev.includes(applicationId) 
                ? prev.filter(id => id !== applicationId)
                : [...prev, applicationId]
        );
    };

    const isShortlisted = (applicationId) => {
        return shortlistedIds.includes(applicationId);
    };

    const statusColors = {
        pending: 'warning',
        shortlisted: 'info',
        interview: 'primary',
        rejected: 'danger',
        accepted: 'success'
    };

    const statusLabels = {
        pending: 'Chờ xử lý',
        shortlisted: 'Đã lọc',
        interview: 'Phỏng vấn',
        rejected: 'Từ chối',
        accepted: 'Chấp nhận'
    };

    const columns = [
        {
            header: 'Ứng viên',
            accessor: 'candidate',
            cell: (candidate) => (
                <div className="flex items-center gap-3">
                    <img
                        src={candidate.avatar || `https://ui-avatars.com/api/?name=${candidate.name}`}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-600">{candidate.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Ngày nộp',
            accessor: 'appliedDate',
            cell: (date) => new Date(date).toLocaleDateString('vi-VN')
        },
        {
            header: 'Trạng thái',
            accessor: 'status',
            cell: (status, row) => (
                <select
                    value={status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                                status === 'interview' ? 'bg-purple-100 text-purple-800' :
                                    status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-green-100 text-green-800'
                        }`}
                >
                    <option value="pending">Chờ xử lý</option>
                    <option value="shortlisted">Đã lọc</option>
                    <option value="interview">Phỏng vấn</option>
                    <option value="accepted">Chấp nhận</option>
                    <option value="rejected">Từ chối</option>
                </select>
            )
        },
        {
            header: 'Liên hệ',
            accessor: 'candidate',
            cell: (candidate) => (
                <div className="flex gap-2">
                    <a
                        href={`mailto:${candidate.email}`}
                        className="p-2 text-blue-600 hover:text-blue-700"
                        title="Gửi email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                    <a
                        href={`tel:${candidate.phone}`}
                        className="p-2 text-green-600 hover:text-green-700"
                        title="Gọi điện"
                    >
                        <Phone className="w-5 h-5" />
                    </a>
                </div>
            )
        },
        {
            header: '',
            accessor: 'id',
            cell: (appId, row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleShortlist(appId)}
                        className={`p-2 rounded-lg transition-colors ${
                            isShortlisted(appId) 
                                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                                : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                        }`}
                        title={isShortlisted(appId) ? 'Bỏ ưu tiên' : 'Đánh dấu ưu tiên'}
                    >
                        <Star className={`w-5 h-5 ${isShortlisted(appId) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        onClick={() => alert('Xem chi tiết hồ sơ:\n' + JSON.stringify(row.candidate, null, 2))}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                        Xem hồ sơ
                    </button>
                </div>
            )
        }
    ];

    const stats = [
        {
            label: 'Tổng đơn',
            value: jobApplications.length,
            icon: Eye,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Chờ xử lý',
            value: jobApplications.filter(a => a.status === 'pending').length,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            label: 'Phỏng vấn',
            value: jobApplications.filter(a => a.status === 'interview').length,
            icon: CheckCircle,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            label: 'Chấp nhận',
            value: jobApplications.filter(a => a.status === 'accepted').length,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <Link to="/employer/jobs" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Quay lại danh sách tin
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Ứng viên: {job.title}
                </h1>
                <p className="text-gray-600">
                    Quản lý và đánh giá ứng viên cho vị trí này
                </p>
            </div>

            {/* Job Info Card */}
            <Card padding="md">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <div className="flex gap-3 mt-2 text-sm text-gray-600">
                            <span>📍 {job.location}</span>
                            <span>💼 {job.level}</span>
                            <span>👥 {job.positions} vị trí</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="success">
                            {jobApplications.length} ứng viên
                        </Badge>
                        <Badge variant="primary">
                            {job.views} lượt xem
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <Card key={idx} padding="md">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Filter */}
            <Card padding="md">
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Tất cả ({jobApplications.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('pending')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'pending'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Chờ xử lý ({jobApplications.filter(a => a.status === 'pending').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('shortlisted')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'shortlisted'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Đã lọc ({jobApplications.filter(a => a.status === 'shortlisted').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('interview')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'interview'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Phỏng vấn ({jobApplications.filter(a => a.status === 'interview').length})
                    </button>
                </div>
            </Card>

            {/* Applicants Table */}
            <Card padding="none">
                {filteredApplications.length === 0 ? (
                    <div className="p-12 text-center">
                        <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {statusFilter === 'all'
                                ? 'Chưa có ứng viên nào'
                                : `Không có ứng viên ở trạng thái "${statusLabels[statusFilter]}"`}
                        </h3>
                        <p className="text-gray-600">
                            Hãy chia sẻ tin tuyển dụng để thu hút ứng viên
                        </p>
                    </div>
                ) : (
                    <Table columns={columns} data={filteredApplications} />
                )}
            </Card>
        </div>
    );
};

export default EmployerApplicantsPage;
