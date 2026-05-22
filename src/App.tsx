import { useEffect, useState } from 'react';
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
import SemenDashboard, { CDVOSemenPortal, DirectorateSemenScreen, SDVOSemenPortal } from './pages/SemenDashboard';
import { BVOMedicineQueue, FarmerMedicineApp, LacMedicineMobileApp } from './pages/MedicineMobile';
import { BVOMVUOperations, CDVOMVUOperations, DirectorateMVUOperations, MVUTeamMobileApp } from './pages/MVUOperations';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DistrictProvider } from './contexts/DistrictContext';
import LoginPage from './pages/LoginPage';
import { DistrictSemen, odishaDistricts } from './data/semenData';
import { initialMedicineRequisitions, MedicineRequisition, MedicineStockItem, medicineStock } from './data/medicineMvuData';

type Page = 'dashboard' | 'semen-dashboard' | 'semen-drilldown' | 'semen-allocation' | 'semen-redistribution' | 'semen-requests' | 'semen-reports' | 'semen-forecasting' | 'cdvo-semen' | 'sdvo-semen' | 'lac-medicine-home' | 'lac-medicine-log' | 'lac-medicine-farmer' | 'lac-medicine-barcode' | 'lac-medicine-request' | 'lac-medicine-inventory' | 'lac-medicine-offline' | 'farmer-medicine-login' | 'farmer-medicine-request' | 'farmer-medicine-history' | 'farmer-medicine-chatbot' | 'bvo-medicine-queue' | 'mvu-command' | 'mvu-compliance' | 'mvu-fleet' | 'mvu-manpower' | 'mvu-targets' | 'cdvo-mvu' | 'bvo-mvu-plan' | 'bvo-mvu-inventory' | 'bvo-mvu-assignment' | 'mvu-team-home' | 'mvu-team-visit' | 'mvu-team-daily' | 'mvu-team-stock' | 'livestock' | 'health' | 'breeding' | 'farmers' | 'dairy' | 'schemes' | 'insurance' | 'market' | 'training' | 'reports' | 'settings';

const pageRoutes: Record<string, Page> = {
  '/semen/dashboard': 'semen-dashboard',
  '/ahms/semen/dashboard': 'semen-dashboard',
  '/ahms/semen/drilldown': 'semen-drilldown',
  '/ahms/semen/allocation': 'semen-allocation',
  '/ahms/semen/redistribution': 'semen-redistribution',
  '/ahms/semen/requests': 'semen-requests',
  '/ahms/semen/reports': 'semen-reports',
  '/ahms/semen/forecasting': 'semen-forecasting',
  '/ahms/cdvo/semen': 'cdvo-semen',
  '/ahms/sdvo/semen': 'sdvo-semen',
  '/ahms/lac/medicine': 'lac-medicine-home',
  '/ahms/lac/medicine/log': 'lac-medicine-log',
  '/ahms/lac/medicine/farmer': 'lac-medicine-farmer',
  '/ahms/lac/medicine/barcode': 'lac-medicine-barcode',
  '/ahms/lac/medicine/request': 'lac-medicine-request',
  '/ahms/lac/medicine/inventory': 'lac-medicine-inventory',
  '/ahms/lac/medicine/offline': 'lac-medicine-offline',
  '/ahms/farmer/medicine/login': 'farmer-medicine-login',
  '/ahms/farmer/medicine/request': 'farmer-medicine-request',
  '/ahms/farmer/medicine/history': 'farmer-medicine-history',
  '/ahms/farmer/medicine/chatbot': 'farmer-medicine-chatbot',
  '/ahms/bvo/medicine/queue': 'bvo-medicine-queue',
  '/ahms/mvu/command': 'mvu-command',
  '/ahms/mvu/compliance': 'mvu-compliance',
  '/ahms/mvu/fleet': 'mvu-fleet',
  '/ahms/mvu/manpower': 'mvu-manpower',
  '/ahms/mvu/targets': 'mvu-targets',
  '/ahms/cdvo/mvu': 'cdvo-mvu',
  '/ahms/bvo/mvu/plan': 'bvo-mvu-plan',
  '/ahms/bvo/mvu/inventory': 'bvo-mvu-inventory',
  '/ahms/bvo/mvu/assignment': 'bvo-mvu-assignment',
  '/ahms/mvu-team/home': 'mvu-team-home',
  '/ahms/mvu-team/visit': 'mvu-team-visit',
  '/ahms/mvu-team/daily': 'mvu-team-daily',
  '/ahms/mvu-team/stock': 'mvu-team-stock',
  '/dashboard': 'dashboard',
  '/ahms/dashboard': 'dashboard',
};

const routePaths: Partial<Record<Page, string>> = {
  'semen-dashboard': '/ahms/semen/dashboard',
  'semen-drilldown': '/ahms/semen/drilldown',
  'semen-allocation': '/ahms/semen/allocation',
  'semen-redistribution': '/ahms/semen/redistribution',
  'semen-requests': '/ahms/semen/requests',
  'semen-reports': '/ahms/semen/reports',
  'semen-forecasting': '/ahms/semen/forecasting',
  'cdvo-semen': '/ahms/cdvo/semen',
  'sdvo-semen': '/ahms/sdvo/semen',
  'lac-medicine-home': '/ahms/lac/medicine',
  'lac-medicine-log': '/ahms/lac/medicine/log',
  'lac-medicine-farmer': '/ahms/lac/medicine/farmer',
  'lac-medicine-barcode': '/ahms/lac/medicine/barcode',
  'lac-medicine-request': '/ahms/lac/medicine/request',
  'lac-medicine-inventory': '/ahms/lac/medicine/inventory',
  'lac-medicine-offline': '/ahms/lac/medicine/offline',
  'farmer-medicine-login': '/ahms/farmer/medicine/login',
  'farmer-medicine-request': '/ahms/farmer/medicine/request',
  'farmer-medicine-history': '/ahms/farmer/medicine/history',
  'farmer-medicine-chatbot': '/ahms/farmer/medicine/chatbot',
  'bvo-medicine-queue': '/ahms/bvo/medicine/queue',
  'mvu-command': '/ahms/mvu/command',
  'mvu-compliance': '/ahms/mvu/compliance',
  'mvu-fleet': '/ahms/mvu/fleet',
  'mvu-manpower': '/ahms/mvu/manpower',
  'mvu-targets': '/ahms/mvu/targets',
  'cdvo-mvu': '/ahms/cdvo/mvu',
  'bvo-mvu-plan': '/ahms/bvo/mvu/plan',
  'bvo-mvu-inventory': '/ahms/bvo/mvu/inventory',
  'bvo-mvu-assignment': '/ahms/bvo/mvu/assignment',
  'mvu-team-home': '/ahms/mvu-team/home',
  'mvu-team-visit': '/ahms/mvu-team/visit',
  'mvu-team-daily': '/ahms/mvu-team/daily',
  'mvu-team-stock': '/ahms/mvu-team/stock',
  dashboard: '/ahms/dashboard',
};

const semenScreens: Partial<Record<Page, DirectorateSemenScreen>> = {
  'semen-dashboard': 'state',
  'semen-drilldown': 'drilldown',
  'semen-allocation': 'allocation',
  'semen-redistribution': 'redistribution',
  'semen-requests': 'requests',
  'semen-reports': 'reports',
  'semen-forecasting': 'forecasting',
};

const lacMedicineScreens: Partial<Record<Page, Parameters<typeof LacMedicineMobileApp>[0]['screen']>> = {
  'lac-medicine-home': 'home',
  'lac-medicine-log': 'log',
  'lac-medicine-farmer': 'farmer',
  'lac-medicine-barcode': 'barcode',
  'lac-medicine-request': 'request',
  'lac-medicine-inventory': 'inventory',
  'lac-medicine-offline': 'offline',
};

const farmerMedicineScreens: Partial<Record<Page, Parameters<typeof FarmerMedicineApp>[0]['screen']>> = {
  'farmer-medicine-login': 'login',
  'farmer-medicine-request': 'request',
  'farmer-medicine-history': 'history',
  'farmer-medicine-chatbot': 'chatbot',
};

const mvuDirectorateScreens: Partial<Record<Page, Parameters<typeof DirectorateMVUOperations>[0]['screen']>> = {
  'mvu-command': 'command',
  'mvu-compliance': 'compliance',
  'mvu-fleet': 'fleet',
  'mvu-manpower': 'manpower',
  'mvu-targets': 'targets',
};

const bvoMvuScreens: Partial<Record<Page, Parameters<typeof BVOMVUOperations>[0]['screen']>> = {
  'bvo-mvu-plan': 'plan',
  'bvo-mvu-inventory': 'inventory',
  'bvo-mvu-assignment': 'assignment',
};

const mvuTeamScreens: Partial<Record<Page, Parameters<typeof MVUTeamMobileApp>[0]['screen']>> = {
  'mvu-team-home': 'home',
  'mvu-team-visit': 'visit',
  'mvu-team-daily': 'daily',
  'mvu-team-stock': 'stock',
};

const getInitialPage = (fallback: string): Page => {
  const routePage = pageRoutes[window.location.pathname];
  if (routePage) return routePage;
  return fallback as Page;
};

function AppShell() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage(user?.homePath ?? 'dashboard'));
  const [semenDistricts, setSemenDistricts] = useState<DistrictSemen[]>(odishaDistricts);
  const [medicineInventory, setMedicineInventory] = useState<MedicineStockItem[]>(medicineStock);
  const [medicineRequests, setMedicineRequests] = useState<MedicineRequisition[]>(initialMedicineRequisitions);
  const [tourStatus, setTourStatus] = useState('Draft');
  const [visitSynced, setVisitSynced] = useState(false);

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    const path = routePaths[page];
    if (path && window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  useEffect(() => {
    if (user) {
      const routedPage = pageRoutes[window.location.pathname];
      if (!routedPage && user.homePath) {
        navigateToPage(user.homePath as Page);
      }
    }
  }, [user]);

  if (!user) return <LoginPage />;

  const renderPage = () => {
    if (semenScreens[currentPage]) {
      return (
        <SemenDashboard
          screen={semenScreens[currentPage]}
          districts={semenDistricts}
          onDistrictsChange={setSemenDistricts}
          onNavigate={(page) => navigateToPage(page as Page)}
        />
      );
    }
    if (lacMedicineScreens[currentPage]) {
      return (
        <LacMedicineMobileApp
          screen={lacMedicineScreens[currentPage]}
          stock={medicineInventory}
          requisitions={medicineRequests}
          onStockChange={setMedicineInventory}
          onRequisitionAdd={(request) => setMedicineRequests((items) => [request, ...items])}
          onNavigate={(page) => navigateToPage(page as Page)}
        />
      );
    }
    if (farmerMedicineScreens[currentPage]) {
      return <FarmerMedicineApp screen={farmerMedicineScreens[currentPage]} onNavigate={(page) => navigateToPage(page as Page)} />;
    }
    if (mvuDirectorateScreens[currentPage]) {
      return <DirectorateMVUOperations screen={mvuDirectorateScreens[currentPage]} onNavigate={(page) => navigateToPage(page as Page)} />;
    }
    if (bvoMvuScreens[currentPage]) {
      return <BVOMVUOperations screen={bvoMvuScreens[currentPage]} tourStatus={tourStatus} onTourStatusChange={setTourStatus} onNavigate={(page) => navigateToPage(page as Page)} />;
    }
    if (mvuTeamScreens[currentPage]) {
      return (
        <MVUTeamMobileApp
          screen={mvuTeamScreens[currentPage]}
          visitSynced={visitSynced}
          onVisitSynced={setVisitSynced}
          stock={medicineInventory}
          onStockChange={setMedicineInventory}
          onNavigate={(page) => navigateToPage(page as Page)}
        />
      );
    }

    switch (currentPage) {
      case 'cdvo-semen': return <CDVOSemenPortal districts={semenDistricts} />;
      case 'sdvo-semen': return <SDVOSemenPortal districts={semenDistricts} />;
      case 'bvo-medicine-queue': return <BVOMedicineQueue requisitions={medicineRequests} />;
      case 'cdvo-mvu': return <CDVOMVUOperations />;
      case 'livestock': return <LivestockManagement />;
      case 'health': return <HealthVaccination />;
      case 'breeding': return <BreedingAI />;
      case 'farmers': return <FarmersManagement />;
      case 'dairy': return <DairyCollection />;
      case 'schemes': return <GovernmentSchemes />;
      case 'insurance': return <Insurance />;
      case 'market': return <Market />;
      case 'training': return <Training />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <EnhancedDashboard onNavigate={(page) => navigateToPage(page as Page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-mesh">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        currentPage={currentPage}
        onNavigate={(page) => navigateToPage(page as Page)}
      />
      <Header isCollapsed={isCollapsed} />
      <main className={`pt-20 pb-8 px-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>
        <div className="max-w-[1600px] mx-auto">{renderPage()}</div>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DistrictProvider>
          <AppShell />
        </DistrictProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
