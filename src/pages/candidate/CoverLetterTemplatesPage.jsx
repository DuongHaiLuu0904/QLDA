import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { FileText, Copy, Save, Trash2, Eye, Plus } from 'lucide-react';

const CoverLetterTemplatesPage = () => {
    const { user } = useAuth();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [savedLetters, setSavedLetters] = useState(() => {
        const saved = localStorage.getItem('coverLetters');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentLetter, setCurrentLetter] = useState({
        recipientName: '',
        recipientTitle: '',
        companyName: '',
        jobTitle: '',
        content: ''
    });

    const templates = [
        {
            id: 'professional',
            name: 'Chuyên nghiệp',
            description: 'Phù hợp với các vị trí corporate, formal',
            content: `Kính gửi {recipientTitle} {recipientName},

                    Tôi là {userName}, hiện đang tìm kiếm cơ hội làm việc tại vị trí {jobTitle} tại {companyName}. Với kinh nghiệm và kỹ năng của mình, tôi tin rằng mình có thể đóng góp tích cực cho sự phát triển của công ty.

                    Trong quá trình học tập và làm việc, tôi đã tích lũy được:
                    • Kinh nghiệm thực tế trong lĩnh vực {field}
                    • Kỹ năng làm việc nhóm và giao tiếp hiệu quả
                    • Khả năng học hỏi nhanh và thích nghi với môi trường mới

                    Tôi rất mong có cơ hội được trao đổi trực tiếp với {companyName} để thể hiện rõ hơn về năng lực và sự nhiệt huyết của mình.

                    Trân trọng,
                    {userName}
                    {userEmail} | {userPhone}`
        },
        {
            id: 'creative',
            name: 'Sáng tạo',
            description: 'Phù hợp với ngành design, marketing, startup',
            content: `Chào {recipientName},

                    Tôi vô cùng hào hứng khi biết về vị trí {jobTitle} tại {companyName}! 🎯

                    Là một người đam mê {field}, tôi luôn tìm kiếm cơ hội để thử thách bản thân và đóng góp giá trị thực sự. Những gì tôi có thể mang lại:

                    ✨ Sự sáng tạo không giới hạn trong việc giải quyết vấn đề
                    🚀 Năng lượng tích cực và tinh thần học hỏi không ngừng
                    💡 Kinh nghiệm thực chiến với các dự án thực tế

                    Tôi tin rằng {companyName} là nơi lý tưởng để tôi phát huy thế mạnh và cùng team phát triển những sản phẩm tuyệt vời.

                    Rất mong được kết nối!

                    Best regards,
                    {userName}
                    {userEmail} | {userPhone}`
        },
        {
            id: 'technical',
            name: 'Kỹ thuật',
            description: 'Phù hợp với vị trí IT, Engineering',
            content: `Dear {recipientName},

                    I am writing to express my interest in the {jobTitle} position at {companyName}.

                    Technical Skills & Experience:
                    - Proficient in: {technicalSkills}
                    - {experienceYears}+ years of hands-on experience
                    - Strong problem-solving and analytical abilities
                    - Experience with Agile/Scrum methodologies

                    I am particularly drawn to {companyName} because of your innovative approach to technology and commitment to excellence. I am confident that my technical expertise and passion for continuous learning would make me a valuable addition to your team.

                    Key achievements:
                    • Successfully delivered multiple projects on time and within budget
                    • Collaborated with cross-functional teams to implement scalable solutions
                    • Contributed to open-source projects and technical communities

                    I would welcome the opportunity to discuss how my skills align with your team's needs.

                    Best regards,
                    {userName}
                    {userEmail} | {userPhone}
                    GitHub: {githubProfile}`
        },
        {
            id: 'internship',
            name: 'Thực tập sinh',
            description: 'Cho sinh viên, người mới vào nghề',
            content: `Kính gửi {recipientTitle} {recipientName},

                    Em là {userName}, sinh viên năm cuối chuyên ngành {major} tại {university}. Em rất quan tâm đến vị trí thực tập {jobTitle} tại {companyName}.

                    Mặc dù chưa có nhiều kinh nghiệm thực tế, em có:
                    • Nền tảng kiến thức vững chắc về {field}
                    • Dự án cá nhân và nhóm trong quá trình học tập
                    • Tinh thần học hỏi và sẵn sàng đón nhận thử thách
                    • Kỹ năng làm việc nhóm qua các hoạt động ngoại khóa

                    Em mong muốn có cơ hội được học hỏi và trải nghiệm môi trường chuyên nghiệp tại {companyName}. Em tin rằng đây sẽ là bước đệm quan trọng cho sự nghiệp tương lai của em.

                    Em rất mong được trao đổi thêm với quý công ty.

                    Trân trọng,
                    {userName}
                    {userEmail} | {userPhone}`
        }
    ];

    const fillTemplate = (template) => {
        let content = template.content;
        
        const replacements = {
            '{userName}': user?.name || '[Tên của bạn]',
            '{userEmail}': user?.email || '[Email]',
            '{userPhone}': user?.phone || '[SĐT]',
            '{recipientName}': currentLetter.recipientName || '[Tên người nhận]',
            '{recipientTitle}': currentLetter.recipientTitle || '[Chức danh]',
            '{companyName}': currentLetter.companyName || '[Tên công ty]',
            '{jobTitle}': currentLetter.jobTitle || '[Vị trí ứng tuyển]',
            '{field}': user?.candidateProfile?.title || '[Lĩnh vực]',
            '{technicalSkills}': user?.candidateProfile?.skills?.slice(0, 3).join(', ') || '[Kỹ năng]',
            '{experienceYears}': user?.candidateProfile?.experience?.length || 'X',
            '{major}': '[Chuyên ngành]',
            '{university}': '[Trường đại học]',
            '{githubProfile}': '[github.com/username]'
        };

        Object.entries(replacements).forEach(([key, value]) => {
            content = content.replaceAll(key, value);
        });

        return content;
    };

    const selectTemplate = (template) => {
        setSelectedTemplate(template);
        setCurrentLetter({
            ...currentLetter,
            content: fillTemplate(template)
        });
        setIsEditing(true);
    };

    const saveDraft = () => {
        const draft = {
            id: Date.now(),
            ...currentLetter,
            templateId: selectedTemplate?.id,
            savedAt: new Date().toISOString()
        };

        const updated = [draft, ...savedLetters];
        setSavedLetters(updated);
        localStorage.setItem('coverLetters', JSON.stringify(updated));
        alert('Đã lưu thư xin việc!');
    };

    const loadDraft = (draft) => {
        setCurrentLetter(draft);
        setSelectedTemplate(templates.find(t => t.id === draft.templateId));
        setIsEditing(true);
    };

    const deleteDraft = (id) => {
        if (confirm('Bạn có chắc muốn xóa thư này?')) {
            const updated = savedLetters.filter(l => l.id !== id);
            setSavedLetters(updated);
            localStorage.setItem('coverLetters', JSON.stringify(updated));
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentLetter.content);
        alert('Đã sao chép vào clipboard!');
    };

    const createNewLetter = () => {
        setSelectedTemplate(null);
        setCurrentLetter({
            recipientName: '',
            recipientTitle: '',
            companyName: '',
            jobTitle: '',
            content: ''
        });
        setIsEditing(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Cover Letter Templates
                    </h1>
                    <p className="text-gray-600">
                        Tạo thư xin việc chuyên nghiệp với các mẫu có sẵn
                    </p>
                </div>
                <Button onClick={createNewLetter}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo mới
                </Button>
            </div>

            {!isEditing ? (
                <>
                    {/* Templates Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {templates.map(template => (
                            <Card key={template.id} padding="lg" hover>
                                <div className="mb-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {template.name}
                                        </h3>
                                        <FileText className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {template.description}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-40 overflow-hidden">
                                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                                        {fillTemplate(template).slice(0, 200)}...
                                    </pre>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={() => selectTemplate(template)}
                                >
                                    Sử dụng mẫu này
                                </Button>
                            </Card>
                        ))}
                    </div>

                    {/* Saved Drafts */}
                    {savedLetters.length > 0 && (
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Thư đã lưu ({savedLetters.length})
                            </h3>
                            <div className="space-y-3">
                                {savedLetters.map(letter => (
                                    <div 
                                        key={letter.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">
                                                {letter.jobTitle} - {letter.companyName}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Lưu: {new Date(letter.savedAt).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                size="sm"
                                                variant="outline"
                                                onClick={() => loadDraft(letter)}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                Xem
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => deleteDraft(letter.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </>
            ) : (
                /* Editor View */
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left - Form */}
                    <div className="space-y-6">
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-4">Thông tin</h3>
                            <div className="space-y-4">
                                <Input
                                    label="Vị trí ứng tuyển"
                                    value={currentLetter.jobTitle}
                                    onChange={(e) => setCurrentLetter({...currentLetter, jobTitle: e.target.value})}
                                    placeholder="VD: Frontend Developer"
                                />
                                <Input
                                    label="Tên công ty"
                                    value={currentLetter.companyName}
                                    onChange={(e) => setCurrentLetter({...currentLetter, companyName: e.target.value})}
                                    placeholder="VD: Tech Company Vietnam"
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Tên người nhận"
                                        value={currentLetter.recipientName}
                                        onChange={(e) => setCurrentLetter({...currentLetter, recipientName: e.target.value})}
                                        placeholder="VD: Nguyễn Văn A"
                                    />
                                    <Input
                                        label="Chức danh"
                                        value={currentLetter.recipientTitle}
                                        onChange={(e) => setCurrentLetter({...currentLetter, recipientTitle: e.target.value})}
                                        placeholder="VD: HR Manager"
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card padding="lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">Nội dung thư</h3>
                                {selectedTemplate && (
                                    <Badge variant="info">{selectedTemplate.name}</Badge>
                                )}
                            </div>
                            <textarea
                                value={currentLetter.content}
                                onChange={(e) => setCurrentLetter({...currentLetter, content: e.target.value})}
                                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                placeholder="Nhập nội dung thư xin việc..."
                            />
                        </Card>

                        <div className="flex gap-2">
                            <Button onClick={saveDraft}>
                                <Save className="w-4 h-4 mr-2" />
                                Lưu
                            </Button>
                            <Button variant="outline" onClick={copyToClipboard}>
                                <Copy className="w-4 h-4 mr-2" />
                                Sao chép
                            </Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Quay lại
                            </Button>
                        </div>
                    </div>

                    {/* Right - Preview */}
                    <div className="lg:sticky lg:top-6 h-fit">
                        <Card padding="lg">
                            <h3 className="font-semibold text-gray-900 mb-4">Xem trước</h3>
                            <div 
                                className="bg-white border rounded-lg p-8 shadow-sm"
                                style={{ 
                                    minHeight: '600px',
                                    fontFamily: 'Georgia, serif'
                                }}
                            >
                                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {currentLetter.content || 'Nội dung thư sẽ hiển thị ở đây...'}
                                </pre>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoverLetterTemplatesPage;
