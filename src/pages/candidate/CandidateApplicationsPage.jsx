import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import { Eye, MapPin, DollarSign, Calendar, Filter } from 'lucide-react';

const CandidateApplicationsPage = () => {
    const { user } = useAuth();
    const { jobs, applications } = useData();
    const [statusFilter, setStatusFilter] = useState('all');

    const myApplications = applications
        .filter(a => a.candidateId === user?.id)
        .map(app => ({
            ...app,
            job: jobs.find(j => j.id === app.jobId)
        }))
        .filter(app => app.job); // Only show applications with valid jobs

    const filteredApplications = statusFilter === 'all'
        ? myApplications
        : myApplications.filter(a => a.status === statusFilter);

    const statusColors = {
        pending: 'warning',
        shortlisted: 'info',
        interview: 'primary',
        rejected: 'danger',
        accepted: 'success'
    };

    const statusLabels = {
        pending: 'Đang xử lý',
        shortlisted: 'Đã lọc hồ sơ',
        interview: 'Lịch phỏng vấn',
        rejected: 'Từ chối',
        accepted: 'Đã nhận'
    };

    const columns = [
        {
            header: 'Công việc',
            accessor: 'job',
            cell: (job) => (
                <div className="flex items-center gap-3">
                    <img
                        src={job.employerLogo}
                        alt={job.employerName}
                        className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                        <Link
                            to={`/jobs/${job.id}`}
                            className="font-medium text-gray-900 hover:text-blue-600"
                        >
                            {job.title}
                        </Link>
                        <p className="text-sm text-gray-600">{job.employerName}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Địa điểm',
            accessor: 'job',
            cell: (job) => (
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                </div>
            )
        },
        {
            header: 'Mức lương',
            accessor: 'job',
            cell: (job) => (
                <div className="text-sm text-gray-900">
                    {job.salary.negotiable ? 'Thỏa thuận' :
                        `${(job.salary.min / 1000000).toFixed(0)}-${(job.salary.max / 1000000).toFixed(0)}tr`}
                </div>
            )
        },
        {
            header: 'Ngày nộp',
            accessor: 'appliedDate',
            cell: (date) => (
                <div className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString('vi-VN')}
                </div>
            )
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
            accessor: 'jobId',
            cell: (jobId) => (
                <Link to={`/jobs/${jobId}`}>
                    <button className="text-blue-600 hover:text-blue-700 p-2">
                        <Eye className="w-5 h-5" />
                    </button>
                </Link>
            )
        }
    ];

    const stats = [
        {
            label: 'Tổng đơn',
            value: myApplications.length,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Đang xử lý',
            value: myApplications.filter(a => a.status === 'pending').length,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            label: 'Phỏng vấn',
            value: myApplications.filter(a => a.status === 'interview').length,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'Đã nhận',
            value: myApplications.filter(a => a.status === 'accepted').length,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Việc đã ứng tuyển
                </h1>
                <p className="text-gray-600">
                    Quản lý và theo dõi trạng thái các đơn ứng tuyển của bạn
                </p>
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
                <div className="flex items-center gap-4">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Tất cả ({myApplications.length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'pending'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Đang xử lý ({myApplications.filter(a => a.status === 'pending').length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('interview')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'interview'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Phỏng vấn ({myApplications.filter(a => a.status === 'interview').length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('accepted')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'accepted'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Đã nhận ({myApplications.filter(a => a.status === 'accepted').length})
                        </button>
                    </div>
                </div>
            </Card>

            {/* Applications Table */}
            <Card padding="none">
                {filteredApplications.length === 0 ? (
                    <div className="p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {statusFilter === 'all'
                                ? 'Chưa có đơn ứng tuyển nào'
                                : `Không có đơn ứng tuyển ở trạng thái "${statusLabels[statusFilter]}"`}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Hãy tìm kiếm và ứng tuyển vào các công việc phù hợp với bạn
                        </p>
                        <Link to="/candidate/jobs">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Tìm việc làm
                            </button>
                        </Link>
                    </div>
                ) : (
                    <Table columns={columns} data={filteredApplications} />
                )}
            </Card>
        </div>
    );
};

export default CandidateApplicationsPage;
