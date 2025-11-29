import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import CompanyLogo from '../../components/common/CompanyLogo';
import { X, MapPin, DollarSign, Briefcase, Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';

const JobComparisonPage = () => {
    const { jobs } = useData();
    const [compareJobs, setCompareJobs] = useState([]);
    const [showJobPicker, setShowJobPicker] = useState(false);

    const activeJobs = jobs.filter(j => j.status === 'active');

    const addToCompare = (job) => {
        if (compareJobs.length >= 3) {
            alert('Bạn chỉ có thể so sánh tối đa 3 công việc');
            return;
        }
        if (compareJobs.find(j => j.id === job.id)) {
            alert('Công việc này đã được thêm vào so sánh');
            return;
        }
        setCompareJobs([...compareJobs, job]);
        setShowJobPicker(false);
    };

    const removeFromCompare = (jobId) => {
        setCompareJobs(compareJobs.filter(j => j.id !== jobId));
    };

    const clearAll = () => {
        if (confirm('Xóa tất cả công việc khỏi so sánh?')) {
            setCompareJobs([]);
        }
    };

    const formatSalary = (salary) => {
        if (salary.negotiable) return 'Thỏa thuận';
        return `${(salary.min / 1000000).toFixed(0)}-${(salary.max / 1000000).toFixed(0)} triệu`;
    };

    const comparisonRows = [
        { 
            label: 'Vị trí',
            getValue: (job) => job.title,
            icon: Briefcase
        },
        { 
            label: 'Công ty',
            getValue: (job) => job.employerName,
            icon: Users
        },
        { 
            label: 'Địa điểm',
            getValue: (job) => job.location,
            icon: MapPin
        },
        { 
            label: 'Mức lương',
            getValue: (job) => formatSalary(job.salary),
            icon: DollarSign,
            highlight: true
        },
        { 
            label: 'Cấp bậc',
            getValue: (job) => job.level,
            icon: TrendingUp
        },
        { 
            label: 'Hình thức',
            getValue: (job) => job.workType,
            icon: Clock
        },
        { 
            label: 'Kinh nghiệm',
            getValue: (job) => job.requirements?.experience || 'Không yêu cầu',
            icon: CheckCircle
        },
        { 
            label: 'Kỹ năng yêu cầu',
            getValue: (job) => (
                <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 5).map((skill, idx) => (
                        <Badge key={idx} variant="primary" size="sm">{skill}</Badge>
                    ))}
                    {job.skills.length > 5 && (
                        <Badge variant="default" size="sm">+{job.skills.length - 5}</Badge>
                    )}
                </div>
            ),
            isComponent: true
        },
        { 
            label: 'Phúc lợi',
            getValue: (job) => (
                <ul className="text-sm space-y-1">
                    {job.benefits?.slice(0, 4).map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                    {job.benefits?.length > 4 && (
                        <li className="text-gray-500">+{job.benefits.length - 4} khác</li>
                    )}
                </ul>
            ),
            isComponent: true
        },
        { 
            label: 'Ngày đăng',
            getValue: (job) => new Date(job.postedDate).toLocaleDateString('vi-VN'),
            icon: Clock
        },
        { 
            label: 'Hạn nộp',
            getValue: (job) => new Date(job.deadline).toLocaleDateString('vi-VN'),
            icon: Clock,
            highlight: true
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        So sánh công việc
                    </h1>
                    <p className="text-gray-600">
                        So sánh tối đa 3 công việc để đưa ra quyết định tốt nhất
                    </p>
                </div>
                {compareJobs.length > 0 && (
                    <Button variant="outline" onClick={clearAll}>
                        <X className="w-4 h-4 mr-2" />
                        Xóa tất cả
                    </Button>
                )}
            </div>

            {/* Job Picker */}
            {compareJobs.length < 3 && (
                <Card padding="lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">
                            Chọn công việc để so sánh ({compareJobs.length}/3)
                        </h3>
                        <Button 
                            size="sm"
                            onClick={() => setShowJobPicker(!showJobPicker)}
                        >
                            {showJobPicker ? 'Ẩn' : 'Hiện'} danh sách
                        </Button>
                    </div>

                    {showJobPicker && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                            {activeJobs.map(job => (
                                <button
                                    key={job.id}
                                    onClick={() => addToCompare(job)}
                                    disabled={compareJobs.find(j => j.id === job.id)}
                                    className={`p-4 border rounded-lg text-left transition-all ${
                                        compareJobs.find(j => j.id === job.id)
                                            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-start gap-3 mb-2">
                                        <CompanyLogo
                                            src={job.employerLogo}
                                            companyName={job.employerName}
                                            alt={job.employerName}
                                            size="xs"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate">{job.title}</h4>
                                            <p className="text-sm text-gray-600 truncate">{job.employerName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">{job.location}</span>
                                        <Badge variant="primary" size="sm">{job.level}</Badge>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </Card>
            )}

            {/* Comparison Table */}
            {compareJobs.length === 0 ? (
                <Card padding="lg">
                    <div className="text-center py-12">
                        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Chưa có công việc nào được chọn
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Chọn 2-3 công việc để bắt đầu so sánh
                        </p>
                        <Button onClick={() => setShowJobPicker(true)}>
                            Chọn công việc
                        </Button>
                    </div>
                </Card>
            ) : (
                <Card padding="none" className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="sticky left-0 bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900 min-w-[200px]">
                                        Tiêu chí
                                    </th>
                                    {compareJobs.map(job => (
                                        <th key={job.id} className="px-6 py-4 min-w-[280px]">
                                            <div className="text-left">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <CompanyLogo
                                                        src={job.employerLogo}
                                                        companyName={job.employerName}
                                                        alt={job.employerName}
                                                        size="sm"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 text-base mb-1">
                                                            {job.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">{job.employerName}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCompare(job.id)}
                                                        className="text-gray-400 hover:text-red-600"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <Link to={`/jobs/${job.id}`}>
                                                    <Button size="sm" variant="outline" className="w-full">
                                                        Xem chi tiết
                                                    </Button>
                                                </Link>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, idx) => (
                                    <tr 
                                        key={idx}
                                        className={`border-b ${row.highlight ? 'bg-yellow-50' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    >
                                        <td className="sticky left-0 px-6 py-4 font-medium text-gray-900 bg-inherit">
                                            <div className="flex items-center gap-2">
                                                {row.icon && <row.icon className="w-5 h-5 text-gray-500" />}
                                                {row.label}
                                            </div>
                                        </td>
                                        {compareJobs.map(job => (
                                            <td key={job.id} className="px-6 py-4 text-gray-700">
                                                {row.isComponent ? row.getValue(job) : (
                                                    <div className={row.highlight ? 'font-semibold text-gray-900' : ''}>
                                                        {row.getValue(job)}
                                                    </div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Action Buttons */}
            {compareJobs.length > 0 && (
                <Card padding="lg">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                            Đã so sánh {compareJobs.length} công việc
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => window.print()}>
                                In so sánh
                            </Button>
                            <Link to="/candidate/jobs">
                                <Button>
                                    Tìm thêm công việc
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default JobComparisonPage;
