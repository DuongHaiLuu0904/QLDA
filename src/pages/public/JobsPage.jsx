import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Filter, X, DollarSign, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const JobsPage = () => {
  const { jobs, categories, locations } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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

      return matchesSearch && matchesLocation && matchesCategory && 
             matchesLevel && matchesWorkType && matchesSalary;
    });
  }, [jobs, searchTerm, locationFilter, categoryFilter, levelFilter, workTypeFilter, salaryRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setCategoryFilter('');
    setLevelFilter('');
    setWorkTypeFilter('');
    setSalaryRange('all');
  };

  const activeFiltersCount = [
    searchTerm,
    locationFilter,
    categoryFilter,
    levelFilter,
    workTypeFilter,
    salaryRange !== 'all' ? salaryRange : ''
  ].filter(f => f !== '').length;

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
              </div>

              {activeFiltersCount > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Đang áp dụng {activeFiltersCount} bộ lọc
                  </p>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

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
                    <img
                      src={job.employerLogo}
                      alt={job.employerName}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
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
