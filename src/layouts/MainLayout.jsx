import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, User, LogOut, Briefcase, Search, 
  Home, Building2, Users, Settings, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const MainLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, switchRole } = useAuth();
  const { getUnreadCount } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDemoSwitch = (role, userId) => {
    switchRole(role, userId);
    setDemoMenuOpen(false);
    
    // Navigate to appropriate dashboard
    if (role === 'candidate') navigate('/candidate/dashboard');
    if (role === 'employer') navigate('/employer/dashboard');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  const unreadCount = user ? getUnreadCount(user.id) : 0;

  const publicLinks = [
    { to: '/', label: 'Trang chủ', icon: Home },
    { to: '/jobs', label: 'Việc làm', icon: Briefcase },
    { to: '/companies', label: 'Công ty', icon: Building2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">JobPortal</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${location.pathname === link.to
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Demo Switcher - Development Only */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                  className="flex items-center space-x-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Demo Mode</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {demoMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">
                      Switch Role
                    </div>
                    <button
                      onClick={() => handleDemoSwitch('candidate', 1)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Candidate (Nguyễn Văn A)</span>
                    </button>
                    <button
                      onClick={() => handleDemoSwitch('employer', 3)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Employer (FPT Software)</span>
                    </button>
                    <button
                      onClick={() => handleDemoSwitch('admin', 5)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Admin (System Admin)</span>
                    </button>
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <button 
                    onClick={() => navigate('/notifications')}
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={user.avatar || 'https://i.pravatar.cc/150'}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="hidden md:block text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <Badge variant="primary" size="sm" className="mt-1">
                            {user.role === 'candidate' ? 'Ứng viên' : 
                             user.role === 'employer' ? 'Nhà tuyển dụng' : 'Quản trị viên'}
                          </Badge>
                        </div>
                        
                        {user.role === 'candidate' && (
                          <>
                            <Link
                              to="/candidate/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Dashboard
                            </Link>
                            <Link
                              to="/candidate/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Hồ sơ của tôi
                            </Link>
                          </>
                        )}
                        
                        {user.role === 'employer' && (
                          <>
                            <Link
                              to="/employer/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Dashboard
                            </Link>
                            <Link
                              to="/employer/jobs"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Quản lý tin tuyển dụng
                            </Link>
                          </>
                        )}
                        
                        {user.role === 'admin' && (
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        
                        <div className="border-t border-gray-200 mt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/login')}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/register')}
                  >
                    Đăng ký
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium
                    ${location.pathname === link.to
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="w-6 h-6" />
                <span className="text-lg font-bold">JobPortal</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nền tảng tuyển dụng hàng đầu Việt Nam
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Dành cho ứng viên</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/jobs" className="hover:text-white">Tìm việc làm</Link></li>
                <li><Link to="/companies" className="hover:text-white">Công ty</Link></li>
                <li><Link to="/register" className="hover:text-white">Tạo CV</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Dành cho nhà tuyển dụng</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/employer/register" className="hover:text-white">Đăng tin tuyển dụng</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Bảng giá</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: contact@jobportal.vn</li>
                <li>Hotline: 1900 xxxx</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
