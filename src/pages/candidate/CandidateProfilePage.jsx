import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Plus, Trash2, Upload, Camera, Download, X, FileJson } from 'lucide-react';

const CandidateProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
    const [cvFiles, setCvFiles] = useState(user?.candidateProfile?.cvFiles || []);
    const [cvFile, setCvFile] = useState(user?.candidateProfile?.cvFile || null); // Legacy single CV
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.candidateProfile?.address || '',
        bio: user?.candidateProfile?.bio || '',
        title: user?.candidateProfile?.title || '',
        experience: user?.candidateProfile?.experience || [],
        education: user?.candidateProfile?.education || [],
        skills: user?.candidateProfile?.skills || [],
        languages: user?.candidateProfile?.languages || []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({
            ...user,
            name: formData.name,
            phone: formData.phone,
            avatar: avatarPreview,
            candidateProfile: {
                ...user.candidateProfile,
                address: formData.address,
                bio: formData.bio,
                title: formData.title,
                experience: formData.experience,
                education: formData.education,
                skills: formData.skills,
                languages: formData.languages,
                cvFiles: cvFiles,
                cvFile: cvFile // Keep legacy
            }
        });
        setIsEditing(false);
        alert('Cập nhật hồ sơ thành công!');
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Kích thước ảnh không được vượt quá 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert('Kích thước file không được vượt quá 10MB');
                return;
            }
            if (file.type !== 'application/pdf') {
                alert('Chỉ chấp nhận file PDF');
                return;
            }

            const cvName = prompt('Tên cho CV này (VD: Frontend Developer CV):');
            if (!cvName) return;

            const newCv = {
                id: Date.now(),
                name: cvName,
                fileName: file.name,
                size: file.size,
                uploadDate: new Date().toISOString(),
                isPrimary: cvFiles.length === 0
            };

            setCvFiles([...cvFiles, newCv]);
            alert('Upload CV thành công!');
        }
    };

    const handleRemoveCv = (cvId) => {
        if (confirm('Bạn có chắc muốn xóa CV này?')) {
            const updatedCvs = cvFiles.filter(cv => cv.id !== cvId);
            // If removed CV was primary and there are others, make first one primary
            if (cvFiles.find(cv => cv.id === cvId)?.isPrimary && updatedCvs.length > 0) {
                updatedCvs[0].isPrimary = true;
            }
            setCvFiles(updatedCvs);
        }
    };

    const setPrimaryCv = (cvId) => {
        const updated = cvFiles.map(cv => ({
            ...cv,
            isPrimary: cv.id === cvId
        }));
        setCvFiles(updated);
    };

    const handleDownloadCv = () => {
        // In a real app, this would download the actual file
        alert('Tính năng tải xuống CV sẽ được triển khai khi có backend');
    };

    const exportProfileJSON = () => {
        const profileData = {
            personalInfo: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                title: formData.title,
                bio: formData.bio
            },
            experience: formData.experience,
            education: formData.education,
            skills: formData.skills,
            languages: formData.languages,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `profile_${user.name}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Đã tải xuống hồ sơ dạng JSON!');
    };

    const exportProfilePDF = () => {
        // Create a simple HTML representation
        const htmlContent = `
            <html>
            <head>
                <title>Hồ sơ - ${formData.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                    h2 { color: #1f2937; margin-top: 30px; }
                    .section { margin-bottom: 20px; }
                    .item { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #4b5563; }
                </style>
            </head>
            <body>
                <h1>${formData.name}</h1>
                <div class="section">
                    <p><span class="label">Email:</span> ${formData.email}</p>
                    <p><span class="label">Điện thoại:</span> ${formData.phone}</p>
                    <p><span class="label">Địa chỉ:</span> ${formData.address}</p>
                    <p><span class="label">Vị trí:</span> ${formData.title}</p>
                    <p><span class="label">Giới thiệu:</span> ${formData.bio}</p>
                </div>
                
                <h2>Kinh nghiệm làm việc</h2>
                ${formData.experience.map(exp => `
                    <div class="item">
                        <p><span class="label">${exp.position}</span> tại ${exp.company}</p>
                        <p>${exp.startDate} - ${exp.endDate}</p>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
                
                <h2>Học vấn</h2>
                ${formData.education.map(edu => `
                    <div class="item">
                        <p><span class="label">${edu.degree}</span> - ${edu.field}</p>
                        <p>${edu.school}</p>
                        <p>${edu.startDate} - ${edu.endDate}</p>
                    </div>
                `).join('')}
                
                <h2>Kỹ năng</h2>
                <p>${formData.skills.map(s => s.name).join(', ')}</p>
                
                <h2>Ngôn ngữ</h2>
                <p>${formData.languages.map(l => `${l.name} (${l.level})`).join(', ')}</p>
            </body>
            </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `profile_${user.name}_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Đã tải xuống hồ sơ dạng HTML! Bạn có thể mở file và in ra PDF từ trình duyệt.');
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [
                ...formData.experience,
                { company: '', position: '', startDate: '', endDate: '', description: '' }
            ]
        });
    };

    const removeExperience = (index) => {
        setFormData({
            ...formData,
            experience: formData.experience.filter((_, i) => i !== index)
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [
                ...formData.education,
                { school: '', degree: '', field: '', startDate: '', endDate: '' }
            ]
        });
    };

    const removeEducation = (index) => {
        setFormData({
            ...formData,
            education: formData.education.filter((_, i) => i !== index)
        });
    };

    const addSkill = () => {
        const skill = prompt('Nhập kỹ năng:');
        if (skill) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skill]
            });
        }
    };

    const removeSkill = (index) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Hồ sơ của tôi
                    </h1>
                    <p className="text-gray-600">
                        Quản lý thông tin cá nhân và kinh nghiệm làm việc
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={exportProfileJSON}>
                        <FileJson className="w-4 h-4 mr-2" />
                        Xuất JSON
                    </Button>
                    <Button variant="outline" onClick={exportProfilePDF}>
                        <Download className="w-4 h-4 mr-2" />
                        Xuất HTML
                    </Button>
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
                                Lưu thay đổi
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Upload */}
                <Card padding="lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Ảnh đại diện
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                                {avatarPreview ? (
                                    <img 
                                        src={avatarPreview} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-100">
                                        <User className="w-16 h-16 text-blue-600" />
                                    </div>
                                )}
                            </div>
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                    <Camera className="w-5 h-5" />
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                            <p className="text-gray-600 text-sm">{formData.title || 'Chưa cập nhật chức danh'}</p>
                            {isEditing && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Nhấp vào biểu tượng camera để thay đổi ảnh. Tối đa 5MB.
                                </p>
                            )}
                        </div>
                    </div>
                </Card>

                {/* CV Upload - Multiple CVs */}
                <Card padding="lg">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Quản lý CV
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Tải lên nhiều phiên bản CV cho các vị trí khác nhau
                            </p>
                        </div>
                        {isEditing && (
                            <label>
                                <span className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Thêm CV mới
                                </span>
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    className="hidden" 
                                    onChange={handleCvUpload}
                                />
                            </label>
                        )}
                    </div>

                    {cvFiles.length > 0 ? (
                        <div className="space-y-3">
                            {cvFiles.map((cv) => (
                                <div 
                                    key={cv.id}
                                    className={`border rounded-lg p-4 ${
                                        cv.isPrimary ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className={`p-3 rounded-lg ${
                                                cv.isPrimary ? 'bg-blue-600' : 'bg-gray-600'
                                            } text-white`}>
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-gray-900">{cv.name}</p>
                                                    {cv.isPrimary && (
                                                        <Badge variant="primary" size="sm">Mặc định</Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {cv.fileName} • {(cv.size / 1024).toFixed(2)} KB
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(cv.uploadDate).toLocaleDateString('vi-VN')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!cv.isPrimary && isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => setPrimaryCv(cv.id)}
                                                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                                >
                                                    Đặt mặc định
                                                </button>
                                            )}
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCv(cv.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Xóa"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : cvFile ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-3">Bạn đang sử dụng CV cũ. Hãy tải lên CV mới để quản lý nhiều phiên bản!</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{cvFile.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {(cvFile.size / 1024).toFixed(2)} KB - 
                                            Tải lên {new Date(cvFile.uploadDate).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleDownloadCv}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Tải xuống CV"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveCv}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Xóa CV"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Chưa có CV nào được tải lên</p>
                            {isEditing && (
                                <label className="inline-block">
                                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                                        Tải lên CV (PDF)
                                    </span>
                                    <input 
                                        type="file" 
                                        accept=".pdf" 
                                        className="hidden" 
                                        onChange={handleCvUpload}
                                    />
                                </label>
                            )}
                            <p className="text-xs text-gray-500 mt-2">Chỉ chấp nhận file PDF, tối đa 10MB</p>
                        </div>
                    )}
                </Card>

                {/* Basic Info */}
                <Card padding="lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Thông tin cơ bản
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            label="Họ và tên"
                            icon={<User className="w-5 h-5" />}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Email"
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.email}
                            disabled
                        />
                        <Input
                            label="Số điện thoại"
                            icon={<Phone className="w-5 h-5" />}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Địa chỉ"
                            icon={<MapPin className="w-5 h-5" />}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            label="Chức danh mong muốn"
                            icon={<Briefcase className="w-5 h-5" />}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            disabled={!isEditing}
                            placeholder="VD: Senior Frontend Developer"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Giới thiệu bản thân
                        </label>
                        <textarea
                            rows={4}
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                            placeholder="Viết vài dòng giới thiệu về bản thân..."
                        />
                    </div>
                </Card>

                {/* Experience */}
                <Card padding="lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Kinh nghiệm làm việc
                        </h2>
                        {isEditing && (
                            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                                <Plus className="w-4 h-4 mr-1" />
                                Thêm
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {formData.experience.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">
                                Chưa có kinh nghiệm làm việc
                            </p>
                        ) : (
                            formData.experience.map((exp, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    {isEditing && (
                                        <div className="flex justify-end mb-2">
                                            <button
                                                type="button"
                                                onClick={() => removeExperience(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            label="Công ty"
                                            value={exp.company}
                                            onChange={(e) => {
                                                const newExp = [...formData.experience];
                                                newExp[index].company = e.target.value;
                                                setFormData({ ...formData, experience: newExp });
                                            }}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Vị trí"
                                            value={exp.position}
                                            onChange={(e) => {
                                                const newExp = [...formData.experience];
                                                newExp[index].position = e.target.value;
                                                setFormData({ ...formData, experience: newExp });
                                            }}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Từ"
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => {
                                                const newExp = [...formData.experience];
                                                newExp[index].startDate = e.target.value;
                                                setFormData({ ...formData, experience: newExp });
                                            }}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Đến"
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => {
                                                const newExp = [...formData.experience];
                                                newExp[index].endDate = e.target.value;
                                                setFormData({ ...formData, experience: newExp });
                                            }}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mô tả công việc
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={exp.description}
                                            onChange={(e) => {
                                                const newExp = [...formData.experience];
                                                newExp[index].description = e.target.value;
                                                setFormData({ ...formData, experience: newExp });
                                            }}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Education */}
                <Card padding="lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Học vấn
                        </h2>
                        {isEditing && (
                            <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                                <Plus className="w-4 h-4 mr-1" />
                                Thêm
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {formData.education.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">
                                Chưa có thông tin học vấn
                            </p>
                        ) : (
                            formData.education.map((edu, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    {isEditing && (
                                        <div className="flex justify-end mb-2">
                                            <button
                                                type="button"
                                                onClick={() => removeEducation(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            label="Trường"
                                            value={edu.school}
                                            onChange={(e) => {
                                                const newEdu = [...formData.education];
                                                newEdu[index].school = e.target.value;
                                                setFormData({ ...formData, education: newEdu });
                                            }}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Bằng cấp"
                                            value={edu.degree}
                                            onChange={(e) => {
                                                const newEdu = [...formData.education];
                                                newEdu[index].degree = e.target.value;
                                                setFormData({ ...formData, education: newEdu });
                                            }}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Chuyên ngành"
                                            value={edu.field}
                                            onChange={(e) => {
                                                const newEdu = [...formData.education];
                                                newEdu[index].field = e.target.value;
                                                setFormData({ ...formData, education: newEdu });
                                            }}
                                            disabled={!isEditing}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                label="Từ"
                                                type="number"
                                                value={edu.startDate}
                                                onChange={(e) => {
                                                    const newEdu = [...formData.education];
                                                    newEdu[index].startDate = e.target.value;
                                                    setFormData({ ...formData, education: newEdu });
                                                }}
                                                disabled={!isEditing}
                                                placeholder="2020"
                                            />
                                            <Input
                                                label="Đến"
                                                type="number"
                                                value={edu.endDate}
                                                onChange={(e) => {
                                                    const newEdu = [...formData.education];
                                                    newEdu[index].endDate = e.target.value;
                                                    setFormData({ ...formData, education: newEdu });
                                                }}
                                                disabled={!isEditing}
                                                placeholder="2024"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Skills */}
                <Card padding="lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Kỹ năng
                        </h2>
                        {isEditing && (
                            <Button type="button" variant="outline" size="sm" onClick={addSkill}>
                                <Plus className="w-4 h-4 mr-1" />
                                Thêm
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills.length === 0 ? (
                            <p className="text-gray-500 text-center py-4 w-full">
                                Chưa có kỹ năng nào
                            </p>
                        ) : (
                            formData.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2"
                                >
                                    <span>{skill}</span>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            className="text-blue-700 hover:text-blue-900"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default CandidateProfilePage;
