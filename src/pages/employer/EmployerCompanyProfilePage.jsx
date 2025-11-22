import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { 
  Building2, Globe, MapPin, Phone, Mail, Users, 
  Calendar, Shield, Upload, X, Plus, Save, CheckCircle 
} from 'lucide-react';

const EmployerCompanyProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const [formData, setFormData] = useState({
    companyName: user?.companyProfile?.companyName || user?.name || '',
    taxCode: user?.companyProfile?.taxCode || '',
    industry: user?.companyProfile?.industry || '',
    companySize: user?.companyProfile?.companySize || '',
    website: user?.companyProfile?.website || '',
    address: user?.companyProfile?.address || '',
    phone: user?.phone || '',
    email: user?.email || '',
    description: user?.companyProfile?.description || '',
    logo: user?.companyProfile?.logo || user?.logo || '',
    banner: user?.companyProfile?.banner || user?.banner || '',
    benefits: user?.companyProfile?.benefits || [''],
    isVerified: user?.companyProfile?.isVerified || user?.isVerified || false,
    verificationDate: user?.companyProfile?.verificationDate || user?.verifiedDate || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({
      ...formData,
      benefits: newBenefits
    });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, '']
    });
  };

  const removeBenefit = (index) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index)
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingLogo(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, logo: reader.result });
          setUploadingLogo(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingBanner(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, banner: reader.result });
          setUploadingBanner(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedUser = {
      ...user,
      name: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      logo: formData.logo,
      banner: formData.banner,
      companyProfile: {
        companyName: formData.companyName,
        taxCode: formData.taxCode,
        industry: formData.industry,
        companySize: formData.companySize,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        logo: formData.logo,
        banner: formData.banner,
        benefits: formData.benefits.filter(b => b.trim() !== ''),
        isVerified: formData.isVerified,
        verificationDate: formData.verificationDate
      }
    };

    updateUser(updatedUser);
    setIsEditing(false);
    alert('Cập nhật hồ sơ công ty thành công!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ công ty</h1>
          <p className="text-gray-600">Quản lý thông tin và hình ảnh công ty của bạn</p>
        </div>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        )}
      </div>

      {/* Verification Status */}
      {formData.isVerified && (
        <Card>
          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Công ty đã được xác thực</p>
                <p className="text-sm text-green-700">
                  Xác thực vào ngày {new Date(formData.verificationDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner & Logo */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Hình ảnh công ty
            </h2>

            {/* Banner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner (1200x300px)
              </label>
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                {formData.banner ? (
                  <img
                    src={formData.banner}
                    alt="Company banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Upload className="h-12 w-12" />
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer">
                      <div className="bg-white px-4 py-2 rounded-lg text-sm font-medium">
                        {uploadingBanner ? 'Đang tải...' : 'Thay đổi banner'}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        className="hidden"
                        disabled={uploadingBanner}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (300x300px)
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Company logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Building2 className="h-12 w-12" />
                    </div>
                  )}
                  
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <label className="cursor-pointer">
                        <div className="bg-white px-3 py-1 rounded text-xs font-medium">
                          {uploadingLogo ? 'Đang tải...' : 'Thay đổi'}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          disabled={uploadingLogo}
                        />
                      </label>
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div className="text-sm text-gray-600">
                    <p>Tải lên logo công ty của bạn</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Định dạng: JPG, PNG. Tối đa 2MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              Thông tin cơ bản
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tên công ty"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />

              <Input
                label="Mã số thuế"
                name="taxCode"
                value={formData.taxCode}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngành nghề
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  required
                >
                  <option value="">Chọn ngành nghề</option>
                  <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                  <option value="Thương mại điện tử">Thương mại điện tử</option>
                  <option value="Tài chính - Ngân hàng">Tài chính - Ngân hàng</option>
                  <option value="Giáo dục">Giáo dục</option>
                  <option value="Y tế">Y tế</option>
                  <option value="Sản xuất">Sản xuất</option>
                  <option value="Dịch vụ">Dịch vụ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quy mô công ty
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  required
                >
                  <option value="">Chọn quy mô</option>
                  <option value="1-50">1-50 nhân viên</option>
                  <option value="50-100">50-100 nhân viên</option>
                  <option value="100-500">100-500 nhân viên</option>
                  <option value="500-1000">500-1000 nhân viên</option>
                  <option value="1000+">1000+ nhân viên</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              Thông tin liên hệ
            </h2>

            <Input
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="https://example.com"
              icon={Globe}
            />

            <Input
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Số nhà, đường, quận/huyện, thành phố"
              icon={MapPin}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Số điện thoại"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                icon={Phone}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                icon={Mail}
                required
              />
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Giới thiệu công ty
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="Giới thiệu về công ty, văn hóa làm việc, sản phẩm/dịch vụ..."
                required
              />
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-600" />
              Phúc lợi
            </h2>

            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Ví dụ: Bảo hiểm sức khỏe cao cấp"
                />
                {isEditing && formData.benefits.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeBenefit(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={addBenefit}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phúc lợi
              </Button>
            )}
          </div>
        </Card>

        {/* Verification Status (Read-only) */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Trạng thái xác thực
            </h2>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${formData.isVerified ? 'bg-green-100' : 'bg-gray-200'}`}>
                  <Shield className={`h-5 w-5 ${formData.isVerified ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {formData.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                  </p>
                  {formData.isVerified && formData.verificationDate && (
                    <p className="text-sm text-gray-600">
                      Xác thực: {new Date(formData.verificationDate).toLocaleDateString('vi-VN')}
                    </p>
                  )}
                </div>
              </div>
              
              {formData.isVerified && (
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            {!formData.isVerified && (
              <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-900 mb-2">💡 Lợi ích khi xác thực:</p>
                <ul className="space-y-1 text-blue-700 ml-4 list-disc">
                  <li>Tăng độ tin cậy với ứng viên</li>
                  <li>Hiển thị huy hiệu "Verified" trên tin tuyển dụng</li>
                  <li>Ưu tiên trong kết quả tìm kiếm</li>
                  <li>Truy cập tính năng nâng cao</li>
                </ul>
              </div>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EmployerCompanyProfilePage;
