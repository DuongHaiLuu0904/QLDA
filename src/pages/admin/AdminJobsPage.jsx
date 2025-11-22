import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import {
    Briefcase, Search, Eye, CheckCircle, XCircle,
    Clock, Trash2, Filter, Calendar, DollarSign,
    MapPin, TrendingUp, AlertCircle
} from 'lucide-react';

const AdminJobsPage = () => {
    const { jobs, approveJob, rejectJob, toggleJobStatus, deleteJob } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterApproval, setFilterApproval] = useState('all');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Filter jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchSearch =
                job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.employerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchStatus = filterStatus === 'all' || job.status === filterStatus;
            const matchApproval = filterApproval === 'all' || job.approvalStatus === filterApproval;

            return matchSearch && matchStatus && matchApproval;
        });
    }, [jobs, searchTerm, filterStatus, filterApproval]);

    // Stats
    const stats = useMemo(() => ({
        total: jobs.length,
        active: jobs.filter(j => j.status === 'active').length,
        pending: jobs.filter(j => j.approvalStatus === 'pending').length,
        approved: jobs.filter(j => j.approvalStatus === 'approved').length,
        rejected: jobs.filter(j => j.approvalStatus === 'rejected').length,
        totalViews: jobs.reduce((sum, j) => sum + (j.views || 0), 0)
    }), [jobs]);

    const handleApproveJob = (jobId) => {
        if (confirm('Phê duyệt tin tuyển dụng này?')) {
            approveJob(jobId);
        }
    };

    const handleRejectJob = (jobId) => {
        const reason = prompt('Lý do từ chối:');
        if (reason) {
            rejectJob(jobId, reason);
        }
    };

    const handleDeleteJob = (jobId) => {
        if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
            deleteJob(jobId);
        }
    };

    const handleToggleStatus = (jobId) => {
        toggleJobStatus(jobId);
    };

    const viewJobDetail = (job) => {
        setSelectedJob(job);
        setShowDetailModal(true);
    };

    const getStatusBadge = (status) => {
        const variants = {
            active: 'success',
            closed: 'danger',
            draft: 'warning'
        };
        const labels = {
            active: 'Đang tuyển',
            closed: 'Đã đóng',
            draft: 'Nháp'
        };
        return <Badge variant={variants[status]}>{labels[status]}</Badge>;
    };

    const getApprovalBadge = (status) => {
        const variants = {
            pending: 'warning',
            approved: 'success',
            rejected: 'danger'
        };
        const labels = {
            pending: 'Chờ duyệt',
            approved: 'Đã duyệt',
            rejected: 'Từ chối'
        };
        return <Badge variant={variants[status]}>{labels[status]}</Badge>;
    };

    const columns = [
        {
            header: 'Tin tuyển dụng',
            accessor: 'job',
            render: (job) => (
                <div className="flex items-start gap-3">
                    <img
                        src={job.employerLogo || 'https://via.placeholder.com/50'}
                        alt={job.employerName}
                        className="w-12 h-12 rounded object-cover"
                    />
                    <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.employerName}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{job.level}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Lương',
            accessor: 'salary',
            render: (job) => (
                <div className="text-sm">
                    {job.salary?.negotiable ? (
                        <span className="text-gray-600">Thỏa thuận</span>
                    ) : (
                        <span className="font-medium text-gray-900">
                            {new Intl.NumberFormat('vi-VN').format(job.salary?.min)} - {new Intl.NumberFormat('vi-VN').format(job.salary?.max)}đ
                        </span>
                    )}
                </div>
            )
        },
        {
            header: 'Trạng thái',
            accessor: 'status',
            render: (job) => (
                <div className="space-y-1">
                    {getStatusBadge(job.status)}
                    {getApprovalBadge(job.approvalStatus)}
                    {job.featured && (
                        <Badge variant="warning" className="ml-1">Nổi bật</Badge>
                    )}
                </div>
            )
        },
        {
            header: 'Thống kê',
            accessor: 'stats',
            render: (job) => (
                <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1 text-gray-600">
                        <Eye className="h-4 w-4" />
                        <span>{job.views || 0} lượt xem</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.applications || 0} ứng tuyển</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Ngày đăng',
            accessor: 'postedDate',
            render: (job) => (
                <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(job.postedDate).toLocaleDateString('vi-VN')}
                    </div>
                </div>
            )
        },
        {
            header: 'Hành động',
            accessor: 'actions',
            render: (job) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewJobDetail(job)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    {job.approvalStatus === 'pending' && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveJob(job.id)}
                                className="text-green-600"
                            >
                                <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectJob(job.id)}
                                className="text-red-600"
                            >
                                <XCircle className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(job.id)}
                        className={job.status === 'active' ? 'text-orange-600' : 'text-green-600'}
                    >
                        {job.status === 'active' ? (
                            <XCircle className="h-4 w-4" />
                        ) : (
                            <CheckCircle className="h-4 w-4" />
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý tin tuyển dụng</h1>
                <p className="text-gray-600">Duyệt và quản lý tất cả tin tuyển dụng trong hệ thống</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Tổng tin', value: stats.total, icon: Briefcase, color: 'blue' },
                    { label: 'Đang tuyển', value: stats.active, icon: CheckCircle, color: 'green' },
                    { label: 'Chờ duyệt', value: stats.pending, icon: Clock, color: 'yellow' },
                    { label: 'Đã duyệt', value: stats.approved, icon: CheckCircle, color: 'cyan' },
                    { label: 'Từ chối', value: stats.rejected, icon: XCircle, color: 'red' },
                    { label: 'Tổng lượt xem', value: stats.totalViews, icon: TrendingUp, color: 'purple' }
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <div className="p-4">
                                <div className={`inline-flex items-center justify-center w-10 h-10 bg-${stat.color}-100 rounded-lg mb-3`}>
                                    <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tin tuyển dụng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang tuyển</option>
                                <option value="closed">Đã đóng</option>
                                <option value="draft">Nháp</option>
                            </select>
                        </div>

                        <div>
                            <select
                                value={filterApproval}
                                onChange={(e) => setFilterApproval(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả duyệt</option>
                                <option value="pending">Chờ duyệt</option>
                                <option value="approved">Đã duyệt</option>
                                <option value="rejected">Từ chối</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Jobs Table */}
            <Card>
                <div className="p-6">
                    <Table
                        columns={columns}
                        data={filteredJobs}
                        emptyMessage="Không tìm thấy tin tuyển dụng nào"
                    />
                </div>
            </Card>

            {/* Job Detail Modal */}
            {showDetailModal && selectedJob && (
                <Modal
                    isOpen={showDetailModal}
                    onClose={() => {
                        setShowDetailModal(false);
                        setSelectedJob(null);
                    }}
                    title="Chi tiết tin tuyển dụng"
                >
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b">
                            <img
                                src={selectedJob.employerLogo || 'https://via.placeholder.com/80'}
                                alt={selectedJob.employerName}
                                className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{selectedJob.title}</h3>
                                <p className="text-gray-600">{selectedJob.employerName}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    {getStatusBadge(selectedJob.status)}
                                    {getApprovalBadge(selectedJob.approvalStatus)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Vị trí</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {selectedJob.location}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Cấp bậc</p>
                                <p className="font-medium text-gray-900">{selectedJob.level}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Lương</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {selectedJob.salary?.negotiable ? 'Thỏa thuận' :
                                        `${new Intl.NumberFormat('vi-VN').format(selectedJob.salary?.min)} - ${new Intl.NumberFormat('vi-VN').format(selectedJob.salary?.max)}đ`
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Số lượng tuyển</p>
                                <p className="font-medium text-gray-900">{selectedJob.slots} người</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Mô tả công việc</p>
                            <div
                                className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg"
                                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                            />
                        </div>

                        {selectedJob.skills && selectedJob.skills.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Kỹ năng yêu cầu</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedJob.skills.map((skill, index) => (
                                        <Badge key={index} variant="info">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <p className="text-sm text-gray-600">Lượt xem</p>
                                <p className="text-lg font-semibold text-gray-900">{selectedJob.views || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Ứng tuyển</p>
                                <p className="text-lg font-semibold text-gray-900">{selectedJob.applications || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Ngày đăng</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {new Date(selectedJob.postedDate).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Hạn nộp</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {new Date(selectedJob.expiryDate).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>

                        {selectedJob.approvalStatus === 'rejected' && selectedJob.rejectionReason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-red-900">Lý do từ chối</p>
                                        <p className="text-sm text-red-700 mt-1">{selectedJob.rejectionReason}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4">
                            {selectedJob.approvalStatus === 'pending' && (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            handleRejectJob(selectedJob.id);
                                            setShowDetailModal(false);
                                        }}
                                        className="text-red-600"
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Từ chối
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleApproveJob(selectedJob.id);
                                            setShowDetailModal(false);
                                        }}
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Phê duyệt
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminJobsPage;
