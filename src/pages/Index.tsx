import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/TaskQuest/Sidebar';
import { Header } from '@/components/TaskQuest/Header';
import { Dashboard } from '@/components/TaskQuest/Dashboard';
import { CharacterTab } from '@/components/TaskQuest/CharacterTab';
import { GroupsTab } from '@/components/TaskQuest/GroupsTab';
import { WellBeingTab } from '@/components/TaskQuest/WellBeingTab';
import { CalendarTab } from '@/components/TaskQuest/CalendarTab';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your quest...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'character':
        return <CharacterTab />;
      case 'groups':
        return <GroupsTab />;
      case 'wellbeing':
        return <WellBeingTab />;
      case 'calendar':
        return <CalendarTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="flex h-screen">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {renderActiveTab()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
