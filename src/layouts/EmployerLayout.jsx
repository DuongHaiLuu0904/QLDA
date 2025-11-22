import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, Users, BarChart3, 
  CreditCard, Building2, Settings, Menu, X,
  FileText, MessageSquare, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';

const EmployerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', to: '/employer/dashboard', icon: LayoutDashboard },
    { name: 'Quản lý tin tuyển dụng', to: '/employer/jobs', icon: Briefcase },
    { name: 'Đăng tin mới', to: '/employer/jobs/create', icon: FileText },
    { name: 'Quản lý ứng viên', to: '/employer/candidates', icon: Users },
    { name: 'Phân tích & Báo cáo', to: '/employer/analytics', icon: BarChart3 },
    { name: 'Hồ sơ công ty', to: '/employer/company-profile', icon: Building2 },
    { name: 'Gói dịch vụ & Thanh toán', to: '/employer/billing', icon: CreditCard },
    { name: 'Tin nhắn', to: '/employer/messages', icon: MessageSquare },
    { name: 'Cài đặt', to: '/employer/settings', icon: Settings }
  ];

  const subscriptionBadge = {
    basic: { label: 'Basic', variant: 'default' },
    pro: { label: 'Pro', variant: 'primary' },
    enterprise: { label: 'Enterprise', variant: 'warning' }
  };

  const currentPlan = user?.companyProfile?.subscription || 'basic';

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

          {/* Company Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start space-x-3">
              <img
                src={user?.companyProfile?.logo || user?.avatar || 'https://i.pravatar.cc/150'}
                alt={user?.companyProfile?.companyName || user?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.companyProfile?.companyName || user?.name}
                </p>
                <div className="flex flex-col space-y-1 mt-1">
                  <Badge variant="success" size="sm">Nhà tuyển dụng</Badge>
                  <Badge 
                    variant={subscriptionBadge[currentPlan].variant} 
                    size="sm"
                  >
                    {subscriptionBadge[currentPlan].label}
                  </Badge>
                  {user?.companyProfile?.isVerified && (
                    <Badge variant="info" size="sm">
                      ✓ Đã xác thực
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

          {/* Upgrade CTA */}
          {currentPlan === 'basic' && (
            <div className="p-4 m-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Nâng cấp gói</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Mở khóa nhiều tính năng và đăng tin không giới hạn
              </p>
              <Link 
                to="/employer/billing"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center text-xs font-medium px-3 py-2 rounded-md transition-colors"
              >
                Xem gói dịch vụ
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
              {navigation.find(n => n.to === location.pathname)?.name || 'Nhà tuyển dụng'}
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

export default EmployerLayout;
