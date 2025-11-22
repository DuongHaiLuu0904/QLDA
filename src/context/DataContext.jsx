import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  mockJobs,
  mockApplications,
  mockSavedJobs,
  mockNotifications,
  mockCategories,
  mockLocations,
  mockServicePackages,
  mockUsers,
  mockCompanies
} from '../services/mockData';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([...mockJobs]);
  const [applications, setApplications] = useState([...mockApplications]);
  const [savedJobs, setSavedJobs] = useState([...mockSavedJobs]);
  const [notifications, setNotifications] = useState([...mockNotifications]);
  const [categories, setCategories] = useState([...mockCategories]);
  const [locations, setLocations] = useState([...mockLocations]);
  const [servicePackages, setServicePackages] = useState([...mockServicePackages]);
  const [users, setUsers] = useState([...mockUsers]);
  const [companies, setCompanies] = useState([...mockCompanies]);

  // Job functions
  const createJob = (job) => {
    const newJob = {
      ...job,
      id: jobs.length + 1,
      postedDate: new Date().toISOString().split('T')[0],
      views: 0,
      applications: 0
    };
    setJobs([...jobs, newJob]);
    return newJob;
  };

  const addJob = (job) => createJob(job);

  const updateJob = (id, jobData) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, ...jobData } : j));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  // Application functions
  const applyJob = (application) => {
    const newApp = {
      ...application,
      id: applications.length + 1,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setApplications([...applications, newApp]);
    
    // Update job application count
    const job = jobs.find(j => j.id === application.jobId);
    if (job) {
      updateJob(application.jobId, {
        applications: (job.applications || 0) + 1
      });
    }
    
    return newApp;
  };

  const addApplication = (application) => applyJob(application);

  const updateApplicationStatus = (id, status, notes) => {
    setApplications(applications.map(a => 
      a.id === id ? { ...a, status, notes: notes || a.notes } : a
    ));
  };

  // Saved jobs functions
  const toggleSaveJob = (jobId, candidateId) => {
    // If candidateId not provided, use from current context (should be passed from component)
    const cId = candidateId;
    if (!cId) return;

    const existing = savedJobs.find(
      s => s.candidateId === cId && s.jobId === jobId
    );
    
    if (existing) {
      setSavedJobs(savedJobs.filter(s => s.id !== existing.id));
      return false;
    } else {
      const newSaved = {
        id: savedJobs.length + 1,
        candidateId: cId,
        jobId,
        savedDate: new Date().toISOString().split('T')[0]
      };
      setSavedJobs([...savedJobs, newSaved]);
      return true;
    }
  };

  const toggleSavedJob = (candidateId, jobId) => toggleSaveJob(jobId, candidateId);

  const isJobSaved = (candidateId, jobId) => {
    return savedJobs.some(s => s.candidateId === candidateId && s.jobId === jobId);
  };

  // Notification functions
  const addNotification = (notification) => {
    const newNotif = {
      ...notification,
      id: notifications.length + 1,
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsAsRead = (userId) => {
    setNotifications(notifications.map(n => 
      n.userId === userId ? { ...n, read: true } : n
    ));
  };

  const getUnreadCount = (userId) => {
    return notifications.filter(n => n.userId === userId && !n.read).length;
  };

  // Admin functions - User Management
  const updateUser = (userId, userData) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...userData } : u));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const blockUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  // Admin functions - Company Management
  const updateCompany = (companyId, companyData) => {
    setCompanies(companies.map(c => c.id === companyId ? { ...c, ...companyData } : c));
  };

  const verifyCompany = (companyId, verified = true) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { 
        ...c, 
        isVerified: verified,
        verifiedDate: verified ? new Date().toISOString().split('T')[0] : null
      } : c
    ));
  };

  const deleteCompany = (companyId) => {
    setCompanies(companies.filter(c => c.id !== companyId));
  };

  // Admin functions - Job Management
  const approveJob = (jobId) => {
    setJobs(jobs.map(j => 
      j.id === jobId ? { ...j, approvalStatus: 'approved', status: 'active' } : j
    ));
  };

  const rejectJob = (jobId, reason) => {
    setJobs(jobs.map(j => 
      j.id === jobId ? { ...j, approvalStatus: 'rejected', rejectionReason: reason } : j
    ));
  };

  const toggleJobStatus = (jobId) => {
    setJobs(jobs.map(j => {
      if (j.id === jobId) {
        const newStatus = j.status === 'active' ? 'closed' : 'active';
        return { ...j, status: newStatus };
      }
      return j;
    }));
  };

  // Admin functions - Category Management
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: categories.length + 1
    };
    setCategories([...categories, newCategory]);
    return newCategory;
  };

  const updateCategory = (categoryId, categoryData) => {
    setCategories(categories.map(c => c.id === categoryId ? { ...c, ...categoryData } : c));
  };

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  // Admin functions - Location Management
  const addLocation = (location) => {
    const newLocation = {
      ...location,
      id: locations.length + 1
    };
    setLocations([...locations, newLocation]);
    return newLocation;
  };

  const updateLocation = (locationId, locationData) => {
    setLocations(locations.map(l => l.id === locationId ? { ...l, ...locationData } : l));
  };

  const deleteLocation = (locationId) => {
    setLocations(locations.filter(l => l.id !== locationId));
  };

  // Admin functions - Package Management
  const addPackage = (pkg) => {
    const newPackage = {
      ...pkg,
      id: servicePackages.length + 1
    };
    setServicePackages([...servicePackages, newPackage]);
    return newPackage;
  };

  const updatePackage = (packageId, packageData) => {
    setServicePackages(servicePackages.map(p => p.id === packageId ? { ...p, ...packageData } : p));
  };

  const deletePackage = (packageId) => {
    setServicePackages(servicePackages.filter(p => p.id !== packageId));
  };

  const value = {
    jobs,
    applications,
    savedJobs,
    notifications,
    categories,
    locations,
    servicePackages,
    users,
    companies,
    createJob,
    addJob,
    updateJob,
    deleteJob,
    applyJob,
    addApplication,
    updateApplicationStatus,
    toggleSaveJob,
    toggleSavedJob,
    isJobSaved,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadCount,
    // Admin functions
    updateUser,
    deleteUser,
    blockUser,
    updateCompany,
    verifyCompany,
    deleteCompany,
    approveJob,
    rejectJob,
    toggleJobStatus,
    addCategory,
    updateCategory,
    deleteCategory,
    addLocation,
    updateLocation,
    deleteLocation,
    addPackage,
    updatePackage,
    deletePackage
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
