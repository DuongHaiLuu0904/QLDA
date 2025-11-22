import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import {
    Building2, Search, Eye, CheckCircle, XCircle,
    Shield, Star, Trash2, Mail, Phone, Globe,
    MapPin, Calendar, Award, Crown
} from 'lucide-react';

const AdminCompaniesPage = () => {
    const { companies, verifyCompany, updateCompany, deleteCompany } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTier, setFilterTier] = useState('all');
    const [filterVerified, setFilterVerified] = useState('all');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Filter companies
    const filteredCompanies = useMemo(() => {
        return companies.filter(company => {
            const matchSearch =
                company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.industry?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchTier = filterTier === 'all' || company.tier === filterTier;
            const matchVerified =
                filterVerified === 'all' ||
                (filterVerified === 'verified' && company.isVerified) ||
                (filterVerified === 'unverified' && !company.isVerified);

            return matchSearch && matchTier && matchVerified;
        });
    }, [companies, searchTerm, filterTier, filterVerified]);

    // Stats
    const stats = useMemo(() => ({
        total: companies.length,
        verified: companies.filter(c => c.isVerified).length,
        enterprise: companies.filter(c => c.tier === 'enterprise').length,
        pro: companies.filter(c => c.tier === 'pro').length,
        basic: companies.filter(c => c.tier === 'basic').length,
        unverified: companies.filter(c => !c.isVerified).length
    }), [companies]);

    const handleVerifyCompany = (companyId) => {
        if (confirm('Xác thực công ty này?')) {
            verifyCompany(companyId, true);
        }
    };

    const handleUnverifyCompany = (companyId) => {
        if (confirm('Gỡ xác thực công ty này?')) {
            verifyCompany(companyId, false);
        }
    };

    const handleDeleteCompany = (companyId) => {
        if (confirm('Bạn có chắc chắn muốn xóa công ty này?')) {
            deleteCompany(companyId);
        }
    };

    const handleChangeTier = (companyId, newTier) => {
        updateCompany(companyId, { tier: newTier });
    };

    const viewCompanyDetail = (company) => {
        setSelectedCompany(company);
        setShowDetailModal(true);
    };

    const getTierBadge = (tier) => {
        const variants = {
            enterprise: 'danger',
            pro: 'warning',
            basic: 'info'
        };
        const labels = {
            enterprise: 'Enterprise',
            pro: 'Pro',
            basic: 'Basic'
        };
        return <Badge variant={variants[tier]}>{labels[tier]}</Badge>;
    };

    const columns = [
        {
            header: 'Công ty',
            accessor: 'company',
            render: (company) => (
                <div className="flex items-start gap-3">
                    <img
                        src={company.logo || 'https://via.placeholder.com/50'}
                        alt={company.name}
                        className="w-12 h-12 rounded object-cover"
                    />
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 truncate">{company.name}</p>
                            {company.isVerified && (
                                <Shield className="h-4 w-4 text-blue-600" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                        <p className="text-xs text-gray-500 mt-1">{company.companySize} nhân viên</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Liên hệ',
            accessor: 'contact',
            render: (company) => (
                <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{company.email}</span>
                    </div>
                    {company.phone && (
                        <div className="flex items-center gap-1 text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{company.phone}</span>
                        </div>
                    )}
                </div>
            )
        },
        {
            header: 'Vị trí',
            accessor: 'location',
            render: (company) => (
                <div className="text-sm text-gray-600 flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{company.address}</span>
                </div>
            )
        },
        {
            header: 'Gói dịch vụ',
            accessor: 'tier',
            render: (company) => getTierBadge(company.tier)
        },
        {
            header: 'Trạng thái',
            accessor: 'status',
            render: (company) => (
                <div className="space-y-1">
                    {company.isVerified ? (
                        <Badge variant="success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã xác thực
                        </Badge>
                    ) : (
                        <Badge variant="warning">Chưa xác thực</Badge>
                    )}
                </div>
            )
        },
        {
            header: 'Hành động',
            accessor: 'actions',
            render: (company) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewCompanyDetail(company)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    {company.isVerified ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnverifyCompany(company.id)}
                            className="text-orange-600"
                        >
                            <XCircle className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyCompany(company.id)}
                            className="text-green-600"
                        >
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCompany(company.id)}
                        className="text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý công ty</h1>
                <p className="text-gray-600">Xác thực và quản lý thông tin công ty</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Tổng công ty', value: stats.total, icon: Building2, color: 'blue' },
                    { label: 'Đã xác thực', value: stats.verified, icon: Shield, color: 'green' },
                    { label: 'Enterprise', value: stats.enterprise, icon: Crown, color: 'purple' },
                    { label: 'Pro', value: stats.pro, icon: Star, color: 'yellow' },
                    { label: 'Basic', value: stats.basic, icon: Award, color: 'cyan' },
                    { label: 'Chưa xác thực', value: stats.unverified, icon: XCircle, color: 'orange' }
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <div className="p-4">
                                <div className={`inline-flex items-center justify-center w-10 h-10 bg-${stat.color}-100 rounded-lg mb-3`}>
                                    <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm công ty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <select
                                value={filterTier}
                                onChange={(e) => setFilterTier(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả gói</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="pro">Pro</option>
                                <option value="basic">Basic</option>
                            </select>
                        </div>

                        <div>
                            <select
                                value={filterVerified}
                                onChange={(e) => setFilterVerified(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="verified">Đã xác thực</option>
                                <option value="unverified">Chưa xác thực</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Companies Table */}
            <Card>
                <div className="p-6">
                    <Table
                        columns={columns}
                        data={filteredCompanies}
                        emptyMessage="Không tìm thấy công ty nào"
                    />
                </div>
            </Card>

            {/* Company Detail Modal */}
            {showDetailModal && selectedCompany && (
                <Modal
                    isOpen={showDetailModal}
                    onClose={() => {
                        setShowDetailModal(false);
                        setSelectedCompany(null);
                    }}
                    title="Chi tiết công ty"
                >
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b">
                            <img
                                src={selectedCompany.logo || 'https://via.placeholder.com/80'}
                                alt={selectedCompany.name}
                                className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedCompany.name}</h3>
                                    {selectedCompany.isVerified && (
                                        <Shield className="h-5 w-5 text-blue-600" />
                                    )}
                                </div>
                                <p className="text-gray-600">{selectedCompany.industry}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    {getTierBadge(selectedCompany.tier)}
                                    {selectedCompany.isVerified && (
                                        <Badge variant="success">Đã xác thực</Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Mã số thuế</p>
                                <p className="font-medium text-gray-900">{selectedCompany.taxCode}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Quy mô</p>
                                <p className="font-medium text-gray-900">{selectedCompany.companySize} nhân viên</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                <p className="font-medium text-gray-900 flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {selectedCompany.email}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                                <p className="font-medium text-gray-900 flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {selectedCompany.phone}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Website</p>
                                <a
                                    href={selectedCompany.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-blue-600 hover:underline flex items-center gap-2"
                                >
                                    <Globe className="h-4 w-4" />
                                    {selectedCompany.website}
                                </a>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                                <p className="font-medium text-gray-900 flex items-start gap-2">
                                    <MapPin className="h-4 w-4 mt-0.5" />
                                    <span>{selectedCompany.address}</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Mô tả</p>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                {selectedCompany.description}
                            </p>
                        </div>

                        {selectedCompany.benefits && selectedCompany.benefits.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Phúc lợi</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCompany.benefits.map((benefit, index) => (
                                        <Badge key={index} variant="info">{benefit}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedCompany.isVerified && selectedCompany.verifiedDate && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium text-green-900">Đã xác thực</p>
                                        <p className="text-sm text-green-700">
                                            Ngày xác thực: {new Date(selectedCompany.verifiedDate).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Thay đổi gói dịch vụ
                            </label>
                            <select
                                value={selectedCompany.tier}
                                onChange={(e) => handleChangeTier(selectedCompany.id, e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="basic">Basic</option>
                                <option value="pro">Pro</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            {selectedCompany.isVerified ? (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleUnverifyCompany(selectedCompany.id);
                                        setShowDetailModal(false);
                                    }}
                                    className="text-orange-600"
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Gỡ xác thực
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        handleVerifyCompany(selectedCompany.id);
                                        setShowDetailModal(false);
                                    }}
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Xác thực
                                </Button>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminCompaniesPage;
