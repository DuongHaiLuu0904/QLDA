import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { Plus, Eye, Edit, Trash2, MoreVertical, Calendar, Clock } from 'lucide-react';

const EmployerJobsPage = () => {
    const { user } = useAuth();
    const { jobs, deleteJob, updateJob } = useData();
    const [statusFilter, setStatusFilter] = useState('all');
    const [extendModal, setExtendModal] = useState({ isOpen: false, job: null, days: 30 });

    const myJobs = jobs.filter(j => j.employerId === user?.id);

    const filteredJobs = statusFilter === 'all'
        ? myJobs
        : myJobs.filter(j => j.status === statusFilter);

    const handleDelete = (jobId) => {
        if (window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')) {
            deleteJob(jobId);
        }
    };

    const handleExtend = (job) => {
        setExtendModal({ isOpen: true, job, days: 30 });
    };

    const confirmExtend = () => {
        if (extendModal.job) {
            const currentExpiry = new Date(extendModal.job.expiryDate);
            const newExpiry = new Date(currentExpiry.getTime() + extendModal.days * 24 * 60 * 60 * 1000);
            
            updateJob(extendModal.job.id, {
                ...extendModal.job,
                expiryDate: newExpiry.toISOString(),
                status: 'active'
            });
            
            setExtendModal({ isOpen: false, job: null, days: 30 });
            alert(`Đã gia hạn tin tuyển dụng thêm ${extendModal.days} ngày!`);
        }
    };

    const getDaysRemaining = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const statusColors = {
        active: 'success',
        inactive: 'default',
        expired: 'danger',
        draft: 'warning'
    };

    const statusLabels = {
        active: 'Đang hoạt động',
        inactive: 'Tạm dừng',
        expired: 'Hết hạn',
        draft: 'Nháp'
    };

    const columns = [
        {
            header: 'Tiêu đề',
            accessor: 'title',
            cell: (title, row) => (
                <div>
                    <Link
                        to={`/employer/jobs/${row.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                    >
                        {title}
                    </Link>
                    <div className="flex gap-2 mt-1">
                        <Badge variant="primary" size="sm">{row.level}</Badge>
                        <Badge variant="default" size="sm">{row.workType}</Badge>
                    </div>
                </div>
            )
        },
        {
            header: 'Lượt xem',
            accessor: 'views',
            cell: (views) => (
                <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="font-medium">{views}</span>
                </div>
            )
        },
        {
            header: 'Ứng viên',
            accessor: 'id',
            cell: (jobId) => {
                const { applications } = useData();
                const count = applications.filter(a => a.jobId === jobId).length;
                return (
                    <Link
                        to={`/employer/jobs/${jobId}/applicants`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {count} ứng viên
                    </Link>
                );
            }
        },
        {
            header: 'Ngày đăng',
            accessor: 'postedDate',
            cell: (date) => new Date(date).toLocaleDateString('vi-VN')
        },
        {
            header: 'Hạn nộp',
            accessor: 'expiryDate',
            cell: (date, row) => {
                const daysRemaining = getDaysRemaining(date);
                return (
                    <div>
                        <div className="text-sm text-gray-900">
                            {new Date(date).toLocaleDateString('vi-VN')}
                        </div>
                        <div className={`text-xs ${daysRemaining < 7 ? 'text-red-600' : 'text-gray-500'}`}>
                            {daysRemaining > 0 ? `Còn ${daysRemaining} ngày` : 'Đã hết hạn'}
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Trạng thái',
            accessor: 'status',
            cell: (status) => (
                <Badge variant={statusColors[status]}>
                    {statusLabels[status]}
                </Badge>
            )
        },
        {
            header: '',
            accessor: 'id',
            cell: (jobId, row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleExtend(row)}
                        className="p-2 text-green-600 hover:text-green-700"
                        title="Gia hạn tin"
                    >
                        <Clock className="w-5 h-5" />
                    </button>
                    <Link to={`/employer/jobs/${jobId}/edit`}>
                        <button className="p-2 text-blue-600 hover:text-blue-700" title="Chỉnh sửa">
                            <Edit className="w-5 h-5" />
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(jobId)}
                        className="p-2 text-red-600 hover:text-red-700"
                        title="Xóa"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ];

    const stats = [
        {
            label: 'Tổng tin',
            value: myJobs.length,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Đang hoạt động',
            value: myJobs.filter(j => j.status === 'active').length,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'Tạm dừng',
            value: myJobs.filter(j => j.status === 'inactive').length,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50'
        },
        {
            label: 'Nháp',
            value: myJobs.filter(j => j.status === 'draft').length,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Quản lý tin tuyển dụng
                    </h1>
                    <p className="text-gray-600">
                        Quản lý và theo dõi các tin tuyển dụng của bạn
                    </p>
                </div>
                <Link to="/employer/jobs/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Đăng tin mới
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <Card key={idx} padding="md">
                        <div className="text-center">
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-2`}>
                                <span className={`text-2xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
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
                        Tất cả ({myJobs.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('active')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'active'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Đang hoạt động ({myJobs.filter(j => j.status === 'active').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('inactive')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'inactive'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Tạm dừng ({myJobs.filter(j => j.status === 'inactive').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('draft')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'draft'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Nháp ({myJobs.filter(j => j.status === 'draft').length})
                    </button>
                </div>
            </Card>

            {/* Jobs Table */}
            <Card padding="none">
                {filteredJobs.length === 0 ? (
                    <div className="p-12 text-center">
                        <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {statusFilter === 'all'
                                ? 'Chưa có tin tuyển dụng nào'
                                : `Không có tin tuyển dụng ở trạng thái "${statusLabels[statusFilter]}"`}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Bắt đầu đăng tin tuyển dụng để tìm ứng viên phù hợp
                        </p>
                        <Link to="/employer/jobs/create">
                            <Button>
                                <Plus className="w-5 h-5 mr-2" />
                                Đăng tin đầu tiên
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Table columns={columns} data={filteredJobs} />
                )}
            </Card>

            {/* Extend Modal */}
            <Modal
                isOpen={extendModal.isOpen}
                onClose={() => setExtendModal({ isOpen: false, job: null, days: 30 })}
                title="Gia hạn tin tuyển dụng"
            >
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-600 mb-2">
                            Tin tuyển dụng:{' '}
                            <span className="font-semibold text-gray-900">
                                {extendModal.job?.title}
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Ngày hết hạn hiện tại:{' '}
                            {extendModal.job?.expiryDate && new Date(extendModal.job.expiryDate).toLocaleDateString('vi-VN')}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chọn thời gian gia hạn
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[15, 30, 60].map((days) => (
                                <button
                                    key={days}
                                    onClick={() => setExtendModal({ ...extendModal, days })}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                                        extendModal.days === days
                                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="font-semibold">{days} ngày</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {days === 15 ? 'Miễn phí' : days === 30 ? '50.000đ' : '90.000đ'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {extendModal.job?.expiryDate && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-blue-700">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">Ngày hết hạn mới:</span>
                            </div>
                            <p className="text-blue-900 font-semibold mt-1">
                                {new Date(
                                    new Date(extendModal.job.expiryDate).getTime() + 
                                    extendModal.days * 24 * 60 * 60 * 1000
                                ).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <button
                            onClick={() => setExtendModal({ isOpen: false, job: null, days: 30 })}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={confirmExtend}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Clock className="w-4 h-4" />
                            Xác nhận gia hạn
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EmployerJobsPage;
