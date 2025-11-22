import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../services/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import {
    MessageCircle, Send, Search, MoreVertical,
    Paperclip, Image, Smile, Check, CheckCheck,
    Archive, Trash2, Star
} from 'lucide-react';

const CandidateMessagesPage = () => {
    const { user } = useAuth();

    // Mock conversations data
    const mockConversations = [
        {
            id: 1,
            employerId: 1,
            employerName: 'FPT Software',
            employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-FPT-Polytechnic-V-Dong.png',
            lastMessage: 'Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ liên hệ sớm nhất.',
            lastMessageTime: '2024-11-22T10:30:00',
            unread: 2,
            starred: false,
            messages: [
                {
                    id: 1,
                    senderId: 1,
                    senderName: 'HR FPT',
                    content: 'Xin chào! Chúng tôi đã nhận được hồ sơ của bạn.',
                    timestamp: '2024-11-21T14:00:00',
                    read: true
                },
                {
                    id: 2,
                    senderId: user?.id,
                    senderName: user?.name,
                    content: 'Chào anh/chị, em rất vui khi được nhận phản hồi.',
                    timestamp: '2024-11-21T14:15:00',
                    read: true
                },
                {
                    id: 3,
                    senderId: 1,
                    senderName: 'HR FPT',
                    content: 'Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ liên hệ sớm nhất.',
                    timestamp: '2024-11-22T10:30:00',
                    read: false
                }
            ]
        },
        {
            id: 2,
            employerId: 3,
            employerName: 'Shopee Vietnam',
            employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee.png',
            lastMessage: 'Bạn có thể phỏng vấn vào thứ 6 tuần sau không?',
            lastMessageTime: '2024-11-21T16:45:00',
            unread: 0,
            starred: true,
            messages: [
                {
                    id: 1,
                    senderId: 3,
                    senderName: 'Recruiter Shopee',
                    content: 'Chào bạn! Portfolio của bạn rất ấn tượng.',
                    timestamp: '2024-11-20T09:00:00',
                    read: true
                },
                {
                    id: 2,
                    senderId: user?.id,
                    senderName: user?.name,
                    content: 'Cảm ơn anh/chị! Em rất mong được cơ hội phỏng vấn.',
                    timestamp: '2024-11-20T09:30:00',
                    read: true
                },
                {
                    id: 3,
                    senderId: 3,
                    senderName: 'Recruiter Shopee',
                    content: 'Bạn có thể phỏng vấn vào thứ 6 tuần sau không?',
                    timestamp: '2024-11-21T16:45:00',
                    read: true
                }
            ]
        },
        {
            id: 3,
            employerId: 2,
            employerName: 'VNG Corporation',
            employerLogo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VNG.png',
            lastMessage: 'Xin chúc mừng! Bạn đã vượt qua vòng 1.',
            lastMessageTime: '2024-11-20T11:20:00',
            unread: 0,
            starred: false,
            messages: [
                {
                    id: 1,
                    senderId: 2,
                    senderName: 'VNG Talent Team',
                    content: 'Xin chúc mừng! Bạn đã vượt qua vòng 1.',
                    timestamp: '2024-11-20T11:20:00',
                    read: true
                }
            ]
        }
    ];

    const [conversations] = useState(mockConversations);
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [messageText, setMessageText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredConversations = useMemo(() => {
        if (!searchTerm) return conversations;
        return conversations.filter(conv =>
            conv.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [conversations, searchTerm]);

    const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        // Simulate sending message
        console.log('Sending message:', messageText);
        setMessageText('');
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) {
            const minutes = Math.floor(diff / (1000 * 60));
            return `${minutes} phút trước`;
        } else if (hours < 24) {
            return `${hours} giờ trước`;
        } else {
            return date.toLocaleDateString('vi-VN');
        }
    };

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tin nhắn</h1>
                    <p className="text-gray-600">
                        {totalUnread > 0 ? `${totalUnread} tin nhắn chưa đọc` : 'Không có tin nhắn mới'}
                    </p>
                </div>
            </div>

            {/* Messages Interface */}
            <div className="grid grid-cols-12 gap-6">
                {/* Conversations List */}
                <div className="col-span-12 lg:col-span-4">
                    <Card>
                        <div className="p-4 border-b">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm cuộc trò chuyện..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="divide-y max-h-[600px] overflow-y-auto">
                            {filteredConversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={`p-4 cursor-pointer transition-colors ${selectedConversation?.id === conv.id
                                            ? 'bg-blue-50 border-l-4 border-blue-600'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={conv.employerLogo}
                                            alt={conv.employerName}
                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
                                                    {conv.employerName}
                                                    {conv.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                                </h3>
                                                <span className="text-xs text-gray-500">
                                                    {formatTime(conv.lastMessageTime)}
                                                </span>
                                            </div>
                                            <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                                                }`}>
                                                {conv.lastMessage}
                                            </p>
                                            {conv.unread > 0 && (
                                                <Badge variant="primary" className="mt-2">
                                                    {conv.unread} mới
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                            src={selectedConversation.employerLogo}
                                            alt={selectedConversation.employerName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {selectedConversation.employerName}
                                            </h3>
                                            <p className="text-xs text-green-600">● Đang hoạt động</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <Archive className="h-5 w-5 text-gray-600" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <Trash2 className="h-5 w-5 text-gray-600" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <MoreVertical className="h-5 w-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {selectedConversation.messages.map((message) => {
                                        const isOwnMessage = message.senderId === user?.id;

                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                                                    {!isOwnMessage && (
                                                        <p className="text-xs text-gray-600 mb-1">{message.senderName}</p>
                                                    )}
                                                    <div
                                                        className={`rounded-lg p-3 ${isOwnMessage
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-900'
                                                            }`}
                                                    >
                                                        <p className="text-sm">{message.content}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            {formatMessageTime(message.timestamp)}
                                                        </span>
                                                        {isOwnMessage && (
                                                            <span className="text-xs">
                                                                {message.read ? (
                                                                    <CheckCheck className="h-3 w-3 text-blue-600" />
                                                                ) : (
                                                                    <Check className="h-3 w-3 text-gray-400" />
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t">
                                    <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <Paperclip className="h-5 w-5 text-gray-600" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <Image className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </div>

                                        <textarea
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage(e);
                                                }
                                            }}
                                            placeholder="Nhập tin nhắn..."
                                            rows={1}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        />

                                        <button
                                            type="button"
                                            className="p-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Smile className="h-5 w-5 text-gray-600" />
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={!messageText.trim()}
                                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Chọn một cuộc trò chuyện
                                    </h3>
                                    <p className="text-gray-600">
                                        Chọn từ danh sách bên trái để bắt đầu nhắn tin
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Tips */}
            <Card>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <h3 className="font-semibold text-gray-900 mb-3">💡 Mẹo giao tiếp hiệu quả</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 mb-1">Phản hồi nhanh</p>
                            <p className="text-xs text-gray-600">
                                Trả lời tin nhắn trong vòng 24h để tạo ấn tượng tốt
                            </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 mb-1">Lịch sự, chuyên nghiệp</p>
                            <p className="text-xs text-gray-600">
                                Sử dụng ngôn ngữ trang trọng và thể hiện sự tôn trọng
                            </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 mb-1">Rõ ràng, ngắn gọn</p>
                            <p className="text-xs text-gray-600">
                                Trình bày ý kiến súc tích, dễ hiểu và đi thẳng vào vấn đề
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CandidateMessagesPage;
