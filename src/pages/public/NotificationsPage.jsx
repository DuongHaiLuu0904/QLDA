import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Bell, 
    Briefcase, 
    Calendar, 
    CheckCircle, 
    AlertCircle,
    Bookmark,
    TrendingUp,
    Mail,
    Filter,
    Check,
    Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const NotificationsPage = () => {
    const { user } = useAuth();
    const { notifications: allNotifications } = useData();
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all'); // all, unread, read
    const [selectedType, setSelectedType] = useState('all'); // all, application, interview, job_recommendation, etc.

    useEffect(() => {
        // Filter notifications based on user (if logged in) or show all for demo
        let filtered = user 
            ? allNotifications.filter(n => n.userId === user.id)
            : allNotifications;

        // Apply read/unread filter
        if (filter === 'unread') {
            filtered = filtered.filter(n => !n.read);
        } else if (filter === 'read') {
            filtered = filtered.filter(n => n.read);
        }

        // Apply type filter
        if (selectedType !== 'all') {
            filtered = filtered.filter(n => n.type === selectedType);
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setNotifications(filtered);
    }, [allNotifications, user, filter, selectedType]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'application':
                return <Briefcase className="w-5 h-5" />;
            case 'interview':
                return <Calendar className="w-5 h-5" />;
            case 'job_recommendation':
                return <TrendingUp className="w-5 h-5" />;
            case 'job_approved':
                return <CheckCircle className="w-5 h-5" />;
            case 'saved_job':
                return <Bookmark className="w-5 h-5" />;
            case 'message':
                return <Mail className="w-5 h-5" />;
            default:
                return <Bell className="w-5 h-5" />;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'application':
                return 'bg-blue-100 text-blue-600';
            case 'interview':
                return 'bg-purple-100 text-purple-600';
            case 'job_recommendation':
                return 'bg-green-100 text-green-600';
            case 'job_approved':
                return 'bg-emerald-100 text-emerald-600';
            case 'saved_job':
                return 'bg-amber-100 text-amber-600';
            case 'message':
                return 'bg-pink-100 text-pink-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getNotificationTypeName = (type) => {
        const types = {
            'application': 'Ứng tuyển',
            'interview': 'Phỏng vấn',
            'job_recommendation': 'Gợi ý việc làm',
            'job_approved': 'Tin đã duyệt',
            'saved_job': 'Việc đã lưu',
            'message': 'Tin nhắn'
        };
        return types[type] || 'Thông báo';
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const notifDate = new Date(date);
        const diffMs = now - notifDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Vừa xong';
        if (diffMins < 60) return `${diffMins} phút trước`;
        if (diffHours < 24) return `${diffHours} giờ trước`;
        if (diffDays < 7) return `${diffDays} ngày trước`;
        return notifDate.toLocaleDateString('vi-VN');
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const notificationTypes = [
        { value: 'all', label: 'Tất cả' },
        { value: 'application', label: 'Ứng tuyển' },
        { value: 'interview', label: 'Phỏng vấn' },
        { value: 'job_recommendation', label: 'Gợi ý việc làm' },
        { value: 'job_approved', label: 'Tin đã duyệt' },
        { value: 'saved_job', label: 'Việc đã lưu' },
        { value: 'message', label: 'Tin nhắn' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Bell className="w-8 h-8 text-blue-600" />
                                Thông báo
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {unreadCount > 0 
                                    ? `Bạn có ${unreadCount} thông báo chưa đọc`
                                    : 'Không có thông báo mới'}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={markAllAsRead}
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Đánh dấu tất cả đã đọc
                            </Button>
                        )}
                    </div>

                    {/* Filters */}
                    <Card padding="md">
                        <div className="space-y-4">
                            {/* Read/Unread Filter */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filter === 'all'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Tất cả ({notifications.length})
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filter === 'unread'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Chưa đọc ({unreadCount})
                                </button>
                                <button
                                    onClick={() => setFilter('read')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filter === 'read'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Đã đọc ({notifications.filter(n => n.read).length})
                                </button>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Filter className="w-4 h-4 inline mr-1" />
                                    Lọc theo loại
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {notificationTypes.map(type => (
                                        <button
                                            key={type.value}
                                            onClick={() => setSelectedType(type.value)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                selectedType === type.value
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Notifications List */}
                <div className="space-y-2">
                    {notifications.length === 0 ? (
                        <Card padding="lg" className="text-center">
                            <div className="py-12">
                                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Không có thông báo
                                </h3>
                                <p className="text-gray-600">
                                    {filter === 'unread' 
                                        ? 'Bạn đã đọc hết tất cả thông báo'
                                        : 'Chưa có thông báo nào'}
                                </p>
                            </div>
                        </Card>
                    ) : (
                        notifications.map((notification) => (
                            <Card
                                key={notification.id}
                                padding="none"
                                className={`transition-all hover:shadow-md ${
                                    !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                            >
                                <div className="p-4">
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`p-3 rounded-lg ${getNotificationColor(notification.type)}`}>
                                            {getNotificationIcon(notification.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        {notification.title}
                                                        {!notification.read && (
                                                            <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                        )}
                                                    </h3>
                                                    <p className="text-gray-700 text-sm">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                
                                                {/* Actions Dropdown */}
                                                <div className="flex items-center gap-2">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Đánh dấu đã đọc"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <Badge variant="default" size="sm">
                                                        {getNotificationTypeName(notification.type)}
                                                    </Badge>
                                                    <span>{getTimeAgo(notification.createdAt)}</span>
                                                </div>
                                                
                                                {notification.link && (
                                                    <Link
                                                        to={notification.link}
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        Xem chi tiết →
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Login Prompt for Guests */}
                {!user && (
                    <Card padding="lg" className="mt-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
                        <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Đăng nhập để nhận thông báo cá nhân hóa
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Đăng nhập để nhận thông báo về công việc phù hợp, lịch phỏng vấn và nhiều hơn nữa
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Link to="/login">
                                <Button variant="primary">
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline">
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
