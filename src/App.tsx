import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { EnhancedDashboard } from './components/dashboard/EnhancedDashboard';
import LivestockManagement from './pages/LivestockManagement';
import HealthVaccination from './pages/HealthVaccination';
import BreedingAI from './pages/BreedingAI';
import FarmersManagement from './pages/FarmersManagement';
import DairyCollection from './pages/DairyCollection';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Insurance from './pages/Insurance';
import Market from './pages/Market';
import Training from './pages/Training';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { LanguageProvider } from './contexts/LanguageContext';

type Page = 'dashboard' | 'livestock' | 'health' | 'breeding' | 'farmers' | 'dairy' | 'schemes' | 'insurance' | 'market' | 'training' | 'reports' | 'settings';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'livestock':
        return <LivestockManagement />;
      case 'health':
        return <HealthVaccination />;
      case 'breeding':
        return <BreedingAI />;
      case 'farmers':
        return <FarmersManagement />;
      case 'dairy':
        return <DairyCollection />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'insurance':
        return <Insurance />;
      case 'market':
        return <Market />;
      case 'training':
        return <Training />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <EnhancedDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-mesh">
        <Sidebar 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)}
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page as Page)}
        />
        <Header isCollapsed={isCollapsed} />
        
        {/* Main Content */}
        <main
          className={`pt-20 pb-8 px-8 transition-all duration-300 ${
            isCollapsed ? 'ml-20' : 'ml-72'
          }`}
        >
          <div className="max-w-[1600px] mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;