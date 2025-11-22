import React from 'react';

// Spinner Component
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]} ${className}`} />
  );
};

// Full Page Loading
export const PageLoader = ({ message = 'Đang tải...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

// Card Skeleton
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded-full w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[...Array(columns)].map((_, index) => (
              <th key={index} className="px-6 py-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Job Card Skeleton
export const JobCardSkeleton = ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
          <div className="flex items-start gap-4 mb-4">
            {/* Company Logo */}
            <div className="w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0" />
            
            <div className="flex-1">
              {/* Job Title */}
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              {/* Company Name */}
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            
            {/* Save Button */}
            <div className="w-8 h-8 bg-gray-200 rounded" />
          </div>

          {/* Job Info */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-28" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-20" />
            <div className="h-6 bg-gray-200 rounded-full w-24" />
            <div className="h-6 bg-gray-200 rounded-full w-16" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-9 bg-gray-200 rounded w-24" />
          </div>
        </div>
      ))}
    </>
  );
};

// Profile Skeleton
export const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-28" />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <div className="h-5 bg-gray-200 rounded w-32 mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// List Skeleton
export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Stats Card Skeleton
export const StatsCardSkeleton = ({ count = 4 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      ))}
    </>
  );
};

// Button Loading State
export const ButtonLoader = ({ children, isLoading, ...props }) => {
  return (
    <button disabled={isLoading} {...props}>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner size="sm" className="border-white" />
          <span>Đang xử lý...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Empty State Component
export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action}
    </div>
  );
};

export default {
  Spinner,
  PageLoader,
  CardSkeleton,
  TableSkeleton,
  JobCardSkeleton,
  ProfileSkeleton,
  ListSkeleton,
  StatsCardSkeleton,
  ButtonLoader,
  EmptyState
};
