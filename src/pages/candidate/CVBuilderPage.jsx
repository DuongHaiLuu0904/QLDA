import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Download, Eye, Edit3, Trash2, Plus, GripVertical } from 'lucide-react';

const CVBuilderPage = () => {
    const { user } = useAuth();
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [previewMode, setPreviewMode] = useState(false);
    const [cvData, setCvData] = useState({
        personalInfo: {
            fullName: user?.name || '',
            title: user?.candidateProfile?.title || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.candidateProfile?.address || '',
            summary: user?.candidateProfile?.bio || ''
        },
        sections: [
            { id: 'experience', title: 'Kinh nghiệm làm việc', enabled: true, order: 1 },
            { id: 'education', title: 'Học vấn', enabled: true, order: 2 },
            { id: 'skills', title: 'Kỹ năng', enabled: true, order: 3 },
            { id: 'languages', title: 'Ngôn ngữ', enabled: true, order: 4 },
            { id: 'certifications', title: 'Chứng chỉ', enabled: false, order: 5 },
            { id: 'projects', title: 'Dự án', enabled: false, order: 6 }
        ],
        experience: user?.candidateProfile?.experience || [],
        education: user?.candidateProfile?.education || [],
        skills: user?.candidateProfile?.skills || [],
        languages: user?.candidateProfile?.languages || []
    });

    const templates = [
        { 
            id: 'modern', 
            name: 'Modern', 
            description: 'Thiết kế hiện đại, màu sắc nổi bật',
            color: 'blue'
        },
        { 
            id: 'classic', 
            name: 'Classic', 
            description: 'Truyền thống, chuyên nghiệp',
            color: 'gray'
        },
        { 
            id: 'creative', 
            name: 'Creative', 
            description: 'Sáng tạo, phù hợp ngành design',
            color: 'purple'
        }
    ];

    const handleInputChange = (section, field, value) => {
        setCvData({
            ...cvData,
            [section]: {
                ...cvData[section],
                [field]: value
            }
        });
    };

    const toggleSection = (sectionId) => {
        setCvData({
            ...cvData,
            sections: cvData.sections.map(s => 
                s.id === sectionId ? { ...s, enabled: !s.enabled } : s
            )
        });
    };

    const exportToPDF = () => {
        const htmlContent = generateHTMLCV();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `CV_${cvData.personalInfo.fullName.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Đã tải xuống CV! Mở file HTML và chọn Print > Save as PDF để lưu dạng PDF.');
    };

    const generateHTMLCV = () => {
        const colors = {
            modern: { primary: '#2563eb', secondary: '#eff6ff', text: '#1f2937' },
            classic: { primary: '#1f2937', secondary: '#f9fafb', text: '#374151' },
            creative: { primary: '#7c3aed', secondary: '#f5f3ff', text: '#1f2937' }
        };

        const theme = colors[selectedTemplate];

        return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>CV - ${cvData.personalInfo.fullName}</title>
    <style>
        @page { margin: 20mm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: ${theme.text};
            line-height: 1.6;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            background: ${theme.primary};
            color: white;
            padding: 30px;
            margin-bottom: 30px;
            border-radius: 8px;
        }
        .header h1 {
            font-size: 36px;
            margin-bottom: 5px;
        }
        .header .title {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 15px;
        }
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            font-size: 14px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 24px;
            color: ${theme.primary};
            border-bottom: 2px solid ${theme.primary};
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .item {
            margin-bottom: 20px;
            padding-left: 20px;
            border-left: 3px solid ${theme.secondary};
            padding: 15px 20px;
            background: ${theme.secondary};
            border-radius: 4px;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 5px;
        }
        .item-title {
            font-size: 18px;
            font-weight: bold;
            color: ${theme.primary};
        }
        .item-subtitle {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 5px;
        }
        .item-date {
            font-size: 14px;
            color: #9ca3af;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 10px;
        }
        .skill-item {
            background: ${theme.secondary};
            padding: 8px 12px;
            border-radius: 4px;
            text-align: center;
            border: 1px solid ${theme.primary};
        }
        .summary {
            background: ${theme.secondary};
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid ${theme.primary};
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${cvData.personalInfo.fullName}</h1>
        <div class="title">${cvData.personalInfo.title}</div>
        <div class="contact-info">
            <span>📧 ${cvData.personalInfo.email}</span>
            <span>📱 ${cvData.personalInfo.phone}</span>
            <span>📍 ${cvData.personalInfo.address}</span>
        </div>
    </div>

    ${cvData.personalInfo.summary ? `
    <div class="summary">
        <strong>Giới thiệu:</strong><br>
        ${cvData.personalInfo.summary}
    </div>
    ` : ''}

    ${cvData.sections.filter(s => s.enabled && s.id === 'experience').length > 0 && cvData.experience.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Kinh nghiệm làm việc</h2>
        ${cvData.experience.map(exp => `
            <div class="item">
                <div class="item-header">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                </div>
                <div class="item-subtitle">${exp.company}</div>
                <p>${exp.description || ''}</p>
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${cvData.sections.filter(s => s.enabled && s.id === 'education').length > 0 && cvData.education.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Học vấn</h2>
        ${cvData.education.map(edu => `
            <div class="item">
                <div class="item-header">
                    <div class="item-title">${edu.degree} - ${edu.field}</div>
                    <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                </div>
                <div class="item-subtitle">${edu.school}</div>
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${cvData.sections.filter(s => s.enabled && s.id === 'skills').length > 0 && cvData.skills.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Kỹ năng</h2>
        <div class="skills-grid">
            ${cvData.skills.map(skill => `
                <div class="skill-item">${typeof skill === 'string' ? skill : skill.name}</div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    ${cvData.sections.filter(s => s.enabled && s.id === 'languages').length > 0 && cvData.languages.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Ngôn ngữ</h2>
        <div class="skills-grid">
            ${cvData.languages.map(lang => `
                <div class="skill-item">${lang.name} - ${lang.level}</div>
            `).join('')}
        </div>
    </div>
    ` : ''}
</body>
</html>`;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        CV Builder - Tạo CV chuyên nghiệp
                    </h1>
                    <p className="text-gray-600">
                        Tạo CV đẹp mắt với các mẫu có sẵn
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        {previewMode ? 'Chỉnh sửa' : 'Xem trước'}
                    </Button>
                    <Button onClick={exportToPDF}>
                        <Download className="w-4 h-4 mr-2" />
                        Tải xuống PDF
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Panel - Editor */}
                {!previewMode && (
                    <div className="lg:col-span-2 space-y-6">
                        {/* Template Selection */}
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-4">Chọn mẫu CV</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {templates.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                                            selectedTemplate === template.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className={`w-full h-32 mb-3 rounded bg-gradient-to-br ${
                                            template.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                            template.color === 'gray' ? 'from-gray-500 to-gray-600' :
                                            'from-purple-500 to-purple-600'
                                        }`}></div>
                                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                                        <p className="text-sm text-gray-600">{template.description}</p>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Personal Info */}
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
                            <div className="space-y-4">
                                <Input
                                    label="Họ và tên"
                                    value={cvData.personalInfo.fullName}
                                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                                />
                                <Input
                                    label="Vị trí mong muốn"
                                    value={cvData.personalInfo.title}
                                    onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Email"
                                        type="email"
                                        value={cvData.personalInfo.email}
                                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                                    />
                                    <Input
                                        label="Số điện thoại"
                                        value={cvData.personalInfo.phone}
                                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                                    />
                                </div>
                                <Input
                                    label="Địa chỉ"
                                    value={cvData.personalInfo.address}
                                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Giới thiệu bản thân
                                    </label>
                                    <textarea
                                        value={cvData.personalInfo.summary}
                                        onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        rows="4"
                                        placeholder="Viết vài dòng về bản thân, mục tiêu nghề nghiệp..."
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Sections Management */}
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-4">Quản lý các mục</h3>
                            <div className="space-y-2">
                                {cvData.sections.map(section => (
                                    <div 
                                        key={section.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <GripVertical className="w-5 h-5 text-gray-400" />
                                            <span className="font-medium text-gray-900">{section.title}</span>
                                        </div>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={section.enabled}
                                                onChange={() => toggleSection(section.id)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {section.enabled ? 'Hiển thị' : 'Ẩn'}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {/* Right Panel - Preview */}
                <div className={previewMode ? 'lg:col-span-3' : 'lg:col-span-1'}>
                    <Card padding="lg" className="sticky top-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Xem trước</h3>
                        <div 
                            className="border rounded-lg p-6 bg-white shadow-sm overflow-auto"
                            style={{ maxHeight: '800px' }}
                            dangerouslySetInnerHTML={{ __html: generateHTMLCV() }}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CVBuilderPage;
