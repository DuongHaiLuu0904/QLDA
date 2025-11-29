import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, BookmarkPlus, Calendar, Eye, Star, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import CompanyLogo from '../../components/common/CompanyLogo';

const CandidateDashboard = () => {
    const { user } = useAuth();
    const { jobs, applications, savedJobs } = useData();

    const myApplications = applications.filter(a => a.candidateId === user?.id);
    const mySavedJobs = savedJobs.filter(s => s.candidateId === user?.id);

    // Job Matching Algorithm
    const calculateMatchScore = (job) => {
        if (!user?.candidateProfile) return 0;

        let score = 0;
        const profile = user.candidateProfile;

        // 1. Skills matching (40 points max)
        if (profile.skills && job.skills) {
            const matchingSkills = job.skills.filter(skill => 
                profile.skills.some(ps => ps.toLowerCase().includes(skill.toLowerCase()))
            );
            score += (matchingSkills.length / job.skills.length) * 40;
        }

        // 2. Experience level matching (30 points max)
        if (profile.experience && profile.experience.length > 0) {
            const totalYears = profile.experience.reduce((sum, exp) => {
                const years = exp.duration ? parseInt(exp.duration) : 0;
                return sum + years;
            }, 0);

            const levelScores = {
                'Intern': totalYears >= 0 ? 30 : 15,
                'Fresher': totalYears >= 0 && totalYears < 2 ? 30 : 15,
                'Junior': totalYears >= 1 && totalYears < 3 ? 30 : 15,
                'Middle': totalYears >= 3 && totalYears < 5 ? 30 : 15,
                'Senior': totalYears >= 5 ? 30 : 15,
                'Lead': totalYears >= 7 ? 30 : 10,
                'Manager': totalYears >= 8 ? 30 : 10
            };
            score += levelScores[job.level] || 0;
        }

        // 3. Location matching (15 points max)
        if (profile.address && job.location) {
            if (profile.address.toLowerCase().includes(job.location.toLowerCase()) ||
                job.location.toLowerCase().includes(profile.address.toLowerCase())) {
                score += 15;
            }
        }

        // 4. Title/Category matching (15 points max)
        if (profile.title && job.title) {
            const titleWords = profile.title.toLowerCase().split(' ');
            const jobTitleWords = job.title.toLowerCase().split(' ');
            const commonWords = titleWords.filter(word => jobTitleWords.includes(word));
            if (commonWords.length > 0) {
                score += 15;
            }
        }

        return Math.min(Math.round(score), 100);
    };

    // Sort jobs by match score
    const recommendedJobs = useMemo(() => {
        const activeJobs = jobs.filter(j => j.status === 'active');
        const jobsWithScores = activeJobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job)
        }));

        return jobsWithScores
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 6);
    }, [jobs, user]);

    const recentApplications = myApplications.slice(0, 5);

    const getMatchScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-blue-600 bg-blue-50';
        if (score >= 40) return 'text-yellow-600 bg-yellow-50';
        return 'text-gray-600 bg-gray-50';
    };

    const getMatchScoreLabel = (score) => {
        if (score >= 80) return 'Rất phù hợp';
        if (score >= 60) return 'Phù hợp';
        if (score >= 40) return 'Tạm được';
        return 'Ít phù hợp';
    };

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

    // Statistics data for charts
    const [showCharts, setShowCharts] = useState(false);

    const profileViewsData = useMemo(() => {
        // Mock data - last 7 days
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return days.map((day, idx) => ({
            day,
            views: Math.floor(Math.random() * 20) + 5
        }));
    }, []);

    const applicationStatsData = useMemo(() => {
        const total = myApplications.length;
        const pending = myApplications.filter(a => a.status === 'pending').length;
        const interview = myApplications.filter(a => a.status === 'interview').length;
        const accepted = myApplications.filter(a => a.status === 'accepted').length;
        const rejected = myApplications.filter(a => a.status === 'rejected').length;

        return [
            { status: 'Chờ xử lý', count: pending, color: '#f59e0b', percentage: (pending / total * 100).toFixed(0) },
            { status: 'Phỏng vấn', count: interview, color: '#3b82f6', percentage: (interview / total * 100).toFixed(0) },
            { status: 'Chấp nhận', count: accepted, color: '#10b981', percentage: (accepted / total * 100).toFixed(0) },
            { status: 'Từ chối', count: rejected, color: '#ef4444', percentage: (rejected / total * 100).toFixed(0) }
        ];
    }, [myApplications]);

    const successRate = myApplications.length > 0
        ? ((myApplications.filter(a => a.status === 'accepted').length / myApplications.length) * 100).toFixed(1)
        : 0;

    const avgTimeToHire = '21 ngày'; // Mock data

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

            {/* Analytics Toggle */}
            <Card padding="lg">
                <button
                    onClick={() => setShowCharts(!showCharts)}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">Thống kê chi tiết</h3>
                    </div>
                    <span className="text-sm text-blue-600">
                        {showCharts ? 'Ẩn' : 'Hiển thị'}
                    </span>
                </button>

                {showCharts && (
                    <div className="mt-6 space-y-6">
                        {/* Success Rate & Time to Hire */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-700 font-medium mb-1">Tỷ lệ thành công</p>
                                <p className="text-3xl font-bold text-green-600">{successRate}%</p>
                                <p className="text-xs text-green-600 mt-1">
                                    {myApplications.filter(a => a.status === 'accepted').length} / {myApplications.length} đơn
                                </p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700 font-medium mb-1">Thời gian trung bình</p>
                                <p className="text-3xl font-bold text-blue-600">{avgTimeToHire}</p>
                                <p className="text-xs text-blue-600 mt-1">Từ nộp đơn đến nhận offer</p>
                            </div>
                        </div>

                        {/* Profile Views Chart */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Lượt xem hồ sơ (7 ngày qua)</h4>
                            <div className="flex items-end justify-between h-40 gap-2">
                                {profileViewsData.map((data, idx) => {
                                    const maxViews = Math.max(...profileViewsData.map(d => d.views));
                                    const height = (data.views / maxViews) * 100;
                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center">
                                            <div className="w-full relative group">
                                                <div 
                                                    className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                                                    style={{ height: `${height}%`, minHeight: '20px' }}
                                                />
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {data.views} lượt xem
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-2">{data.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Application Status Breakdown */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Phân bổ trạng thái đơn ứng tuyển</h4>
                            <div className="space-y-3">
                                {applicationStatsData.map((data, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">{data.status}</span>
                                            <span className="text-sm text-gray-600">{data.count} ({data.percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="h-2.5 rounded-full transition-all"
                                                style={{ 
                                                    width: `${data.percentage}%`,
                                                    backgroundColor: data.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>

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
                                        <CompanyLogo
                                            src={job?.employerLogo}
                                            companyName={job?.employerName}
                                            alt={job?.employerName}
                                            size="sm"
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
                <Card padding="md">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Việc làm phù hợp với bạn</h3>
                        <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="space-y-4">
                        {recommendedJobs.map((job) => (
                            <Link
                                key={job.id}
                                to={`/jobs/${job.id}`}
                                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-start space-x-4">
                                    <CompanyLogo
                                        src={job.employerLogo}
                                        companyName={job.employerName}
                                        alt={job.employerName}
                                        size="sm"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h4 className="font-semibold text-gray-900 truncate flex-1">{job.title}</h4>
                                            <div className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${getMatchScoreColor(job.matchScore)}`}>
                                                {job.matchScore}% - {getMatchScoreLabel(job.matchScore)}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">{job.employerName}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Badge variant="primary" size="sm">{job.level}</Badge>
                                            <Badge variant="success" size="sm">{job.location}</Badge>
                                            {job.matchScore >= 80 && (
                                                <Badge variant="warning" size="sm">⭐ Rất phù hợp</Badge>
                                            )}
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
