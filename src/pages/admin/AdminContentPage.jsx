import { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const AdminContentPage = () => {
    const [contents, setContents] = useState([
        { id: 1, type: 'blog', title: 'Top 10 kỹ năng IT hot nhất 2025', status: 'published', author: 'Admin', date: '2025-03-15', views: 1250 },
        { id: 2, type: 'faq', title: 'Làm thế nào để tạo CV ấn tượng?', status: 'published', author: 'Admin', date: '2025-03-10', views: 890 },
        { id: 3, type: 'announcement', title: 'Thông báo bảo trì hệ thống', status: 'draft', author: 'Admin', date: '2025-03-20', views: 0 }
    ]);

    const handleDelete = (id) => {
        if (confirm('Xóa nội dung này?')) {
            setContents(contents.filter(c => c.id !== id));
        }
    };

    const getTypeBadge = (type) => {
        const variants = { blog: 'info', faq: 'warning', announcement: 'danger' };
        const labels = { blog: 'Blog', faq: 'FAQ', announcement: 'Thông báo' };
        return <Badge variant={variants[type]}>{labels[type]}</Badge>;
    };

    const getStatusBadge = (status) => {
        const variants = { published: 'success', draft: 'warning' };
        const labels = { published: 'Đã xuất bản', draft: 'Nháp' };
        return <Badge variant={variants[status]}>{labels[status]}</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý nội dung</h1>
                    <p className="text-gray-600">Quản lý blog, FAQ, thông báo</p>
                </div>
                <Button><Plus className="h-4 w-4 mr-2" />Tạo nội dung</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Tổng nội dung', value: contents.length, color: 'blue' },
                    { label: 'Đã xuất bản', value: contents.filter(c => c.status === 'published').length, color: 'green' },
                    { label: 'Nháp', value: contents.filter(c => c.status === 'draft').length, color: 'yellow' }
                ].map((stat, idx) => (
                    <Card key={idx}>
                        <div className="p-4">
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="p-6">
                    <div className="space-y-3">
                        {contents.map(content => (
                            <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {getTypeBadge(content.type)}
                                        {getStatusBadge(content.status)}
                                    </div>
                                    <h3 className="font-medium text-gray-900">{content.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {content.author} • {new Date(content.date).toLocaleDateString('vi-VN')} • {content.views} lượt xem
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(content.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminContentPage;
