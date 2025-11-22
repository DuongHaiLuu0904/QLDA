import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, BookmarkPlus, Calendar, TrendingUp, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const CandidateDashboard = () => {
    const { user } = useAuth();
    const { jobs, applications, savedJobs } = useData();

    const myApplications = applications.filter(a => a.candidateId === user?.id);
    const mySavedJobs = savedJobs.filter(s => s.candidateId === user?.id);

    const stats = [
        {
            label: 'Đơn ứng tuyển',
            value: myApplications.length,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            link: '/candidate/applications'
        },
        {
            label: 'Việc đã lưu',
            value: mySavedJobs.length,
            icon: BookmarkPlus,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            link: '/candidate/saved-jobs'
        },
        {
            label: 'Lịch phỏng vấn',
            value: myApplications.filter(a => a.status === 'interview').length,
            icon: Calendar,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            link: '/candidate/interviews'
        },
        {
            label: 'Hồ sơ đã xem',
            value: Math.floor(Math.random() * 50) + 10,
            icon: Eye,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            link: '/candidate/profile'
        }
    ];

    const recentApplications = myApplications.slice(0, 5);
    const recommendedJobs = jobs.filter(j => j.status === 'active').slice(0, 4);

    const statusColors = {
        pending: 'warning',
        shortlisted: 'info',
        interview: 'primary',
        rejected: 'danger',
        accepted: 'success'
    };

    const statusLabels = {
        pending: 'Đang xử lý',
        shortlisted: 'Đã lọc',
        interview: 'Phỏng vấn',
        rejected: 'Từ chối',
        accepted: 'Chấp nhận'
    };

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Xin chào, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                    Chào mừng bạn trở lại. Đây là tổng quan về hoạt động tìm việc của bạn.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Link key={index} to={stat.link}>
                        <Card padding="md" hover className="h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <Card title="Đơn ứng tuyển gần đây" padding="md">
                    {recentApplications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p>Bạn chưa ứng tuyển công việc nào</p>
                            <Link to="/candidate/jobs">
                                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                                    Tìm việc ngay →
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentApplications.map((app) => {
                                const job = jobs.find(j => j.id === app.jobId);
                                return (
                                    <div key={app.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <img
                                            src={job?.employerLogo}
                                            alt={job?.employerName}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate">{job?.title}</h4>
                                            <p className="text-sm text-gray-600">{job?.employerName}</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Badge variant={statusColors[app.status]} size="sm">
                                                    {statusLabels[app.status]}
                                                </Badge>
                                                <span className="text-xs text-gray-500">{app.appliedDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <Link
                                to="/candidate/applications"
                                className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium pt-2"
                            >
                                Xem tất cả →
                            </Link>
                        </div>
                    )}
                </Card>

                {/* Recommended Jobs */}
                <Card title="Việc làm đề xuất" padding="md">
                    <div className="space-y-4">
                        {recommendedJobs.map((job) => (
                            <Link
                                key={job.id}
                                to={`/jobs/${job.id}`}
                                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={job.employerLogo}
                                        alt={job.employerName}
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 truncate">{job.title}</h4>
                                        <p className="text-sm text-gray-600">{job.employerName}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Badge variant="primary" size="sm">{job.level}</Badge>
                                            <Badge variant="success" size="sm">{job.location}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <Link
                            to="/candidate/jobs"
                            className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium pt-2"
                        >
                            Xem thêm việc làm →
                        </Link>
                    </div>
                </Card>
            </div>

            {/* Profile Completion */}
            {user?.profile && (
                <Card padding="md" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">Hoàn thiện hồ sơ</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Hồ sơ hoàn chỉnh giúp bạn tăng 70% cơ hội được nhà tuyển dụng liên hệ
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">75%</span>
                            </div>
                            <Link to="/candidate/profile">
                                <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Hoàn thiện hồ sơ →
                                </button>
                            </Link>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default CandidateDashboard;
