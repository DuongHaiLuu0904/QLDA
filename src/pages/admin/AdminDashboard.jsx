import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Building2, DollarSign, TrendingUp, AlertCircle, Shield, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    const { jobs, applications, users, companies } = useData();

    const candidates = users.filter(u => u.role === 'candidate');
    const employers = users.filter(u => u.role === 'employer');
    const activeJobs = jobs.filter(j => j.status === 'active');
    const pendingJobs = jobs.filter(j => j.approvalStatus === 'pending');
    const verifiedCompanies = companies.filter(c => c.isVerified);
    const pendingApplications = applications.filter(a => a.status === 'pending');

    const stats = [
        {
            label: 'Tổng người dùng',
            value: users.length,
            change: `${candidates.length} ứng viên`,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            link: '/admin/users'
        },
        {
            label: 'Tin tuyển dụng',
            value: jobs.length,
            change: `${activeJobs.length} đang hoạt động`,
            icon: Briefcase,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            link: '/admin/jobs'
        },
        {
            label: 'Công ty',
            value: companies.length,
            change: `${verifiedCompanies.length} đã xác thực`,
            icon: Building2,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            link: '/admin/companies'
        },
        {
            label: 'Ứng tuyển',
            value: applications.length,
            change: `${pendingApplications.length} chờ xử lý`,
            icon: TrendingUp,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            link: '/admin/reports'
        }
    ];

    // Chart data
    const userGrowthData = [
        { month: 'T1', candidates: 120, employers: 25 },
        { month: 'T2', candidates: 145, employers: 32 },
        { month: 'T3', candidates: 168, employers: 38 },
        { month: 'T4', candidates: 192, employers: 45 },
        { month: 'T5', candidates: 215, employers: 52 },
        { month: 'T6', candidates: 248, employers: 61 }
    ];

    const jobCategoryData = [
        { name: 'IT', value: 45 },
        { name: 'Marketing', value: 20 },
        { name: 'Design', value: 15 },
        { name: 'Business', value: 12 },
        { name: 'Others', value: 8 }
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

    const recentJobs = jobs.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Tổng quan hệ thống và quản lý nền tảng
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Link key={index} to={stat.link}>
                        <Card padding="md" hover className="h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                            <p className="text-sm text-green-600">{stat.change}</p>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Pending Actions */}
            {pendingJobs.length > 0 && (
                <Card padding="md" className="bg-yellow-50 border-yellow-200">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Có {pendingJobs.length} tin tuyển dụng chờ duyệt
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Cần xem xét và phê duyệt các tin tuyển dụng mới
                            </p>
                            <Link to="/admin/jobs?status=pending">
                                <button className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                                    Xem ngay
                                </button>
                            </Link>
                        </div>
                    </div>
                </Card>
            )}

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card title="Tăng trưởng người dùng" padding="md">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="candidates" stroke="#3b82f6" name="Ứng viên" />
                            <Line type="monotone" dataKey="employers" stroke="#10b981" name="Nhà tuyển dụng" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Phân bố ngành nghề" padding="md">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={jobCategoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {jobCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Jobs */}
                <Card title="Tin tuyển dụng mới" padding="md">
                    <div className="space-y-4">
                        {recentJobs.map((job) => (
                            <div key={job.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <img
                                    src={job.employerLogo}
                                    alt={job.employerName}
                                    className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 truncate">{job.title}</h4>
                                    <p className="text-sm text-gray-600">{job.employerName}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Badge
                                            variant={
                                                job.approvalStatus === 'approved' ? 'success' :
                                                    job.approvalStatus === 'pending' ? 'warning' : 'danger'
                                            }
                                            size="sm"
                                        >
                                            {job.approvalStatus}
                                        </Badge>
                                        <Badge variant="default" size="sm">{job.location}</Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Link
                            to="/admin/jobs"
                            className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium pt-2"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                </Card>

                {/* System Health */}
                <Card title="Trạng thái hệ thống" padding="md">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-900">Database</h4>
                                <p className="text-sm text-gray-600">Hoạt động bình thường</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-green-700">Online</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-900">API Services</h4>
                                <p className="text-sm text-gray-600">Response time: 45ms</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-green-700">Healthy</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-900">Storage</h4>
                                <p className="text-sm text-gray-600">45GB / 100GB used</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-green-700">45%</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-900">Active Users</h4>
                                <p className="text-sm text-gray-600">234 users online</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">+12%</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card padding="md">
                <h3 className="font-semibold text-gray-900 mb-4">Quản lý nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/admin/users" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Người dùng</p>
                    </Link>
                    <Link to="/admin/jobs" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Tin tuyển dụng</p>
                    </Link>
                    <Link to="/admin/companies" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Công ty</p>
                    </Link>
                    <Link to="/admin/reports" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Báo cáo</p>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
