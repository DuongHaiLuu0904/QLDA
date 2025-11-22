import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { mockUsers } from '../../services/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  Calendar, Clock, Video, MapPin, Briefcase, User, 
  CheckCircle, XCircle, AlertCircle, Phone, Mail,
  ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

const CandidateInterviewsPage = () => {
  const { user } = useAuth();
  const { applications } = useData();
  
  const [filter, setFilter] = useState('upcoming'); // upcoming, past, all
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get interviews from applications with interview status
  const interviews = useMemo(() => {
    return applications
      .filter(app => 
        app.candidateId === user?.id && 
        (app.status === 'interview' || app.status === 'hired' || app.status === 'rejected') &&
        app.interviewDate
      )
      .map(app => {
        const job = mockUsers.find(u => u.id === app.jobId);
        const employer = mockUsers.find(u => u.id === app.jobId);
        
        return {
          id: app.id,
          jobTitle: app.jobTitle || 'Software Developer',
          company: app.employerName || 'Tech Company',
          companyLogo: employer?.logo || 'https://via.placeholder.com/50',
          date: app.interviewDate,
          time: app.interviewTime || '14:00',
          location: app.interviewLocation || 'Online',
          type: app.interviewType || 'video',
          status: app.status,
          interviewer: app.interviewer || 'HR Manager',
          notes: app.interviewNotes || '',
          meetingLink: app.meetingLink || 'https://meet.google.com/abc-defg-hij'
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [applications, user]);

  const filteredInterviews = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (filter === 'upcoming') {
      return interviews.filter(i => new Date(i.date) >= now);
    } else if (filter === 'past') {
      return interviews.filter(i => new Date(i.date) < now);
    }
    return interviews;
  }, [interviews, filter]);

  const upcomingCount = interviews.filter(i => new Date(i.date) >= new Date()).length;
  const pastCount = interviews.filter(i => new Date(i.date) < new Date()).length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'interview':
        return 'warning';
      case 'hired':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'interview':
        return 'Chờ phỏng vấn';
      case 'hired':
        return 'Đã tuyển';
      case 'rejected':
        return 'Không đạt';
      default:
        return status;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return Video;
      case 'phone':
        return Phone;
      case 'onsite':
        return MapPin;
      default:
        return Calendar;
    }
  };

  const stats = [
    {
      label: 'Sắp tới',
      value: upcomingCount,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Đã qua',
      value: pastCount,
      icon: Clock,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      label: 'Thành công',
      value: interviews.filter(i => i.status === 'hired').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lịch phỏng vấn</h1>
        <p className="text-gray-600">Quản lý và theo dõi lịch phỏng vấn của bạn</p>
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
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <div className="flex gap-2">
              <Button
                variant={filter === 'upcoming' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('upcoming')}
              >
                Sắp tới ({upcomingCount})
              </Button>
              <Button
                variant={filter === 'past' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('past')}
              >
                Đã qua ({pastCount})
              </Button>
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Tất cả ({interviews.length})
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Interview List */}
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((interview) => {
            const TypeIcon = getTypeIcon(interview.type);
            const interviewDate = new Date(interview.date);
            const isUpcoming = interviewDate >= new Date();

            return (
              <Card key={interview.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={interview.companyLogo}
                        alt={interview.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {interview.jobTitle}
                        </h3>
                        <p className="text-gray-600 mb-2">{interview.company}</p>
                        <Badge variant={getStatusColor(interview.status)}>
                          {getStatusText(interview.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày phỏng vấn</p>
                        <p className="font-medium text-gray-900">
                          {interviewDate.toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Thời gian</p>
                        <p className="font-medium text-gray-900">{interview.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <TypeIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hình thức</p>
                        <p className="font-medium text-gray-900">
                          {interview.type === 'video' && 'Video call'}
                          {interview.type === 'phone' && 'Điện thoại'}
                          {interview.type === 'onsite' && 'Trực tiếp'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <User className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Người phỏng vấn</p>
                        <p className="font-medium text-gray-900">{interview.interviewer}</p>
                      </div>
                    </div>
                  </div>

                  {interview.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Ghi chú:</p>
                      <p className="text-sm text-gray-600">{interview.notes}</p>
                    </div>
                  )}

                  {isUpcoming && interview.type === 'video' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        className="flex-1"
                        onClick={() => window.open(interview.meetingLink, '_blank')}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Tham gia phỏng vấn
                      </Button>
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Thêm vào lịch
                      </Button>
                    </div>
                  )}

                  {!isUpcoming && interview.status === 'interview' && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 text-amber-600">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">Đang chờ kết quả phỏng vấn</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'upcoming' ? 'Chưa có lịch phỏng vấn sắp tới' : 'Chưa có lịch phỏng vấn'}
              </h3>
              <p className="text-gray-600">
                {filter === 'upcoming' 
                  ? 'Khi có lịch phỏng vấn mới, bạn sẽ nhận được thông báo tại đây'
                  : 'Bạn chưa có lịch phỏng vấn nào'}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card>
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Chuẩn bị cho buổi phỏng vấn
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">✓ Nghiên cứu công ty</p>
              <p className="text-sm text-gray-600">
                Tìm hiểu về sản phẩm, văn hóa và giá trị của công ty
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">✓ Chuẩn bị câu hỏi</p>
              <p className="text-sm text-gray-600">
                Chuẩn bị sẵn các câu hỏi để hỏi nhà tuyển dụng
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">✓ Kiểm tra thiết bị</p>
              <p className="text-sm text-gray-600">
                Đảm bảo camera, mic và kết nối internet ổn định
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">✓ Đúng giờ</p>
              <p className="text-sm text-gray-600">
                Tham gia sớm 5-10 phút để kiểm tra kỹ thuật
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CandidateInterviewsPage;
