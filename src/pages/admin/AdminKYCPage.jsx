import { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
    Shield, FileText, CheckCircle, XCircle,
    Eye, Calendar, Building2, AlertCircle
} from 'lucide-react';

const AdminKYCPage = () => {
    const [kycRequests, setKycRequests] = useState([
        {
            id: 1,
            companyId: 8,
            companyName: 'VNLife',
            submittedDate: '2025-03-15',
            status: 'pending',
            documents: [
                { type: 'Giấy phép kinh doanh', url: '/docs/business-license.pdf', verified: false },
                { type: 'CMND/CCCD người đại diện', url: '/docs/id-card.pdf', verified: false },
                { type: 'Giấy xác nhận địa chỉ', url: '/docs/address-proof.pdf', verified: false }
            ],
            companyInfo: {
                taxCode: '0108888888',
                address: '123 Lý Tự Trọng, Q.1, TP.HCM',
                representative: 'Nguyễn Văn A',
                email: 'hr@vnlife.vn',
                phone: '028-3823-5555'
            }
        },
        {
            id: 2,
            companyId: 14,
            companyName: 'Be Group',
            submittedDate: '2025-03-18',
            status: 'pending',
            documents: [
                { type: 'Giấy phép kinh doanh', url: '/docs/business-license-2.pdf', verified: false },
                { type: 'CMND/CCCD người đại diện', url: '/docs/id-card-2.pdf', verified: false }
            ],
            companyInfo: {
                taxCode: '0317654321',
                address: 'Tầng 10, Tòa nhà Me Linh Point, 2 Ngô Đức Kế, Q.1, TP.HCM',
                representative: 'Trần Thị B',
                email: 'jobs@be.com.vn',
                phone: '1900-xxxx'
            }
        }
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleApprove = (requestId) => {
        if (confirm('Phê duyệt yêu cầu KYC này?')) {
            setKycRequests(kycRequests.map(req =>
                req.id === requestId ? { ...req, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] } : req
            ));
            setSelectedRequest(null);
        }
    };

    const handleReject = (requestId) => {
        const reason = prompt('Lý do từ chối:');
        if (reason) {
            setKycRequests(kycRequests.map(req =>
                req.id === requestId ? { ...req, status: 'rejected', rejectionReason: reason } : req
            ));
            setSelectedRequest(null);
        }
    };

    const pendingCount = kycRequests.filter(r => r.status === 'pending').length;
    const approvedCount = kycRequests.filter(r => r.status === 'approved').length;
    const rejectedCount = kycRequests.filter(r => r.status === 'rejected').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Duyệt KYC</h1>
                <p className="text-gray-600">Xác minh danh tính và giấy tờ công ty</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng yêu cầu', value: kycRequests.length, icon: FileText, color: 'blue' },
                    { label: 'Chờ duyệt', value: pendingCount, icon: AlertCircle, color: 'yellow' },
                    { label: 'Đã duyệt', value: approvedCount, icon: CheckCircle, color: 'green' },
                    { label: 'Từ chối', value: rejectedCount, icon: XCircle, color: 'red' }
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <div className="p-4">
                                <div className={`inline-flex items-center justify-center w-10 h-10 bg-${stat.color}-100 rounded-lg mb-3`}>
                                    <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* KYC Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Requests List */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu xác thực</h2>
                        <div className="space-y-3">
                            {kycRequests.map(request => (
                                <div
                                    key={request.id}
                                    onClick={() => setSelectedRequest(request)}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedRequest?.id === request.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-5 w-5 text-gray-600" />
                                                <p className="font-medium text-gray-900">{request.companyName}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                MST: {request.companyInfo.taxCode}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {new Date(request.submittedDate).toLocaleDateString('vi-VN')}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {request.status === 'pending' && <Badge variant="warning">Chờ duyệt</Badge>}
                                            {request.status === 'approved' && <Badge variant="success">Đã duyệt</Badge>}
                                            {request.status === 'rejected' && <Badge variant="danger">Từ chối</Badge>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Request Detail */}
                <Card>
                    <div className="p-6">
                        {selectedRequest ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <h2 className="text-lg font-semibold text-gray-900">Chi tiết yêu cầu</h2>
                                    {selectedRequest.status === 'pending' && <Badge variant="warning">Chờ duyệt</Badge>}
                                    {selectedRequest.status === 'approved' && <Badge variant="success">Đã duyệt</Badge>}
                                    {selectedRequest.status === 'rejected' && <Badge variant="danger">Từ chối</Badge>}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Thông tin công ty</p>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-gray-600" />
                                            <span className="font-medium">{selectedRequest.companyName}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">MST: {selectedRequest.companyInfo.taxCode}</p>
                                        <p className="text-sm text-gray-700">Người đại diện: {selectedRequest.companyInfo.representative}</p>
                                        <p className="text-sm text-gray-700">Email: {selectedRequest.companyInfo.email}</p>
                                        <p className="text-sm text-gray-700">SĐT: {selectedRequest.companyInfo.phone}</p>
                                        <p className="text-sm text-gray-700">Địa chỉ: {selectedRequest.companyInfo.address}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Giấy tờ đính kèm</p>
                                    <div className="space-y-2">
                                        {selectedRequest.documents.map((doc, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-5 w-5 text-gray-600" />
                                                    <span className="text-sm text-gray-900">{doc.type}</span>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Xem
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Ngày nộp: {new Date(selectedRequest.submittedDate).toLocaleDateString('vi-VN')}</span>
                                </div>

                                {selectedRequest.status === 'rejected' && selectedRequest.rejectionReason && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-red-900">Lý do từ chối</p>
                                                <p className="text-sm text-red-700 mt-1">{selectedRequest.rejectionReason}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedRequest.status === 'approved' && selectedRequest.approvedDate && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium text-green-900">Đã phê duyệt</p>
                                                <p className="text-sm text-green-700">
                                                    Ngày duyệt: {new Date(selectedRequest.approvedDate).toLocaleDateString('vi-VN')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedRequest.status === 'pending' && (
                                    <div className="flex justify-end gap-3 pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleReject(selectedRequest.id)}
                                            className="text-red-600"
                                        >
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Từ chối
                                        </Button>
                                        <Button onClick={() => handleApprove(selectedRequest.id)}>
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Phê duyệt
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600">Chọn một yêu cầu để xem chi tiết</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminKYCPage;
