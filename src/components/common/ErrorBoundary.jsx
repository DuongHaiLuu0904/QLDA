import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // TODO: Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })}
      />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, errorInfo, resetError }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetError();
    navigate('/');
  };

  const handleReload = () => {
    resetError();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Có lỗi xảy ra
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            Đã có lỗi không mong muốn xảy ra. Đừng lo lắng, dữ liệu của bạn vẫn an toàn. 
            Vui lòng thử tải lại trang hoặc quay về trang chủ.
          </p>

          {/* Error Details (Development only) */}
          {import.meta.env.DEV && error && (
            <div className="mb-8 text-left">
              <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                  Chi tiết lỗi (Development Mode)
                </summary>
                <div className="mt-4 space-y-2">
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-sm font-mono text-red-800 break-all">
                      <strong>Error:</strong> {error.toString()}
                    </p>
                  </div>
                  {errorInfo && (
                    <div className="bg-gray-100 border border-gray-300 rounded p-3">
                      <p className="text-xs font-mono text-gray-700 whitespace-pre-wrap break-all">
                        {errorInfo.componentStack}
                      </p>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              Tải lại trang
            </button>
            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </button>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-gray-500">
            Nếu lỗi vẫn tiếp tục, vui lòng liên hệ{' '}
            <a href="mailto:support@jobportal.com" className="text-blue-600 hover:underline">
              support@jobportal.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
