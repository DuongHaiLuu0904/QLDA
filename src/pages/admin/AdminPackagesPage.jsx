import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { DollarSign, Plus, Edit, Check, X } from 'lucide-react';

const AdminPackagesPage = () => {
  const { servicePackages, updatePackage, addPackage } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleSave = () => {
    if (editingPackage.id) {
      updatePackage(editingPackage.id, editingPackage);
    } else {
      addPackage(editingPackage);
    }
    setShowModal(false);
    setEditingPackage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gói dịch vụ</h1>
          <p className="text-gray-600">Quản lý gói đăng ký cho nhà tuyển dụng</p>
        </div>
        <Button onClick={() => { setEditingPackage({ name: '', price: 0, duration: 30, features: [] }); setShowModal(true); }}>
          <Plus className="h-4 w-4 mr-2" />Thêm gói
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicePackages.map(pkg => (
          <Card key={pkg.id} className={pkg.popular ? 'ring-2 ring-blue-500' : ''}>
            <div className="p-6">
              {pkg.popular && (
                <Badge variant="warning" className="mb-4">Phổ biến nhất</Badge>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.nameVi}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {pkg.price === 0 ? 'Miễn phí' : `${new Intl.NumberFormat('vi-VN').format(pkg.price)}đ`}
                </span>
                {pkg.price > 0 && <span className="text-gray-600">/{pkg.duration} ngày</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" onClick={() => { setEditingPackage(pkg); setShowModal(true); }}>
                <Edit className="h-4 w-4 mr-2" />Chỉnh sửa
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showModal && editingPackage && (
        <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingPackage(null); }} title={editingPackage.id ? 'Sửa gói dịch vụ' : 'Thêm gói dịch vụ'}>
          <div className="space-y-4">
            <Input label="Tên gói" value={editingPackage.nameVi || ''} onChange={(e) => setEditingPackage({ ...editingPackage, nameVi: e.target.value })} />
            <Input label="Giá (VND)" type="number" value={editingPackage.price} onChange={(e) => setEditingPackage({ ...editingPackage, price: parseInt(e.target.value) })} />
            <Input label="Thời hạn (ngày)" type="number" value={editingPackage.duration} onChange={(e) => setEditingPackage({ ...editingPackage, duration: parseInt(e.target.value) })} />
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editingPackage.popular || false} onChange={(e) => setEditingPackage({ ...editingPackage, popular: e.target.checked })} className="rounded" />
                <span className="text-sm text-gray-700">Gói phổ biến</span>
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setShowModal(false); setEditingPackage(null); }}>Hủy</Button>
              <Button onClick={handleSave}>Lưu</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPackagesPage;
