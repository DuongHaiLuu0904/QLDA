import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Users, Briefcase, ExternalLink, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { mockCompanies } from '../../services/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';

const CompaniesPage = () => {
    const { jobs } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');

    // Calculate job count for each company
    const companiesWithJobs = mockCompanies.map(company => ({
        ...company,
        jobCount: jobs.filter(job => job.employerId === company.id).length
    }));

    // Filter companies
    const filteredCompanies = companiesWithJobs.filter(company => {
        const matchesSearch = searchTerm === '' ||
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesIndustry = industryFilter === '' || company.industry === industryFilter;
        const matchesSize = sizeFilter === '' || company.companySize === sizeFilter;

        return matchesSearch && matchesIndustry && matchesSize;
    });

    // Get unique industries
    const industries = [...new Set(mockCompanies.map(c => c.industry))];
    const companySizes = [...new Set(mockCompanies.map(c => c.companySize))];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Khám phá công ty
                    </h1>
                    <p className="text-gray-600">
                        Tìm thấy {filteredCompanies.length} công ty đang tuyển dụng
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <Input
                                placeholder="Tìm kiếm công ty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="w-5 h-5" />}
                            />
                        </div>

                        <div>
                            <select
                                value={industryFilter}
                                onChange={(e) => setIndustryFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tất cả ngành nghề</option>
                                {industries.map((industry, idx) => (
                                    <option key={idx} value={industry}>{industry}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={sizeFilter}
                                onChange={(e) => setSizeFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tất cả quy mô</option>
                                {companySizes.map((size, idx) => (
                                    <option key={idx} value={size}>{size} nhân viên</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Companies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.length === 0 ? (
                        <div className="col-span-full">
                            <Card padding="lg" className="text-center">
                                <div className="py-12">
                                    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Không tìm thấy công ty
                                    </h3>
                                    <p className="text-gray-600">
                                        Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                                    </p>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        filteredCompanies.map(company => (
                            <Card key={company.id} padding="none" hover className="overflow-hidden">
                                <Link to={`/companies/${company.id}`}>
                                    {/* Banner */}
                                    <div
                                        className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"
                                        style={company.banner ? {
                                            backgroundImage: `url(${company.banner})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        } : {}}
                                    />

                                    <div className="p-6">
                                        {/* Logo */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-md -mt-12"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                                            {company.name}
                                                        </h3>
                                                        {company.isVerified && (
                                                            <CheckCircle className="w-5 h-5 text-blue-500" title="Đã xác thực" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                                                {company.industry}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Users className="w-4 h-4 mr-2 text-gray-400" />
                                                {company.companySize}+ nhân viên
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                {company.address}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                            {company.description}
                                        </p>

                                        {/* Jobs Count */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="flex items-center text-sm font-medium text-blue-600">
                                                <Briefcase className="w-4 h-4 mr-2" />
                                                {company.jobCount} việc làm
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        ))
                    )}
                </div>

                {/* Top Companies Section */}
                {searchTerm === '' && industryFilter === '' && sizeFilter === '' && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Công ty hàng đầu
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {companiesWithJobs
                                .filter(c => c.isVerified)
                                .sort((a, b) => b.jobCount - a.jobCount)
                                .slice(0, 4)
                                .map(company => (
                                    <Card key={company.id} padding="md" hover>
                                        <Link to={`/companies/${company.id}`}>
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                                            {company.name}
                                                        </h3>
                                                        {company.isVerified && (
                                                            <CheckCircle className="w-5 h-5 text-blue-500" />
                                                        )}
                                                        {company.tier === 'enterprise' && (
                                                            <Badge variant="warning">⭐ Premium</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                        {company.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Badge variant="default">{company.industry}</Badge>
                                                        <Badge variant="primary">{company.jobCount} việc làm</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Card>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompaniesPage;
