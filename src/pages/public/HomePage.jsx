import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, TrendingUp, Users, Building2, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import CompanyLogo from '../../components/common/CompanyLogo';
import { useData } from '../../context/DataContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { jobs, categories, locations } = useData();
    const featuredJobs = jobs.filter(j => j.featured).slice(0, 6);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchKeyword) params.set('search', searchKeyword);
        if (searchLocation) params.set('location', searchLocation);
        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Tìm Công Việc Mơ Ước Của Bạn
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            Hơn 10,000+ việc làm đang chờ bạn khám phá
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                                <Search className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Vị trí, công ty, kỹ năng..."
                                    className="flex-1 py-3 text-gray-900 focus:outline-none"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 flex items-center px-4">
                                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                <select
                                    className="flex-1 py-3 text-gray-900 focus:outline-none bg-transparent"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                >
                                    <option value="">Tất cả địa điểm</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.name}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Button type="submit" size="lg" className="md:w-auto">
                                <Search className="w-5 h-5 mr-2" />
                                Tìm kiếm
                            </Button>
                        </form>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
                            <div className="text-blue-100">Việc làm</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold mb-2">5,000+</div>
                            <div className="text-blue-100">Công ty</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold mb-2">50,000+</div>
                            <div className="text-blue-100">Ứng viên</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
                            <div className="text-blue-100">Hài lòng</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ngành nghề phổ biến
                        </h2>
                        <p className="text-lg text-gray-600">
                            Khám phá cơ hội việc làm theo ngành nghề
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.slice(0, 8).map((category) => (
                            <Link
                                key={category.id}
                                to={`/jobs?category=${category.slug}`}
                                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Briefcase className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                                    <Badge variant="default">{category.count}</Badge>
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Jobs */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Việc làm nổi bật
                            </h2>
                            <p className="text-lg text-gray-600">
                                Cơ hội việc làm tốt nhất dành cho bạn
                            </p>
                        </div>
                        <Link to="/jobs">
                            <Button variant="outline">
                                Xem tất cả
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredJobs.map((job) => (
                            <Card key={job.id} padding="md" hover>
                                <Link to={`/jobs/${job.id}`}>
                                    <div className="flex items-start space-x-4 mb-4">
                                        <CompanyLogo
                                            src={job.employerLogo}
                                            companyName={job.employerName}
                                            alt={job.employerName}
                                            size="sm"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">{job.employerName}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            {job.salary.negotiable ? 'Lương thỏa thuận' :
                                                `${(job.salary.min / 1000000).toFixed(0)} - ${(job.salary.max / 1000000).toFixed(0)} triệu`}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge variant="primary">{job.level}</Badge>
                                        <Badge variant="success">{job.workType}</Badge>
                                        {job.urgent && <Badge variant="danger">Gấp</Badge>}
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {new Date(job.postedDate).toLocaleDateString('vi-VN')}
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* For Candidates */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                            <Users className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Dành cho ứng viên</h3>
                            <p className="text-blue-100 mb-6">
                                Tạo hồ sơ miễn phí, tìm kiếm và ứng tuyển vào hàng nghìn công việc hấp dẫn
                            </p>
                            <Link to="/register">
                                <Button variant="secondary" size="lg">
                                    Đăng ký ngay
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>

                        {/* For Employers */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                            <Building2 className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Dành cho nhà tuyển dụng</h3>
                            <p className="text-blue-100 mb-6">
                                Đăng tin tuyển dụng, tiếp cận hàng nghìn ứng viên chất lượng cao
                            </p>
                            <Link to="/employer/register">
                                <Button variant="secondary" size="lg">
                                    Đăng tin miễn phí
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
