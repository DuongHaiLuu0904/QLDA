import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, Building2, 
  Settings, FileText, DollarSign, BarChart3, 
  Menu, X, Shield, Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Quản lý người dùng', to: '/admin/users', icon: Users },
    { name: 'Quản lý tin tuyển dụng', to: '/admin/jobs', icon: Briefcase },
    { name: 'Quản lý công ty', to: '/admin/companies', icon: Building2 },
    { name: 'Duyệt KYC', to: '/admin/kyc-verification', icon: Shield },
    { name: 'Quản lý nội dung', to: '/admin/content', icon: FileText },
    { name: 'Danh mục hệ thống', to: '/admin/categories', icon: Tag },
    { name: 'Gói dịch vụ', to: '/admin/packages', icon: DollarSign },
    { name: 'Báo cáo & Thống kê', to: '/admin/reports', icon: BarChart3 },
    { name: 'Cài đặt hệ thống', to: '/admin/settings', icon: Settings }
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
        fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold">Admin Panel</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Info */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://i.pravatar.cc/150'}
                alt={user?.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.name}
                </p>
                <Badge variant="danger" size="sm" className="mt-1">
                  Administrator
                </Badge>
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
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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

          {/* System Status */}
          <div className="p-4 m-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400">System Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Database</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between">
                <span>API</span>
                <span className="text-green-400">✓</span>
              </div>
            </div>
          </div>
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
              {navigation.find(n => n.to === location.pathname)?.name || 'Admin Panel'}
            </h1>
            
            <Link 
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Về trang chủ →
            </Link>
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

export default AdminLayout;
