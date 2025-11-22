import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard, User, Briefcase, BookmarkPlus,
    Bell, Calendar, MessageSquare, Settings, Menu, X,
    Star, FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';

const CandidateLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', to: '/candidate/dashboard', icon: LayoutDashboard },
        { name: 'Hồ sơ của tôi', to: '/candidate/profile', icon: User },
        { name: 'Tìm việc làm', to: '/candidate/jobs', icon: Briefcase },
        { name: 'Việc đã ứng tuyển', to: '/candidate/applications', icon: FileText },
        { name: 'Việc đã lưu', to: '/candidate/saved-jobs', icon: BookmarkPlus },
        { name: 'Lịch phỏng vấn', to: '/candidate/interviews', icon: Calendar },
        { name: 'Tin nhắn', to: '/candidate/messages', icon: MessageSquare },
        { name: 'Thông báo', to: '/candidate/notifications', icon: Bell },
        { name: 'Cài đặt', to: '/candidate/settings', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                        <Link to="/" className="flex items-center space-x-2">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-bold text-gray-900">JobPortal</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <img
                                src={user?.avatar || 'https://i.pravatar.cc/150'}
                                alt={user?.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.name}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="primary" size="sm">Ứng viên</Badge>
                                    {user?.isPremium && (
                                        <Badge variant="warning" size="sm">
                                            <Star className="w-3 h-3 mr-1" />
                                            Premium
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors
                    ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }
                  `}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Premium CTA */}
                    {!user?.isPremium && (
                        <div className="p-4 m-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-600" />
                                <h3 className="font-semibold text-gray-900 text-sm">Nâng cấp Premium</h3>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">
                                Nhận thêm nhiều ưu đãi và tính năng đặc biệt
                            </p>
                            <Link
                                to="/candidate/premium"
                                className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-center text-xs font-medium px-3 py-2 rounded-md transition-colors"
                            >
                                Nâng cấp ngay
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex-1 flex items-center justify-between ml-4 lg:ml-0">
                        <h1 className="text-xl font-semibold text-gray-900">
                            {navigation.find(n => n.to === location.pathname)?.name || 'Ứng viên'}
                        </h1>
                    </div>
                </div>

                {/* Page content */}
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CandidateLayout;
