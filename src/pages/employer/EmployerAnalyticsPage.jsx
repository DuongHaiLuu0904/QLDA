import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import {
    TrendingUp, Users, Eye, Briefcase, CheckCircle, Clock, XCircle,
    Calendar, DollarSign, Target, Award, BarChart3
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const EmployerAnalyticsPage = () => {
    const { user } = useAuth();
    const { jobs, applications } = useData();

    const myJobs = jobs.filter(j => j.employerId === user?.id);
    const myApplications = applications.filter(a =>
        myJobs.some(j => j.id === a.jobId)
    );

    // Calculate stats
    const stats = {
        totalJobs: myJobs.length,
        activeJobs: myJobs.filter(j => j.status === 'active').length,
        totalApplications: myApplications.length,
        totalViews: myJobs.reduce((sum, j) => sum + (j.views || 0), 0),
        pendingApplications: myApplications.filter(a => a.status === 'pending').length,
        shortlistedApplications: myApplications.filter(a => a.status === 'shortlisted').length,
        interviewApplications: myApplications.filter(a => a.status === 'interview').length,
        hiredApplications: myApplications.filter(a => a.status === 'hired').length,
        rejectedApplications: myApplications.filter(a => a.status === 'rejected').length
    };

    // Conversion rate
    const conversionRate = stats.totalViews > 0
        ? ((stats.totalApplications / stats.totalViews) * 100).toFixed(2)
        : 0;

    const hiringSuccessRate = stats.totalApplications > 0
        ? ((stats.hiredApplications / stats.totalApplications) * 100).toFixed(2)
        : 0;

    // Data for charts
    const applicationStatusData = [
        { name: 'Chờ xử lý', value: stats.pendingApplications, color: '#FCD34D' },
        { name: 'Sơ tuyển', value: stats.shortlistedApplications, color: '#60A5FA' },
        { name: 'Phỏng vấn', value: stats.interviewApplications, color: '#A78BFA' },
        { name: 'Đã tuyển', value: stats.hiredApplications, color: '#34D399' },
        { name: 'Từ chối', value: stats.rejectedApplications, color: '#F87171' }
    ].filter(item => item.value > 0);

    // Monthly trend data (mock data for demo)
    const monthlyTrendData = [
        { month: 'T7', applications: 12, views: 245, hired: 2 },
        { month: 'T8', applications: 18, views: 312, hired: 3 },
        { month: 'T9', applications: 25, views: 456, hired: 5 },
        { month: 'T10', applications: 32, views: 589, hired: 4 },
        { month: 'T11', applications: myApplications.length, views: stats.totalViews, hired: stats.hiredApplications }
    ];

    // Top performing jobs
    const topJobs = useMemo(() => {
        return [...myJobs]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5)
            .map(job => ({
                title: job.title,
                views: job.views || 0,
                applications: myApplications.filter(a => a.jobId === job.id).length
            }));
    }, [myJobs, myApplications]);

    const summaryCards = [
        {
            label: 'Tổng tin tuyển dụng',
            value: stats.totalJobs,
            subtext: `${stats.activeJobs} đang hoạt động`,
            icon: Briefcase,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Tổng ứng viên',
            value: stats.totalApplications,
            subtext: `${stats.pendingApplications} chờ xử lý`,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            label: 'Lượt xem',
            value: stats.totalViews,
            subtext: 'Tất cả tin tuyển dụng',
            icon: Eye,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'Tỷ lệ chuyển đổi',
            value: `${conversionRate}%`,
            subtext: 'Lượt xem → Ứng tuyển',
            icon: TrendingUp,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            label: 'Đã tuyển',
            value: stats.hiredApplications,
            subtext: `${hiringSuccessRate}% thành công`,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'Phỏng vấn',
            value: stats.interviewApplications,
            subtext: 'Đang trong quá trình',
            icon: Calendar,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Phân tích & Báo cáo</h1>
                <p className="text-gray-600">Theo dõi hiệu quả tuyển dụng và xu hướng ứng viên</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaryCards.map((card, index) => (
                    <Card key={index}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                                    <card.icon className={`h-6 w-6 ${card.color}`} />
                                </div>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.label}</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                            <p className="text-xs text-gray-500">{card.subtext}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Status Distribution */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            Phân bổ trạng thái ứng viên
                        </h2>

                        {applicationStatusData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={applicationStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {applicationStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-gray-500">
                                Chưa có dữ liệu
                            </div>
                        )}

                        <div className="mt-4 space-y-2">
                            {applicationStatusData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Monthly Trend */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            Xu hướng theo tháng
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="applications"
                                    stroke="#3B82F6"
                                    name="Ứng tuyển"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="hired"
                                    stroke="#10B981"
                                    name="Đã tuyển"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Top Performing Jobs */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        Top tin tuyển dụng hiệu quả nhất
                    </h2>

                    {topJobs.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topJobs}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="title" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="views" fill="#60A5FA" name="Lượt xem" />
                                <Bar dataKey="applications" fill="#34D399" name="Ứng tuyển" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            Chưa có dữ liệu tin tuyển dụng
                        </div>
                    )}
                </div>
            </Card>

            {/* Insights & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-purple-600" />
                            Thông tin chi tiết
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Hiệu suất tốt</p>
                                    <p className="text-sm text-gray-600">
                                        Tỷ lệ chuyển đổi của bạn là {conversionRate}%, cao hơn trung bình ngành (2-3%)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Tuyển dụng thành công</p>
                                    <p className="text-sm text-gray-600">
                                        Đã tuyển được {stats.hiredApplications} ứng viên, tỷ lệ thành công {hiringSuccessRate}%
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <Clock className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Cần xử lý</p>
                                    <p className="text-sm text-gray-600">
                                        Còn {stats.pendingApplications} ứng viên chờ xem xét và {stats.interviewApplications} lịch phỏng vấn
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="h-5 w-5 text-indigo-600" />
                            Đề xuất cải thiện
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="font-medium text-blue-900 mb-2">💡 Tối ưu tiêu đề tin tuyển dụng</p>
                                <p className="text-sm text-blue-700">
                                    Tin có tiêu đề rõ ràng, cụ thể về vị trí và cấp bậc thu hút nhiều ứng viên hơn 40%
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="font-medium text-green-900 mb-2">📈 Tăng lượt xem</p>
                                <p className="text-sm text-green-700">
                                    Sử dụng tính năng "Tin nổi bật" để tăng lượt xem lên 3-5 lần
                                </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="font-medium text-purple-900 mb-2">⚡ Phản hồi nhanh</p>
                                <p className="text-sm text-purple-700">
                                    Xem xét hồ sơ trong vòng 24h giúp tăng tỷ lệ chấp nhận offer lên 60%
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left">
                            <Briefcase className="h-6 w-6 text-blue-600 mb-2" />
                            <p className="font-medium text-gray-900">Đăng tin mới</p>
                            <p className="text-sm text-gray-600">Tạo tin tuyển dụng</p>
                        </button>

                        <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left">
                            <Users className="h-6 w-6 text-green-600 mb-2" />
                            <p className="font-medium text-gray-900">Xem ứng viên</p>
                            <p className="text-sm text-gray-600">Tìm kiếm ứng viên</p>
                        </button>

                        <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left">
                            <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
                            <p className="font-medium text-gray-900">Nâng cấp</p>
                            <p className="text-sm text-gray-600">Xem gói Premium</p>
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EmployerAnalyticsPage;
