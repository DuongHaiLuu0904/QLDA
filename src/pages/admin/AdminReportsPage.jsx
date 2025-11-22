import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import {
    TrendingUp, Users, Briefcase, DollarSign,
    Calendar, BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminReportsPage = () => {
    const { jobs, applications, users } = useData();
    const monthlyData = useMemo(() => {
        const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
        return months.map(month => ({
            month,
            users: Math.floor(Math.random() * 100) + 50,
            jobs: Math.floor(Math.random() * 50) + 20,
            revenue: Math.floor(Math.random() * 50000000) + 20000000
        }));
    }, []);

    const userTypeData = [
        { name: 'Ứng viên', value: users.filter(u => u.role === 'candidate').length },
        { name: 'Nhà tuyển dụng', value: users.filter(u => u.role === 'employer').length },
        { name: 'Admin', value: users.filter(u => u.role === 'admin').length }
    ];

    const jobStatusData = [
        { name: 'Đang tuyển', value: jobs.filter(j => j.status === 'active').length },
        { name: 'Đã đóng', value: jobs.filter(j => j.status === 'closed').length },
        { name: 'Nháp', value: jobs.filter(j => j.status === 'draft').length }
    ];

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    const stats = [
        { label: 'Tổng doanh thu', value: '125,000,000đ', icon: DollarSign, color: 'green', change: '+12%' },
        { label: 'Người dùng mới', value: '234', icon: Users, color: 'blue', change: '+18%' },
        { label: 'Tin đăng mới', value: '156', icon: Briefcase, color: 'purple', change: '+8%' },
        { label: 'Ứng tuyển', value: '1,234', icon: TrendingUp, color: 'orange', change: '+25%' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
                <p className="text-gray-600">Phân tích dữ liệu và xu hướng hệ thống</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx}>
                            <div className="p-4">
                                <div className={`inline-flex items-center justify-center w-10 h-10 bg-${stat.color}-100 rounded-lg mb-3`}>
                                    <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
                                    {stat.change} so với tháng trước
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng theo tháng</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#3B82F6" name="Người dùng" />
                                <Line type="monotone" dataKey="jobs" stroke="#10B981" name="Tin đăng" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Revenue Chart */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + 'đ'} />
                                <Bar dataKey="revenue" fill="#10B981" name="Doanh thu" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* User Types */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân loại người dùng</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={userTypeData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
                                    {userTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Job Status */}
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái tin đăng</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={jobStatusData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
                                    {jobStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminReportsPage;
