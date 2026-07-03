import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import AdminPage from './AdminPage';
import CRMDashboard from '../pages/CRMDashboard';

type AdminTab = 'cms' | 'crm';

const adminTabs: { key: AdminTab; label: string; icon: React.ElementType }[] = [
  { key: 'cms', label: 'CMS 內容管理', icon: LayoutDashboard },
  { key: 'crm', label: 'CRM 客戶管理', icon: Users },
];

const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<AdminTab>('cms');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'crm' || tab === 'cms') {
      setActiveTab(tab);
    } else if (location.pathname === '/crm') {
      setActiveTab('crm');
      setSearchParams({ tab: 'crm' }, { replace: true });
    }
  }, [searchParams, location.pathname, setSearchParams]);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      {/* Top-level admin tabs */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-cream-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 py-3">
            <FileText size={18} className="text-gold-500 mr-2" />
            <span className="text-sm font-medium text-navy-800 mr-4">管理後台</span>
            {adminTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.key
                    ? 'bg-navy-900 text-white'
                    : 'text-navy-600 hover:bg-cream-100'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="pt-16">
        {activeTab === 'cms' && <AdminPage />}
        {activeTab === 'crm' && <CRMDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard;
