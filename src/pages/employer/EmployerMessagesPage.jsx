import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
    MessageCircle, Send, Search, MoreVertical,
    Paperclip, Image, Smile, Check, CheckCheck,
    Archive, Trash2, Star, User, Filter
} from 'lucide-react';

const EmployerMessagesPage = () => {
    const { user } = useAuth();
    const { applications } = useData();
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, unread, starred

    // Get candidates who applied to company's jobs
    const mockConversations = useMemo(() => {
        const companyApplications = applications.filter(app => {
            const job = app.job;
            return job?.employerId === user?.id;
        });

        return companyApplications.map((app, index) => {
            const candidate = app.candidate || {
                id: app.candidateId,
                name: `Ứng viên ${app.candidateId}`,
                avatar: `https://i.pravatar.cc/150?u=candidate${app.candidateId}`,
                title: 'Software Engineer'
            };

            return {
                id: `conv-${app.id}`,
                candidateId: candidate.id,
                candidateName: candidate.name,
                candidateAvatar: candidate.avatar,
                candidateTitle: candidate.title || 'Ứng viên',
                jobTitle: app.job?.title || 'Không rõ vị trí',
                lastMessage: index === 0 
                    ? 'Xin chào, tôi rất quan tâm đến vị trí này. Khi nào công ty có thể sắp xếp phỏng vấn?'
                    : index === 1
                    ? 'Cảm ơn anh/chị đã liên hệ. Em sẵn sàng tham gia phỏng vấn vào thời gian công ty sắp xếp.'
                    : index === 2
                    ? 'Em có một số câu hỏi về mô tả công việc và quyền lợi. Anh/chị có thể cho em biết thêm không ạ?'
                    : 'Cảm ơn công ty đã xem xét hồ sơ của em.',
                lastMessageTime: new Date(Date.now() - index * 3600000).toISOString(),
                unread: index < 2 ? index + 1 : 0,
                starred: index === 0,
                status: app.status,
                messages: [
                    {
                        id: 1,
                        sender: 'candidate',
                        text: 'Xin chào công ty, tôi đã ứng tuyển vào vị trí ' + (app.job?.title || 'này'),
                        time: new Date(Date.now() - (index + 5) * 3600000).toISOString(),
                        read: true
                    },
                    {
                        id: 2,
                        sender: 'employer',
                        text: 'Xin chào, cảm ơn bạn đã ứng tuyển. Chúng tôi đã nhận được hồ sơ của bạn.',
                        time: new Date(Date.now() - (index + 4) * 3600000).toISOString(),
                        read: true
                    },
                    {
                        id: 3,
                        sender: 'candidate',
                        text: index === 0 
                            ? 'Xin chào, tôi rất quan tâm đến vị trí này. Khi nào công ty có thể sắp xếp phỏng vấn?'
                            : index === 1
                            ? 'Cảm ơn anh/chị đã liên hệ. Em sẵn sàng tham gia phỏng vấn vào thời gian công ty sắp xếp.'
                            : 'Cảm ơn công ty đã xem xét hồ sơ của em.',
                        time: new Date(Date.now() - index * 3600000).toISOString(),
                        read: false
                    }
                ]
            };
        }).slice(0, 10);
    }, [applications, user?.id]);

    const filteredConversations = useMemo(() => {
        return mockConversations.filter(conv => {
            const matchesSearch = searchTerm === '' ||
                conv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = 
                filterStatus === 'all' ||
                (filterStatus === 'unread' && conv.unread > 0) ||
                (filterStatus === 'starred' && conv.starred);

            return matchesSearch && matchesFilter;
        });
    }, [mockConversations, searchTerm, filterStatus]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim() || !selectedConversation) return;

        // In real app, would send to backend
        console.log('Sending message:', messageText);
        setMessageText('');
    };

    const toggleStar = (convId) => {
        // In real app, would update in backend
        console.log('Toggle star:', convId);
    };

    const markAsRead = (convId) => {
        // In real app, would update in backend
        console.log('Mark as read:', convId);
    };

    const archiveConversation = (convId) => {
        // In real app, would update in backend
        console.log('Archive:', convId);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Vừa xong';
        if (diffMins < 60) return `${diffMins} phút`;
        if (diffHours < 24) return `${diffHours} giờ`;
        if (diffDays < 7) return `${diffDays} ngày`;
        return date.toLocaleDateString('vi-VN');
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'default',
            reviewing: 'primary',
            interview: 'warning',
            offered: 'success',
            rejected: 'danger',
            accepted: 'success'
        };
        return colors[status] || 'default';
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'Chờ xử lý',
            reviewing: 'Đang xem xét',
            interview: 'Phỏng vấn',
            offered: 'Đã gửi offer',
            rejected: 'Từ chối',
            accepted: 'Đã chấp nhận'
        };
        return texts[status] || status;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tin nhắn</h1>
                    <p className="text-gray-600">Giao tiếp với ứng viên</p>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="primary">
                        {mockConversations.filter(c => c.unread > 0).length} chưa đọc
                    </Badge>
                </div>
            </div>

            {/* Filters */}
            <Card padding="md">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên ứng viên hoặc vị trí..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant={filterStatus === 'all' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                        >
                            Tất cả
                        </Button>
                        <Button
                            variant={filterStatus === 'unread' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('unread')}
                        >
                            Chưa đọc
                        </Button>
                        <Button
                            variant={filterStatus === 'starred' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('starred')}
                        >
                            <Star className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-12 gap-6">
                {/* Conversations List */}
                <div className="col-span-12 lg:col-span-4">
                    <Card className="h-[700px] overflow-hidden flex flex-col">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-gray-900">
                                Cuộc hội thoại ({filteredConversations.length})
                            </h3>
                        </div>

                        <div className="divide-y max-h-[600px] overflow-y-auto">
                            {filteredConversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                    <p>Không có tin nhắn nào</p>
                                </div>
                            ) : (
                                filteredConversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => {
                                            setSelectedConversation(conv);
                                            if (conv.unread > 0) markAsRead(conv.id);
                                        }}
                                        className={`p-4 cursor-pointer transition-colors ${
                                            selectedConversation?.id === conv.id
                                                ? 'bg-blue-50 border-l-4 border-blue-600'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="relative">
                                                <img
                                                    src={conv.candidateAvatar}
                                                    alt={conv.candidateName}
                                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                />
                                                {conv.unread > 0 && (
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-white font-bold">
                                                            {conv.unread}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
                                                        {conv.candidateName}
                                                        {conv.starred && (
                                                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                        )}
                                                    </h3>
                                                    <span className="text-xs text-gray-500">
                                                        {formatTime(conv.lastMessageTime)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-1 truncate">
                                                    {conv.jobTitle}
                                                </p>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge variant={getStatusColor(conv.status)} size="sm">
                                                        {getStatusText(conv.status)}
                                                    </Badge>
                                                </div>
                                                <p
                                                    className={`text-sm truncate ${
                                                        conv.unread > 0
                                                            ? 'text-gray-900 font-medium'
                                                            : 'text-gray-600'
                                                    }`}
                                                >
                                                    {conv.lastMessage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>

                {/* Chat Area */}
                <div className="col-span-12 lg:col-span-8">
                    <Card className="h-[700px] flex flex-col">
                        {selectedConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={selectedConversation.candidateAvatar}
                                            alt={selectedConversation.candidateName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {selectedConversation.candidateName}
                                            </h3>
                                            <p className="text-xs text-gray-600">
                                                Ứng tuyển: {selectedConversation.jobTitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleStar(selectedConversation.id)}
                                        >
                                            <Star
                                                className={`w-5 h-5 ${
                                                    selectedConversation.starred
                                                        ? 'text-yellow-500 fill-current'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => archiveConversation(selectedConversation.id)}
                                        >
                                            <Archive className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                    {selectedConversation.messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${
                                                msg.sender === 'employer' ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[70%] ${
                                                    msg.sender === 'employer'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-900'
                                                } rounded-lg p-3 shadow-sm`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                                <div
                                                    className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                                                        msg.sender === 'employer'
                                                            ? 'text-blue-100'
                                                            : 'text-gray-500'
                                                    }`}
                                                >
                                                    <span>{formatTime(msg.time)}</span>
                                                    {msg.sender === 'employer' && (
                                                        <>
                                                            {msg.read ? (
                                                                <CheckCheck className="w-4 h-4" />
                                                            ) : (
                                                                <Check className="w-4 h-4" />
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                                    <div className="flex items-end gap-2">
                                        <Button type="button" variant="ghost" size="sm">
                                            <Paperclip className="w-5 h-5" />
                                        </Button>
                                        <Button type="button" variant="ghost" size="sm">
                                            <Image className="w-5 h-5" />
                                        </Button>

                                        <textarea
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Nhập tin nhắn..."
                                            rows={1}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage(e);
                                                }
                                            }}
                                        />

                                        <Button type="button" variant="ghost" size="sm">
                                            <Smile className="w-5 h-5" />
                                        </Button>

                                        <Button type="submit" disabled={!messageText.trim()}>
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Nhấn Enter để gửi, Shift + Enter để xuống dòng
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <h3 className="text-lg font-semibold mb-2">Chọn một cuộc hội thoại</h3>
                                    <p className="text-sm">
                                        Chọn một ứng viên từ danh sách bên trái để bắt đầu trò chuyện
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployerMessagesPage;
