import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { mockCandidates } from '../../services/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Search, Filter, Users, MapPin, Briefcase, Mail, Phone, Star, Eye, Send } from 'lucide-react';

const EmployerCandidatesPage = () => {
    const { jobs } = useData();

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        skills: '',
        experience: '',
        isPremium: false
    });

    // Tính toán số năm kinh nghiệm từ profile
    const calculateExperience = (profile) => {
        if (!profile?.experience || profile.experience.length === 0) return 0;

        const totalMonths = profile.experience.reduce((total, exp) => {
            const start = new Date(exp.startDate);
            const end = exp.current ? new Date() : new Date(exp.endDate);
            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            return total + months;
        }, 0);

        return Math.floor(totalMonths / 12);
    };

    // Filter candidates
    const filteredCandidates = useMemo(() => {
        return mockCandidates.filter(candidate => {
            const profile = candidate.profile || {};

            // Search by name, email, skills
            const matchesSearch = !searchTerm ||
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (profile.skills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

            // Filter by location
            const matchesLocation = !filters.location ||
                (profile.workLocation || []).includes(filters.location);

            // Filter by skills
            const matchesSkills = !filters.skills ||
                (profile.skills || []).some(skill =>
                    skill.toLowerCase().includes(filters.skills.toLowerCase())
                );

            // Filter by experience level
            const experience = calculateExperience(profile);
            const matchesExperience = !filters.experience ||
                (filters.experience === 'junior' && experience < 3) ||
                (filters.experience === 'middle' && experience >= 3 && experience < 5) ||
                (filters.experience === 'senior' && experience >= 5);

            // Filter by premium
            const matchesPremium = !filters.isPremium || candidate.isPremium;

            return matchesSearch && matchesLocation && matchesSkills && matchesExperience && matchesPremium;
        });
    }, [searchTerm, filters]);

    const handleInviteToApply = (candidate) => {
        alert(`Đã gửi lời mời ứng tuyển đến ${candidate.name}`);
    };

    const stats = [
        {
            label: 'Tổng ứng viên',
            value: mockCandidates.length,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Ứng viên Premium',
            value: mockCandidates.filter(c => c.isPremium).length,
            icon: Star,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            label: 'Lượt xem hôm nay',
            value: 0,
            icon: Eye,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý ứng viên</h1>
                <p className="text-gray-600">Tìm kiếm và mời ứng viên ứng tuyển vào các vị trí của bạn</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <div className="p-6 flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Search & Filters */}
            <Card>
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Filter className="h-5 w-5" />
                        <span>Tìm kiếm & Lọc</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm ứng viên, kỹ năng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <select
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Tất cả địa điểm</option>
                            <option value="TP.HCM">TP.HCM</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Remote">Remote</option>
                        </select>

                        <select
                            value={filters.experience}
                            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Tất cả kinh nghiệm</option>
                            <option value="junior">Junior (&lt; 3 năm)</option>
                            <option value="middle">Middle (3-5 năm)</option>
                            <option value="senior">Senior (&gt; 5 năm)</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="premiumFilter"
                                checked={filters.isPremium}
                                onChange={(e) => setFilters({ ...filters, isPremium: e.target.checked })}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="premiumFilter" className="text-sm text-gray-700">
                                Chỉ Premium
                            </label>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Results */}
            <div>
                <div className="mb-4 text-sm text-gray-600">
                    Tìm thấy {filteredCandidates.length} ứng viên
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCandidates.map((candidate) => {
                        const profile = candidate.profile || {};
                        const experience = calculateExperience(profile);

                        return (
                            <Card key={candidate.id}>
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <img
                                            src={candidate.avatar}
                                            alt={candidate.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {candidate.name}
                                                </h3>
                                                {candidate.isPremium && (
                                                    <Badge variant="warning">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Premium
                                                    </Badge>
                                                )}
                                            </div>

                                            {profile.experience && profile.experience.length > 0 && (
                                                <p className="text-sm text-gray-600">
                                                    {profile.experience[0].position} tại {profile.experience[0].company}
                                                </p>
                                            )}

                                            <p className="text-xs text-gray-500 mt-1">
                                                {experience > 0 ? `${experience} năm kinh nghiệm` : 'Fresher'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    {profile.bio && (
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {profile.bio}
                                        </p>
                                    )}

                                    {/* Info */}
                                    <div className="space-y-2 mb-4">
                                        {profile.workLocation && profile.workLocation.length > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="h-4 w-4" />
                                                <span>{profile.workLocation.join(', ')}</span>
                                            </div>
                                        )}

                                        {profile.expectedSalary && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Briefcase className="h-4 w-4" />
                                                <span>Mong muốn: {parseInt(profile.expectedSalary).toLocaleString('vi-VN')} VND</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="h-4 w-4" />
                                            <span>{candidate.email}</span>
                                        </div>

                                        {candidate.phone && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="h-4 w-4" />
                                                <span>{candidate.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Skills */}
                                    {profile.skills && profile.skills.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.slice(0, 5).map((skill, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {profile.skills.length > 5 && (
                                                    <Badge variant="secondary">+{profile.skills.length - 5}</Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => window.open(profile.cvUrl || '#', '_blank')}
                                            disabled={!profile.cvUrl}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Xem CV
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={() => handleInviteToApply(candidate)}
                                        >
                                            <Send className="h-4 w-4 mr-2" />
                                            Mời ứng tuyển
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {filteredCandidates.length === 0 && (
                    <Card>
                        <div className="p-12 text-center">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Không tìm thấy ứng viên
                            </h3>
                            <p className="text-gray-600">
                                Thử điều chỉnh bộ lọc để tìm kiếm ứng viên phù hợp
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default EmployerCandidatesPage;
