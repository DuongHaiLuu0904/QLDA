import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, Filter, X, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import CompanyLogo from '../../components/common/CompanyLogo';

const JobsPage = () => {
    const [searchParams] = useSearchParams();
    const { jobs, categories, locations } = useData();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [workTypeFilter, setWorkTypeFilter] = useState('');
    const [salaryRange, setSalaryRange] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [savedSearches, setSavedSearches] = useState(() => {
        const saved = localStorage.getItem('savedSearches');
        return saved ? JSON.parse(saved) : [];
    });
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [companySizeFilter, setCompanySizeFilter] = useState('');
    const [benefitsFilter, setBenefitsFilter] = useState([]);
    const [postedDateFilter, setPostedDateFilter] = useState('all');
    const [skillsFilter, setSkillsFilter] = useState([]);

    const allSkills = useMemo(() => {
        const skills = new Set();
        jobs.forEach(job => {
            job.skills.forEach(skill => skills.add(skill));
        });
        return Array.from(skills).sort();
    }, [jobs]);

    const allBenefits = ['Bảo hiểm', 'Du lịch', 'Thưởng', 'Đào tạo', 'Laptop', 'Xe đưa đón'];

    // Initialize filters from URL params
    useEffect(() => {
        const search = searchParams.get('search');
        const location = searchParams.get('location');
        const category = searchParams.get('category');
        
        if (search) setSearchTerm(search);
        if (location) setLocationFilter(location);
        if (category) setCategoryFilter(category);
    }, [searchParams]);

    // Filter jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Search term filter
            const matchesSearch = searchTerm === '' ||
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase());

            // Location filter
            const matchesLocation = locationFilter === '' || job.location === locationFilter;

            // Category filter
            const matchesCategory = categoryFilter === '' || job.category === categoryFilter;

            // Level filter
            const matchesLevel = levelFilter === '' || job.level === levelFilter;

            // Work type filter
            const matchesWorkType = workTypeFilter === '' || job.workType === workTypeFilter;

            // Salary range filter
            let matchesSalary = true;
            if (salaryRange !== 'all' && !job.salary.negotiable) {
                switch (salaryRange) {
                    case 'under10':
                        matchesSalary = job.salary.max < 10000000;
                        break;
                    case '10-20':
                        matchesSalary = job.salary.min >= 10000000 && job.salary.max <= 20000000;
                        break;
                    case '20-30':
                        matchesSalary = job.salary.min >= 20000000 && job.salary.max <= 30000000;
                        break;
                    case 'over30':
                        matchesSalary = job.salary.min >= 30000000;
                        break;
                    default:
                        matchesSalary = true;
                }
            }

            // Company size filter
            const matchesCompanySize = companySizeFilter === '' || job.companySize === companySizeFilter;

            // Benefits filter
            const matchesBenefits = benefitsFilter.length === 0 || 
                benefitsFilter.every(benefit => job.benefits?.includes(benefit));

            // Posted date filter
            let matchesPostedDate = true;
            if (postedDateFilter !== 'all') {
                const postedDate = new Date(job.postedDate);
                const now = new Date();
                const diffDays = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));
                
                switch (postedDateFilter) {
                    case '24h':
                        matchesPostedDate = diffDays <= 1;
                        break;
                    case '7d':
                        matchesPostedDate = diffDays <= 7;
                        break;
                    case '30d':
                        matchesPostedDate = diffDays <= 30;
                        break;
                    default:
                        matchesPostedDate = true;
                }
            }

            // Skills filter
            const matchesSkills = skillsFilter.length === 0 ||
                skillsFilter.some(skill => job.skills.includes(skill));

            return matchesSearch && matchesLocation && matchesCategory &&
                matchesLevel && matchesWorkType && matchesSalary &&
                matchesCompanySize && matchesBenefits && matchesPostedDate && matchesSkills;
        });
    }, [jobs, searchTerm, locationFilter, categoryFilter, levelFilter, workTypeFilter, salaryRange, 
        companySizeFilter, benefitsFilter, postedDateFilter, skillsFilter]);

    const clearFilters = () => {
        setSearchTerm('');
        setLocationFilter('');
        setCategoryFilter('');
        setLevelFilter('');
        setWorkTypeFilter('');
        setSalaryRange('all');
        setCompanySizeFilter('');
        setBenefitsFilter([]);
        setPostedDateFilter('all');
        setSkillsFilter([]);
    };

    const activeFiltersCount = [
        searchTerm,
        locationFilter,
        categoryFilter,
        levelFilter,
        workTypeFilter,
        salaryRange !== 'all' ? salaryRange : '',
        companySizeFilter,
        postedDateFilter !== 'all' ? postedDateFilter : ''
    ].filter(f => f !== '').length + benefitsFilter.length + skillsFilter.length;

    const saveCurrentSearch = () => {
        if (!user) {
            alert('Vui lòng đăng nhập để lưu tìm kiếm');
            return;
        }
        if (activeFiltersCount === 0) {
            alert('Vui lòng thiết lập ít nhất 1 điều kiện tìm kiếm');
            return;
        }
        setShowSaveModal(true);
    };

    const confirmSaveSearch = () => {
        if (!searchName.trim()) {
            alert('Vui lòng nhập tên cho tìm kiếm này');
            return;
        }

        const newSearch = {
            id: Date.now(),
            name: searchName,
            userId: user.id,
            filters: {
                searchTerm,
                locationFilter,
                categoryFilter,
                levelFilter,
                workTypeFilter,
                salaryRange
            },
            createdAt: new Date().toISOString(),
            resultsCount: filteredJobs.length
        };

        const updated = [...savedSearches, newSearch];
        setSavedSearches(updated);
        localStorage.setItem('savedSearches', JSON.stringify(updated));
        setShowSaveModal(false);
        setSearchName('');
        alert('Đã lưu tìm kiếm thành công!');
    };

    const loadSavedSearch = (search) => {
        setSearchTerm(search.filters.searchTerm);
        setLocationFilter(search.filters.locationFilter);
        setCategoryFilter(search.filters.categoryFilter);
        setLevelFilter(search.filters.levelFilter);
        setWorkTypeFilter(search.filters.workTypeFilter);
        setSalaryRange(search.filters.salaryRange);
        setShowFilters(true);
    };

    const deleteSavedSearch = (id) => {
        if (confirm('Bạn có chắc muốn xóa tìm kiếm này?')) {
            const updated = savedSearches.filter(s => s.id !== id);
            setSavedSearches(updated);
            localStorage.setItem('savedSearches', JSON.stringify(updated));
        }
    };

    const userSavedSearches = savedSearches.filter(s => s.userId === user?.id);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tìm kiếm việc làm
                    </h1>
                    <p className="text-gray-600">
                        Tìm thấy {filteredJobs.length} việc làm phù hợp
                    </p>
                </div>

                {/* Saved Searches */}
                {user && userSavedSearches.length > 0 && (
                    <Card padding="md" className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">🔖 Tìm kiếm đã lưu</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {userSavedSearches.map(search => (
                                <div key={search.id} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                                    <button
                                        onClick={() => loadSavedSearch(search)}
                                        className="text-sm text-blue-700 hover:text-blue-900 font-medium"
                                    >
                                        {search.name} ({search.resultsCount})
                                    </button>
                                    <button
                                        onClick={() => deleteSavedSearch(search.id)}
                                        className="text-gray-400 hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                placeholder="Tìm kiếm theo vị trí, công ty, kỹ năng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tất cả địa điểm</option>
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.name}>{loc.name}</option>
                                    ))}
                                </select>
                            </div>
                            <Button
                                variant={showFilters ? 'primary' : 'outline'}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="w-5 h-5" />
                                {activeFiltersCount > 0 && (
                                    <span className="ml-1">({activeFiltersCount})</span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngành nghề
                                    </label>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tất cả ngành nghề</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cấp bậc
                                    </label>
                                    <select
                                        value={levelFilter}
                                        onChange={(e) => setLevelFilter(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tất cả cấp bậc</option>
                                        <option value="Intern">Thực tập sinh</option>
                                        <option value="Fresher">Fresher</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Middle">Middle</option>
                                        <option value="Senior">Senior</option>
                                        <option value="Lead">Team Lead</option>
                                        <option value="Manager">Quản lý</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hình thức
                                    </label>
                                    <select
                                        value={workTypeFilter}
                                        onChange={(e) => setWorkTypeFilter(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tất cả</option>
                                        <option value="Full-time">Toàn thời gian</option>
                                        <option value="Part-time">Bán thời gian</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mức lương
                                    </label>
                                    <select
                                        value={salaryRange}
                                        onChange={(e) => setSalaryRange(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả</option>
                                        <option value="under10">Dưới 10 triệu</option>
                                        <option value="10-20">10-20 triệu</option>
                                        <option value="20-30">20-30 triệu</option>
                                        <option value="over30">Trên 30 triệu</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quy mô công ty
                                    </label>
                                    <select
                                        value={companySizeFilter}
                                        onChange={(e) => setCompanySizeFilter(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Tất cả</option>
                                        <option value="1-50">1-50 nhân viên</option>
                                        <option value="51-200">51-200 nhân viên</option>
                                        <option value="201-500">201-500 nhân viên</option>
                                        <option value="500+">500+ nhân viên</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày đăng
                                    </label>
                                    <select
                                        value={postedDateFilter}
                                        onChange={(e) => setPostedDateFilter(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả</option>
                                        <option value="24h">24 giờ qua</option>
                                        <option value="7d">7 ngày qua</option>
                                        <option value="30d">30 ngày qua</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kỹ năng (chọn nhiều)
                                    </label>
                                    <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg max-h-32 overflow-y-auto">
                                        {allSkills.map(skill => (
                                            <label key={skill} className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={skillsFilter.includes(skill)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSkillsFilter([...skillsFilter, skill]);
                                                        } else {
                                                            setSkillsFilter(skillsFilter.filter(s => s !== skill));
                                                        }
                                                    }}
                                                    className="mr-1"
                                                />
                                                <span className="text-sm">{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phúc lợi (chọn nhiều)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {allBenefits.map(benefit => (
                                            <label key={benefit} className="inline-flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                                <input
                                                    type="checkbox"
                                                    checked={benefitsFilter.includes(benefit)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setBenefitsFilter([...benefitsFilter, benefit]);
                                                        } else {
                                                            setBenefitsFilter(benefitsFilter.filter(b => b !== benefit));
                                                        }
                                                    }}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{benefit}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {activeFiltersCount > 0 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        Đang áp dụng {activeFiltersCount} bộ lọc
                                    </p>
                                    <div className="flex gap-2">
                                        {user && (
                                            <Button variant="outline" size="sm" onClick={saveCurrentSearch}>
                                                <Bookmark className="w-4 h-4 mr-1" />
                                                Lưu tìm kiếm
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                                            <X className="w-4 h-4 mr-1" />
                                            Xóa bộ lọc
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Save Search Modal */}
                <Modal
                    isOpen={showSaveModal}
                    onClose={() => {
                        setShowSaveModal(false);
                        setSearchName('');
                    }}
                    title="Lưu tìm kiếm"
                >
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Đặt tên cho tìm kiếm này để dễ dàng sử dụng lại sau
                        </p>
                        <Input
                            label="Tên tìm kiếm"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="VD: Frontend Developer Hà Nội"
                            autoFocus
                        />
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 mb-2">Điều kiện:</p>
                            <div className="flex flex-wrap gap-2">
                                {searchTerm && <Badge variant="primary">{searchTerm}</Badge>}
                                {locationFilter && <Badge variant="success">{locationFilter}</Badge>}
                                {categoryFilter && <Badge variant="info">{categoryFilter}</Badge>}
                                {levelFilter && <Badge variant="warning">{levelFilter}</Badge>}
                                {workTypeFilter && <Badge variant="default">{workTypeFilter}</Badge>}
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowSaveModal(false);
                                    setSearchName('');
                                }}
                            >
                                Hủy
                            </Button>
                            <Button onClick={confirmSaveSearch}>
                                <BookmarkCheck className="w-4 h-4 mr-2" />
                                Lưu
                            </Button>
                        </div>
                    </div>
                </Modal>

                {/* Jobs List */}
                <div className="space-y-4">
                    {filteredJobs.length === 0 ? (
                        <Card padding="lg" className="text-center">
                            <div className="py-12">
                                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Không tìm thấy việc làm
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                                </p>
                                <Button onClick={clearFilters}>
                                    Xóa tất cả bộ lọc
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        filteredJobs.map(job => (
                            <Card key={job.id} padding="md" hover>
                                <Link to={`/jobs/${job.id}`}>
                                    <div className="flex items-start gap-4">
                                        {/* Company Logo */}
                                        <CompanyLogo
                                            src={job.employerLogo}
                                            companyName={job.employerName}
                                            alt={job.employerName}
                                            size="md"
                                            className="flex-shrink-0"
                                        />

                                        {/* Job Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-1">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-gray-600 font-medium">
                                                        {job.employerName}
                                                    </p>
                                                </div>
                                                {job.featured && (
                                                    <Badge variant="warning" className="ml-2">
                                                        ⭐ Nổi bật
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Job Details */}
                                            <div className="grid md:grid-cols-3 gap-3 mb-3">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    {job.salary.negotiable ? 'Thỏa thuận' :
                                                        `${(job.salary.min / 1000000).toFixed(0)}-${(job.salary.max / 1000000).toFixed(0)} triệu`}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    {new Date(job.postedDate).toLocaleDateString('vi-VN')}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="primary">{job.level}</Badge>
                                                <Badge variant="success">{job.workType}</Badge>
                                                {job.urgent && <Badge variant="danger">🔥 Gấp</Badge>}
                                                {job.skills.slice(0, 3).map((skill, idx) => (
                                                    <Badge key={idx} variant="default">{skill}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
