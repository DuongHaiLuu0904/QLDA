import { Link } from 'react-router-dom';
import { Briefcase, Users, Eye, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmployerDashboard = () => {
    const { user } = useAuth();
    const { jobs, applications } = useData();

    const myJobs = jobs.filter(j => j.employerId === user?.id);
    const myApplications = applications.filter(a =>
        myJobs.some(j => j.id === a.jobId)
    );

    const stats = [
        {
            label: 'Tin tuyển dụng',
            value: myJobs.length,
            change: '+2 tháng này',
            icon: Briefcase,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Ứng viên mới',
            value: myApplications.length,
            change: '+12 tuần này',
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'Lượt xem',
            value: myJobs.reduce((sum, j) => sum + j.views, 0),
            change: '+156 tuần này',
            icon: Eye,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            label: 'Tỷ lệ chuyển đổi',
            value: '12.5%',
            change: '+2.1% so với tháng trước',
            icon: TrendingUp,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        }
    ];

    // Mock data for charts
    const weeklyData = [
        { name: 'T2', views: 120, applies: 12 },
        { name: 'T3', views: 150, applies: 18 },
        { name: 'T4', views: 180, applies: 15 },
        { name: 'T5', views: 140, applies: 20 },
        { name: 'T6', views: 200, applies: 25 },
        { name: 'T7', views: 90, applies: 8 },
        { name: 'CN', views: 70, applies: 5 }
    ];

    const recentApplications = myApplications.slice(0, 5);
    const activeJobs = myJobs.filter(j => j.status === 'active').slice(0, 4);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Chào mừng, {user?.companyProfile?.companyName || user?.name}! 🚀
                    </h1>
                    <p className="text-gray-600">
                        Đây là tổng quan về hoạt động tuyển dụng của bạn
                    </p>
                </div>
                <Link to="/employer/jobs/create">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        + Đăng tin mới
                    </button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} padding="md">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change}</p>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card title="Lượt xem & Ứng tuyển theo tuần" padding="md">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="views" stroke="#3b82f6" name="Lượt xem" />
                            <Line type="monotone" dataKey="applies" stroke="#10b981" name="Ứng tuyển" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Hiệu suất tin tuyển dụng" padding="md">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={activeJobs.map(j => ({
                            name: j.title.substring(0, 15) + '...',
                            applies: j.applications,
                            views: j.views / 10
                        }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="applies" fill="#10b981" name="Ứng tuyển" />
                            <Bar dataKey="views" fill="#3b82f6" name="Lượt xem (÷10)" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <Card title="Ứng viên mới nhất" padding="md">
                    {recentApplications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p>Chưa có ứng viên nào ứng tuyển</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentApplications.map((app) => {
                                const job = jobs.find(j => j.id === app.jobId);
                                return (
                                    <div key={app.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <img
                                            src={app.candidateAvatar}
                                            alt={app.candidateName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900">{app.candidateName}</h4>
                                            <p className="text-sm text-gray-600 truncate">{job?.title}</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Badge variant="primary" size="sm">{app.status}</Badge>
                                                <span className="text-xs text-gray-500">{app.appliedDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <Link
                                to="/employer/candidates"
                                className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium pt-2"
                            >
                                Xem tất cả ứng viên →
                            </Link>
                        </div>
                    )}
                </Card>

                {/* Active Jobs */}
                <Card title="Tin đang tuyển" padding="md">
                    <div className="space-y-4">
                        {activeJobs.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p>Chưa có tin tuyển dụng nào</p>
                                <Link to="/employer/jobs/create">
                                    <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                                        Đăng tin ngay →
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                {activeJobs.map((job) => (
                                    <Link
                                        key={job.id}
                                        to={`/employer/jobs/${job.id}`}
                                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                            {job.featured && <Badge variant="warning" size="sm">Nổi bật</Badge>}
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Lượt xem</p>
                                                <p className="font-semibold text-gray-900">{job.views}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Ứng tuyển</p>
                                                <p className="font-semibold text-gray-900">{job.applications}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Tỷ lệ</p>
                                                <p className="font-semibold text-gray-900">
                                                    {job.views > 0 ? ((job.applications / job.views) * 100).toFixed(1) : 0}%
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    to="/employer/jobs"
                                    className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium pt-2"
                                >
                                    Xem tất cả tin →
                                </Link>
                            </>
                        )}
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card padding="md" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/employer/jobs/create" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Đăng tin mới</p>
                    </Link>
                    <Link to="/employer/candidates" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Xem ứng viên</p>
                    </Link>
                    <Link to="/employer/billing" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Nâng cấp gói</p>
                    </Link>
                    <Link to="/employer/analytics" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Báo cáo</p>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default EmployerDashboard;
