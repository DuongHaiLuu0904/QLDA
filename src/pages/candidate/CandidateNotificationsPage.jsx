import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
    Bell, BellOff, Briefcase, Calendar, MessageCircle,
    AlertCircle, Trash2, Archive, Filter, Check, Mail, Settings
} from 'lucide-react';

const CandidateNotificationsPage = () => {
    const { user } = useAuth();
    const { notifications: dataNotifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();

    const [filter, setFilter] = useState('all'); // all, unread, read
    const [typeFilter, setTypeFilter] = useState('all'); // all, application, interview, message, system

    const userNotifications = useMemo(() => {
        return dataNotifications.filter(n => n.userId === user?.id);
    }, [dataNotifications, user]);

    const filteredNotifications = useMemo(() => {
        let filtered = [...userNotifications];

        // Filter by read status
        if (filter === 'unread') {
            filtered = filtered.filter(n => !n.read);
        } else if (filter === 'read') {
            filtered = filtered.filter(n => n.read);
        }

        // Filter by type
        if (typeFilter !== 'all') {
            filtered = filtered.filter(n => n.type === typeFilter);
        }

        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [userNotifications, filter, typeFilter]);

    const unreadCount = userNotifications.filter(n => !n.read).length;

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'application':
                return Briefcase;
            case 'interview':
                return Calendar;
            case 'message':
                return MessageCircle;
            case 'system':
                return AlertCircle;
            default:
                return Bell;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'application':
                return 'text-blue-600 bg-blue-50';
            case 'interview':
                return 'text-green-600 bg-green-50';
            case 'message':
                return 'text-purple-600 bg-purple-50';
            case 'system':
                return 'text-orange-600 bg-orange-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'application':
                return 'Ứng tuyển';
            case 'interview':
                return 'Phỏng vấn';
            case 'message':
                return 'Tin nhắn';
            case 'system':
                return 'Hệ thống';
            default:
                return type;
        }
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
            const days = Math.floor(hours / 24);
            return `${days} ngày trước`;
        }
    };

    const handleMarkAsRead = (notificationId) => {
        markNotificationAsRead(notificationId);
    };

    const handleMarkAllAsRead = () => {
        markAllNotificationsAsRead(user?.id);
    };

    const handleDeleteNotification = (notificationId) => {
        if (confirm('Bạn có chắc muốn xóa thông báo này?')) {
            // Implement delete functionality
            console.log('Deleting notification:', notificationId);
        }
    };

    const stats = [
        {
            label: 'Tất cả',
            value: userNotifications.length,
            icon: Bell,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Chưa đọc',
            value: unreadCount,
            icon: BellOff,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            label: 'Hôm nay',
            value: userNotifications.filter(n => {
                const today = new Date().setHours(0, 0, 0, 0);
                const notifDate = new Date(n.createdAt).setHours(0, 0, 0, 0);
                return notifDate === today;
            }).length,
            icon: Calendar,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
                    <p className="text-gray-600">
                        {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : 'Không có thông báo mới'}
                    </p>
                </div>

                <div className="flex gap-2">
                    {unreadCount > 0 && (
                        <Button variant="outline" onClick={handleMarkAllAsRead}>
                            <Check className="h-4 w-4 mr-2" />
                            Đánh dấu tất cả đã đọc
                        </Button>
                    )}
                    <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Cài đặt
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <div className="p-6 flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Trạng thái:</span>
                            <div className="flex gap-2">
                                <Button
                                    variant={filter === 'all' ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter('all')}
                                >
                                    Tất cả
                                </Button>
                                <Button
                                    variant={filter === 'unread' ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter('unread')}
                                >
                                    Chưa đọc ({unreadCount})
                                </Button>
                                <Button
                                    variant={filter === 'read' ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter('read')}
                                >
                                    Đã đọc
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Loại:</span>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Tất cả</option>
                                <option value="application">Ứng tuyển</option>
                                <option value="interview">Phỏng vấn</option>
                                <option value="message">Tin nhắn</option>
                                <option value="system">Hệ thống</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => {
                        const NotificationIcon = getNotificationIcon(notification.type);
                        const colorClasses = getNotificationColor(notification.type);

                        return (
                            <Card key={notification.id}>
                                <div
                                    className={`p-4 ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg ${colorClasses} flex-shrink-0`}>
                                            <NotificationIcon className="h-6 w-6" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'
                                                        }`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.read && (
                                                        <Badge variant="primary">Mới</Badge>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {formatTime(notification.createdAt)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3">
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary">
                                                    {getTypeLabel(notification.type)}
                                                </Badge>

                                                {notification.link && (
                                                    <a
                                                        href={notification.link}
                                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Xem chi tiết →
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-1 flex-shrink-0">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                                    title="Đánh dấu đã đọc"
                                                >
                                                    <Check className="h-5 w-5 text-gray-600" />
                                                </button>
                                            )}
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                                title="Lưu trữ"
                                            >
                                                <Archive className="h-5 w-5 text-gray-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteNotification(notification.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                                title="Xóa"
                                            >
                                                <Trash2 className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                ) : (
                    <Card>
                        <div className="p-12 text-center">
                            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Không có thông báo
                            </h3>
                            <p className="text-gray-600">
                                {filter === 'unread'
                                    ? 'Bạn không có thông báo chưa đọc'
                                    : 'Bạn sẽ nhận được thông báo về ứng tuyển, phỏng vấn và tin nhắn tại đây'}
                            </p>
                        </div>
                    </Card>
                )}
            </div>

            {/* Notification Settings Info */}
            <Card>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        Cài đặt thông báo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-gray-900">Thông báo email</p>
                                <Badge variant="success">Đã bật</Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                                Nhận email khi có ứng tuyển mới hoặc lịch phỏng vấn
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-gray-900">Thông báo push</p>
                                <Badge variant="success">Đã bật</Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                                Nhận thông báo trực tiếp trên trình duyệt
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Tùy chỉnh thông báo
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CandidateNotificationsPage;
