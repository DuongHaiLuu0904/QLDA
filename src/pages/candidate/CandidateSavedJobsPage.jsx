import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { BookmarkX, MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

const CandidateSavedJobsPage = () => {
  const { user } = useAuth();
  const { jobs, savedJobs, toggleSaveJob } = useData();

  const mySavedJobs = savedJobs
    .filter(s => s.candidateId === user?.id)
    .map(saved => ({
      ...saved,
      job: jobs.find(j => j.id === saved.jobId)
    }))
    .filter(saved => saved.job);

  const handleRemove = (jobId) => {
    if (window.confirm('Bạn có chắc muốn bỏ lưu công việc này?')) {
      toggleSaveJob(jobId, user.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Việc làm đã lưu
          </h1>
          <p className="text-gray-600">
            Bạn đã lưu {mySavedJobs.length} công việc
          </p>
        </div>
        <Link to="/candidate/jobs">
          <Button>
            <Briefcase className="w-5 h-5 mr-2" />
            Tìm việc mới
          </Button>
        </Link>
      </div>

      {mySavedJobs.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12">
            <BookmarkX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có việc làm nào được lưu
            </h3>
            <p className="text-gray-600 mb-6">
              Lưu các công việc bạn quan tâm để xem lại sau
            </p>
            <Link to="/candidate/jobs">
              <Button>Khám phá việc làm</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {mySavedJobs.map(({ job, savedDate }) => (
            <Card key={job.id} padding="md" hover>
              <div className="flex items-start gap-4">
                <img
                  src={job.employerLogo}
                  alt={job.employerName}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {job.title}
                      </Link>
                      <p className="text-gray-600 font-medium mt-1">
                        {job.employerName}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(job.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Bỏ lưu"
                    >
                      <BookmarkX className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                      {job.salary.negotiable ? 'Thỏa thuận' : 
                        `${(job.salary.min / 1000000).toFixed(0)}-${(job.salary.max / 1000000).toFixed(0)} triệu`}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      Lưu: {new Date(savedDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="primary">{job.level}</Badge>
                    <Badge variant="success">{job.workType}</Badge>
                    {job.urgent && <Badge variant="danger">🔥 Gấp</Badge>}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/jobs/${job.id}`} className="flex-1">
                      <Button variant="primary" className="w-full">
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => handleRemove(job.id)}
                    >
                      Bỏ lưu
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateSavedJobsPage;
