import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import { Tag, MapPin, Plus, Edit, Trash2, Save } from 'lucide-react';

const AdminCategoriesPage = () => {
  const { 
    categories, 
    locations, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    addLocation,
    updateLocation,
    deleteLocation
  } = useData();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);

  const handleSaveCategory = () => {
    if (editingCategory.id) {
      updateCategory(editingCategory.id, editingCategory);
    } else {
      addCategory(editingCategory);
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Xóa danh mục này?')) {
      deleteCategory(id);
    }
  };

  const handleSaveLocation = () => {
    if (editingLocation.id) {
      updateLocation(editingLocation.id, editingLocation);
    } else {
      addLocation(editingLocation);
    }
    setShowLocationModal(false);
    setEditingLocation(null);
  };

  const handleDeleteLocation = (id) => {
    if (confirm('Xóa địa điểm này?')) {
      deleteLocation(id);
    }
  };

  const categoryColumns = [
    { header: 'Tên danh mục', accessor: 'name', render: (cat) => <span className="font-medium">{cat.name}</span> },
    { header: 'Slug', accessor: 'slug', render: (cat) => <span className="text-gray-600">{cat.slug}</span> },
    { header: 'Số công việc', accessor: 'count', render: (cat) => <span className="text-gray-900">{cat.count}</span> },
    {
      header: 'Hành động',
      accessor: 'actions',
      render: (cat) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setEditingCategory(cat); setShowCategoryModal(true); }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteCategory(cat.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const locationColumns = [
    { header: 'Tên địa điểm', accessor: 'name', render: (loc) => <span className="font-medium">{loc.name}</span> },
    { header: 'Slug', accessor: 'slug', render: (loc) => <span className="text-gray-600">{loc.slug}</span> },
    { header: 'Số công việc', accessor: 'count', render: (loc) => <span className="text-gray-900">{loc.count}</span> },
    {
      header: 'Hành động',
      accessor: 'actions',
      render: (loc) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setEditingLocation(loc); setShowLocationModal(true); }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteLocation(loc.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Danh mục hệ thống</h1>
        <p className="text-gray-600">Quản lý danh mục công việc và địa điểm</p>
      </div>

      {/* Categories */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-600" />
              Danh mục công việc
            </h2>
            <Button onClick={() => { setEditingCategory({ name: '', slug: '', count: 0 }); setShowCategoryModal(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm danh mục
            </Button>
          </div>
          <Table columns={categoryColumns} data={categories} />
        </div>
      </Card>

      {/* Locations */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Địa điểm
            </h2>
            <Button onClick={() => { setEditingLocation({ name: '', slug: '', count: 0 }); setShowLocationModal(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm địa điểm
            </Button>
          </div>
          <Table columns={locationColumns} data={locations} />
        </div>
      </Card>

      {/* Category Modal */}
      {showCategoryModal && editingCategory && (
        <Modal isOpen={showCategoryModal} onClose={() => { setShowCategoryModal(false); setEditingCategory(null); }} title={editingCategory.id ? 'Sửa danh mục' : 'Thêm danh mục'}>
          <div className="space-y-4">
            <Input label="Tên danh mục" value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} />
            <Input label="Slug" value={editingCategory.slug} onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })} />
            <Input label="Số công việc" type="number" value={editingCategory.count} onChange={(e) => setEditingCategory({ ...editingCategory, count: parseInt(e.target.value) })} />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setShowCategoryModal(false); setEditingCategory(null); }}>Hủy</Button>
              <Button onClick={handleSaveCategory}><Save className="h-4 w-4 mr-2" />Lưu</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Location Modal */}
      {showLocationModal && editingLocation && (
        <Modal isOpen={showLocationModal} onClose={() => { setShowLocationModal(false); setEditingLocation(null); }} title={editingLocation.id ? 'Sửa địa điểm' : 'Thêm địa điểm'}>
          <div className="space-y-4">
            <Input label="Tên địa điểm" value={editingLocation.name} onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })} />
            <Input label="Slug" value={editingLocation.slug} onChange={(e) => setEditingLocation({ ...editingLocation, slug: e.target.value })} />
            <Input label="Số công việc" type="number" value={editingLocation.count} onChange={(e) => setEditingLocation({ ...editingLocation, count: parseInt(e.target.value) })} />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setShowLocationModal(false); setEditingLocation(null); }}>Hủy</Button>
              <Button onClick={handleSaveLocation}><Save className="h-4 w-4 mr-2" />Lưu</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
