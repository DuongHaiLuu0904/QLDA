import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Plus, Trash2 } from 'lucide-react';

const CandidateProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
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
            candidateProfile: {
                ...user.candidateProfile,
                address: formData.address,
                bio: formData.bio,
                title: formData.title,
                experience: formData.experience,
                education: formData.education,
                skills: formData.skills,
                languages: formData.languages
            }
        });
        setIsEditing(false);
        alert('Cập nhật hồ sơ thành công!');
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
