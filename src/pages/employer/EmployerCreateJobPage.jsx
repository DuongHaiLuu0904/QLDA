import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Briefcase, MapPin, DollarSign, Users, Calendar, FileText, Plus, X } from 'lucide-react';

const EmployerCreateJobPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createJob, categories, locations } = useData();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    level: 'Junior',
    workType: 'Full-time',
    positions: 1,
    salaryMin: '',
    salaryMax: '',
    salaryNegotiable: false,
    deadline: '',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [''],
    urgent: false,
    featured: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      employerId: user.id,
      employerName: user.companyProfile?.companyName || user.name,
      employerLogo: user.companyProfile?.logo || 'https://via.placeholder.com/150',
      title: formData.title,
      category: formData.category,
      location: formData.location,
      level: formData.level,
      workType: formData.workType,
      positions: parseInt(formData.positions),
      salary: {
        min: formData.salaryNegotiable ? 0 : parseInt(formData.salaryMin),
        max: formData.salaryNegotiable ? 0 : parseInt(formData.salaryMax),
        negotiable: formData.salaryNegotiable
      },
      deadline: formData.deadline,
      description: formData.description,
      requirements: formData.requirements.filter(r => r.trim() !== ''),
      benefits: formData.benefits.filter(b => b.trim() !== ''),
      skills: formData.skills.filter(s => s.trim() !== ''),
      urgent: formData.urgent,
      featured: formData.featured,
      status: 'active',
      postedDate: new Date().toISOString().split('T')[0],
      views: 0
    };

    createJob(jobData);
    alert('Đăng tin tuyển dụng thành công!');
    navigate('/employer/jobs');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeField = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const updateField = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Đăng tin tuyển dụng mới
        </h1>
        <p className="text-gray-600">
          Điền thông tin để đăng tin tuyển dụng
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Thông tin cơ bản
          </h2>
          
          <div className="space-y-4">
            <Input
              label="Tiêu đề công việc"
              name="title"
              required
              icon={<Briefcase className="w-5 h-5" />}
              value={formData.title}
              onChange={handleChange}
              placeholder="VD: Senior Frontend Developer"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngành nghề <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn ngành nghề</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm <span className="text-red-500">*</span>
                </label>
                <select
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn địa điểm</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp bậc <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  required
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
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
                  Hình thức <span className="text-red-500">*</span>
                </label>
                <select
                  name="workType"
                  required
                  value={formData.workType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Toàn thời gian</option>
                  <option value="Part-time">Bán thời gian</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <Input
                label="Số lượng"
                name="positions"
                type="number"
                required
                min="1"
                icon={<Users className="w-5 h-5" />}
                value={formData.positions}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="salaryNegotiable"
                  checked={formData.salaryNegotiable}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Lương thỏa thuận
                </label>
              </div>

              {!formData.salaryNegotiable && (
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Lương tối thiểu (VND)"
                    name="salaryMin"
                    type="number"
                    required
                    icon={<DollarSign className="w-5 h-5" />}
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="10000000"
                  />
                  <Input
                    label="Lương tối đa (VND)"
                    name="salaryMax"
                    type="number"
                    required
                    icon={<DollarSign className="w-5 h-5" />}
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="20000000"
                  />
                </div>
              )}
            </div>

            <Input
              label="Hạn nộp hồ sơ"
              name="deadline"
              type="date"
              required
              icon={<Calendar className="w-5 h-5" />}
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </Card>

        {/* Description */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Mô tả công việc
          </h2>
          <textarea
            name="description"
            required
            rows={8}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả chi tiết về công việc, trách nhiệm, môi trường làm việc..."
          />
        </Card>

        {/* Requirements */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Yêu cầu ứng viên
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addField('requirements')}>
              <Plus className="w-4 h-4 mr-1" />
              Thêm
            </Button>
          </div>
          <div className="space-y-3">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateField('requirements', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: 2+ năm kinh nghiệm React"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('requirements', index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Skills */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Kỹ năng yêu cầu
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addField('skills')}>
              <Plus className="w-4 h-4 mr-1" />
              Thêm
            </Button>
          </div>
          <div className="space-y-3">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateField('skills', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: React, TypeScript, Node.js"
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('skills', index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Benefits */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Quyền lợi
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addField('benefits')}>
              <Plus className="w-4 h-4 mr-1" />
              Thêm
            </Button>
          </div>
          <div className="space-y-3">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => updateField('benefits', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Bảo hiểm sức khỏe cao cấp"
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('benefits', index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Options */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tùy chọn
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="urgent"
                checked={formData.urgent}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Tuyển gấp (hiển thị badge "Gấp")
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Tin nổi bật (hiển thị ưu tiên)
              </label>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/employer/jobs')}
            className="flex-1"
          >
            Hủy
          </Button>
          <Button type="submit" className="flex-1">
            Đăng tin tuyển dụng
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployerCreateJobPage;
