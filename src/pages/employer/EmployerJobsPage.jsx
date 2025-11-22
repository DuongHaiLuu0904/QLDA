import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import { Plus, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';

const EmployerJobsPage = () => {
  const { user } = useAuth();
  const { jobs, deleteJob } = useData();
  const [statusFilter, setStatusFilter] = useState('all');

  const myJobs = jobs.filter(j => j.employerId === user?.id);

  const filteredJobs = statusFilter === 'all' 
    ? myJobs 
    : myJobs.filter(j => j.status === statusFilter);

  const handleDelete = (jobId) => {
    if (window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')) {
      deleteJob(jobId);
    }
  };

  const statusColors = {
    active: 'success',
    inactive: 'default',
    expired: 'danger',
    draft: 'warning'
  };

  const statusLabels = {
    active: 'Đang hoạt động',
    inactive: 'Tạm dừng',
    expired: 'Hết hạn',
    draft: 'Nháp'
  };

  const columns = [
    {
      header: 'Tiêu đề',
      accessor: 'title',
      cell: (title, row) => (
        <div>
          <Link
            to={`/employer/jobs/${row.id}`}
            className="font-medium text-gray-900 hover:text-blue-600"
          >
            {title}
          </Link>
          <div className="flex gap-2 mt-1">
            <Badge variant="primary" size="sm">{row.level}</Badge>
            <Badge variant="default" size="sm">{row.workType}</Badge>
          </div>
        </div>
      )
    },
    {
      header: 'Lượt xem',
      accessor: 'views',
      cell: (views) => (
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1 text-gray-400" />
          <span className="font-medium">{views}</span>
        </div>
      )
    },
    {
      header: 'Ứng viên',
      accessor: 'id',
      cell: (jobId) => {
        const { applications } = useData();
        const count = applications.filter(a => a.jobId === jobId).length;
        return (
          <Link
            to={`/employer/jobs/${jobId}/applicants`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {count} ứng viên
          </Link>
        );
      }
    },
    {
      header: 'Ngày đăng',
      accessor: 'postedDate',
      cell: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      header: 'Hạn nộp',
      accessor: 'deadline',
      cell: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      header: 'Trạng thái',
      accessor: 'status',
      cell: (status) => (
        <Badge variant={statusColors[status]}>
          {statusLabels[status]}
        </Badge>
      )
    },
    {
      header: '',
      accessor: 'id',
      cell: (jobId) => (
        <div className="flex items-center gap-2">
          <Link to={`/employer/jobs/${jobId}/edit`}>
            <button className="p-2 text-blue-600 hover:text-blue-700">
              <Edit className="w-5 h-5" />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(jobId)}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  const stats = [
    {
      label: 'Tổng tin',
      value: myJobs.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Đang hoạt động',
      value: myJobs.filter(j => j.status === 'active').length,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Tạm dừng',
      value: myJobs.filter(j => j.status === 'inactive').length,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      label: 'Nháp',
      value: myJobs.filter(j => j.status === 'draft').length,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý tin tuyển dụng
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi các tin tuyển dụng của bạn
          </p>
        </div>
        <Link to="/employer/jobs/create">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Đăng tin mới
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} padding="md">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-2`}>
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <Card padding="md">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả ({myJobs.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đang hoạt động ({myJobs.filter(j => j.status === 'active').length})
          </button>
          <button
            onClick={() => setStatusFilter('inactive')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'inactive'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tạm dừng ({myJobs.filter(j => j.status === 'inactive').length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === 'draft'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Nháp ({myJobs.filter(j => j.status === 'draft').length})
          </button>
        </div>
      </Card>

      {/* Jobs Table */}
      <Card padding="none">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center">
            <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {statusFilter === 'all' 
                ? 'Chưa có tin tuyển dụng nào'
                : `Không có tin tuyển dụng ở trạng thái "${statusLabels[statusFilter]}"`}
            </h3>
            <p className="text-gray-600 mb-4">
              Bắt đầu đăng tin tuyển dụng để tìm ứng viên phù hợp
            </p>
            <Link to="/employer/jobs/create">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Đăng tin đầu tiên
              </Button>
            </Link>
          </div>
        ) : (
          <Table columns={columns} data={filteredJobs} />
        )}
      </Card>
    </div>
  );
};

export default EmployerJobsPage;
