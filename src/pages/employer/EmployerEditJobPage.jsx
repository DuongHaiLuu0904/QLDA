import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Briefcase, MapPin, DollarSign, Users, Calendar, FileText, Plus, X, ArrowLeft } from 'lucide-react';

const EmployerEditJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, updateJob, categories, locations } = useData();
  
  const [loading, setLoading] = useState(true);
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
    featured: false,
    status: 'active'
  });

  useEffect(() => {
    const job = jobs.find(j => j.id === parseInt(id));
    if (job) {
      if (job.employerId !== user?.id) {
        alert('Bạn không có quyền chỉnh sửa tin tuyển dụng này!');
        navigate('/employer/jobs');
        return;
      }

      setFormData({
        title: job.title || '',
        category: job.category || '',
        location: job.location || '',
        level: job.level || 'Junior',
        workType: job.workType || 'Full-time',
        positions: job.slots || 1,
        salaryMin: job.salary?.min || '',
        salaryMax: job.salary?.max || '',
        salaryNegotiable: job.salary?.negotiable || false,
        deadline: job.expiryDate || '',
        description: job.description || '',
        requirements: job.requirements && job.requirements.length > 0 ? job.requirements : [''],
        benefits: job.benefits && job.benefits.length > 0 ? job.benefits : [''],
        skills: job.skills && job.skills.length > 0 ? job.skills : [''],
        urgent: job.urgent || false,
        featured: job.featured || false,
        status: job.status || 'active'
      });
      setLoading(false);
    } else {
      alert('Không tìm thấy tin tuyển dụng!');
      navigate('/employer/jobs');
    }
  }, [id, jobs, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      level: formData.level,
      workType: formData.workType,
      slots: parseInt(formData.positions),
      salary: {
        min: formData.salaryNegotiable ? 0 : parseInt(formData.salaryMin),
        max: formData.salaryNegotiable ? 0 : parseInt(formData.salaryMax),
        negotiable: formData.salaryNegotiable,
        currency: 'VND',
        period: 'tháng'
      },
      expiryDate: formData.deadline,
      description: formData.description,
      requirements: formData.requirements.filter(r => r.trim() !== ''),
      benefits: formData.benefits.filter(b => b.trim() !== ''),
      skills: formData.skills.filter(s => s.trim() !== ''),
      urgent: formData.urgent,
      featured: formData.featured,
      status: formData.status
    };

    updateJob(parseInt(id), jobData);
    alert('Cập nhật tin tuyển dụng thành công!');
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/employer/jobs')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa tin tuyển dụng</h1>
          <p className="text-gray-600">Cập nhật thông tin tin tuyển dụng của bạn</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Thông tin cơ bản
            </h2>

            <Input
              label="Tiêu đề công việc"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ví dụ: Senior React Developer"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngành nghề
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Chọn ngành nghề</option>
                  <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                  <option value="Thiết kế">Thiết kế</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Kinh doanh">Kinh doanh</option>
                  <option value="Kế toán">Kế toán</option>
                  <option value="Nhân sự">Nhân sự</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Chọn địa điểm</option>
                  <option value="TP.HCM">TP.HCM</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp bậc
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Intern">Intern</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Leader">Leader</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại hình
                </label>
                <select
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <Input
                label="Số lượng"
                type="number"
                name="positions"
                value={formData.positions}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>
        </Card>

        {/* Salary */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Mức lương
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="salaryNegotiable"
                id="salaryNegotiable"
                checked={formData.salaryNegotiable}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="salaryNegotiable" className="text-sm text-gray-700">
                Lương thỏa thuận
              </label>
            </div>

            {!formData.salaryNegotiable && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Lương tối thiểu (VND)"
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="10000000"
                  required
                />
                <Input
                  label="Lương tối đa (VND)"
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="20000000"
                  required
                />
              </div>
            )}
          </div>
        </Card>

        {/* Job Details */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Chi tiết công việc
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả công việc
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mô tả chi tiết về công việc, trách nhiệm, yêu cầu..."
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yêu cầu công việc
              </label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateField('requirements', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ví dụ: 3+ năm kinh nghiệm React"
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeField('requirements', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField('requirements')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm yêu cầu
              </Button>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kỹ năng yêu cầu
              </label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateField('skills', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ví dụ: React, Node.js"
                  />
                  {formData.skills.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeField('skills', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField('skills')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm kỹ năng
              </Button>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phúc lợi
              </label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateField('benefits', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ví dụ: Bảo hiểm sức khỏe"
                  />
                  {formData.benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeField('benefits', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField('benefits')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phúc lợi
              </Button>
            </div>
          </div>
        </Card>

        {/* Options */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Tùy chọn
            </h2>

            <Input
              label="Hạn nộp hồ sơ"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Đang tuyển</option>
                <option value="closed">Đã đóng</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="urgent"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="urgent" className="text-sm text-gray-700">
                  Tuyển gấp
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Tin nổi bật
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/employer/jobs')}
          >
            Hủy
          </Button>
          <Button type="submit">
            Cập nhật tin tuyển dụng
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployerEditJobPage;
