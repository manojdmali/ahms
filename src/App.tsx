import { useEffect, useMemo, useState } from 'react';
import { Bot, Download, Mic, Send, Share2, Sparkles, X } from 'lucide-react';
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
import { FarmerMedicineApp, LacMedicineMobileApp } from './pages/MedicineMobile';
import BVOMedicineQueue from './pages/BVOMedicineQueue';
import { BVOMVUOperations, CDVOMVUOperations, DirectorateMVUOperations, MVUTeamMobileApp } from './pages/MVUOperations';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DistrictProvider } from './contexts/DistrictContext';
import LoginPage from './pages/LoginPage';
import { DistrictSemen, odishaDistricts } from './data/semenData';
import { initialMedicineRequisitions, MedicineRequisition, MedicineStockItem, medicineStock } from './data/medicineMvuData';
import ahmsAiMockData from './data/ahmsAiMockData.json';

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

const formatNumber = (value: number) => new Intl.NumberFormat('en-IN').format(Math.round(value));

function AhmsAiChatbot({
  districts,
  currentPage,
  isOpen,
  onOpenChange,
}: {
  districts: DistrictSemen[];
  currentPage: Page;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState('Show semen stock and service summary');
  const [answer, setAnswer] = useState('Hi, I am AHMS AI. Ask me for a report, summary, stock alert, or farmer service history.');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState('');

  const reportStats = useMemo(() => {
    const totalStock = districts.reduce((sum, district) => sum + district.stock, 0);
    const totalUsed = districts.reduce((sum, district) => sum + district.used, 0);
    const totalTarget = districts.reduce((sum, district) => sum + district.target, 0);
    const critical = districts.filter((district) => (district.daysToStockout ?? 45) <= 14);
    const topUtilisation = [...districts]
      .sort((a, b) => b.used / b.target - a.used / a.target)
      .slice(0, 3);

    return {
      totalStock,
      totalUsed,
      utilisation: Math.round((totalUsed / Math.max(totalTarget, 1)) * 100),
      critical,
      topUtilisation,
    };
  }, [districts]);

  const buildAnswer = (input = query) => {
    const normalized = input.toLowerCase();
    const criticalNames = reportStats.critical.map((district) => district.name).join(', ') || 'no critical districts';
    const topNames = reportStats.topUtilisation
      .map((district) => `${district.name} ${Math.round((district.used / district.target) * 100)}%`)
      .join(', ');
    let response = `AHMS summary: ${formatNumber(reportStats.totalStock)} semen doses in stock, ${reportStats.utilisation}% utilisation, and ${reportStats.critical.length} critical districts. Current screen: ${currentPage.replaceAll('-', ' ')}.`;

    if (normalized.includes('critical') || normalized.includes('stock') || normalized.includes('semen')) {
      response = `${ahmsAiMockData.answers.critical} Live semen overlay: ${reportStats.critical.length} districts are at or below 14 days to stockout: ${criticalNames}.`;
    } else if (normalized.includes('farmer') || normalized.includes('service') || normalized.includes('history')) {
      response = `${ahmsAiMockData.answers.farmer} Current live data indicates ${formatNumber(reportStats.totalUsed)} completed AI services can feed the master service history report.`;
    } else if (normalized.includes('medicine')) {
      response = ahmsAiMockData.answers.medicine;
    } else if (normalized.includes('disease') || normalized.includes('vaccination') || normalized.includes('alert')) {
      response = ahmsAiMockData.answers.disease;
    } else if (normalized.includes('graph') || normalized.includes('chart') || normalized.includes('performance')) {
      response = `${ahmsAiMockData.answers.graph} Live top utilisation districts are ${topNames}.`;
    } else if (normalized.includes('download') || normalized.includes('excel') || normalized.includes('report')) {
      response = ahmsAiMockData.answers.download;
    }

    return response;
  };

  const answerQuestion = (input = query) => {
    const trimmed = input.trim();
    if (!trimmed || isGenerating) return;

    setSubmittedQuery(trimmed);
    setAnswer('');
    setIsGenerating(true);

    window.setTimeout(() => {
      setAnswer(buildAnswer(trimmed));
      setIsGenerating(false);
    }, 1100);
  };

  const downloadCsv = () => {
    const header = ['District', 'Stock', 'Used', 'Target', 'Utilisation %', 'Days to Stockout', 'Blocks', 'LACs'];
    const rows = districts.map((district) => [
      district.name,
      district.stock,
      district.used,
      district.target,
      Math.round((district.used / district.target) * 100),
      district.daysToStockout ?? 'Long buffer',
      district.blocks,
      district.lacs,
    ]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ahms-ai-chatbot-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareSummary = async () => {
    const text = `AHMS AI summary: ${reportStats.utilisation}% utilisation, ${formatNumber(reportStats.totalStock)} semen stock, ${reportStats.critical.length} critical districts.`;
    if (navigator.share) {
      await navigator.share({ title: 'AHMS AI Chat Bot Summary', text });
      return;
    }
    await navigator.clipboard?.writeText(text);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAnswer('Voice input is available in browsers that support speech recognition. You can type your question here and press Ask.');
      onOpenChange(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onstart = () => {
      onOpenChange(true);
      setIsListening(true);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      setQuery(transcript);
      answerQuestion(transcript);
    };
    recognition.start();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex h-[78dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:h-[74vh] sm:rounded-2xl">
            <div className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-3 text-white sm:px-5 sm:py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 sm:w-11 sm:h-11">
                  <Bot size={23} />
                </div>
                <div className="min-w-0 text-slate-900">
                  <p className="text-sm font-semibold sm:text-base text-slate-900">AHMS AI chat bot</p>
                  <p className="text-xs text-slate-300 truncate text-slate-900">Reports, graphs, Excel, voice, and RAG search</p>
                </div>
              </div>
              <button onClick={() => onOpenChange(false)} className="border border-green-200 bg-green-50 text-slate-900 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center" title="Close chatbot">
                <X size={19} />
              </button>
            </div>

            <div className="min-h-0 flex-1">
              <div className="flex h-full min-h-0 flex-col">
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 lg:p-5">
                  <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-green-50 border border-green-100 p-3">
                    <p className="text-[11px] text-slate-500">Stock</p>
                    <p className="text-sm font-mono text-slate-900">{formatNumber(reportStats.totalStock)}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-3">
                    <p className="text-[11px] text-slate-500">Use</p>
                    <p className="text-sm font-mono text-slate-900">{reportStats.utilisation}%</p>
                  </div>
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3">
                    <p className="text-[11px] text-slate-500">Critical</p>
                    <p className="text-sm font-mono text-red-700">{reportStats.critical.length}</p>
                  </div>
                  </div>

                  {submittedQuery && (
                    <div className="flex justify-end">
                      <div className="max-w-[86%] rounded-2xl rounded-tr-md bg-slate-900 px-4 py-3 border  bg-blue-50 border border-blue-100  ">
                        <p className="text-sm font-semibold text-slate-900">You asked</p>
                        <p className="text-sm leading-6 text-slate-900">{submittedQuery}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-start">
                    <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-green-200 bg-green-50 p-4 text-slate-900">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={17} className="text-green-700" />
                        <p className="text-sm font-semibold text-slate-900">AI output</p>
                      </div>
                      {isGenerating ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-600" />
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500 [animation-delay:120ms]" />
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 [animation-delay:240ms]" />
                            <span>Generating report output...</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2.5 w-full animate-pulse rounded-full bg-green-200" />
                            <div className="h-2.5 w-5/6 animate-pulse rounded-full bg-green-100" />
                            <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-green-100" />
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-slate-900">{answer}</p>
                      )}
                    </div>
                  </div>

                  {submittedQuery && !isGenerating && (
                    <div className="grid grid-cols-2 gap-2">
                      {ahmsAiMockData.moduleSummaries.map((summary) => (
                        <div key={summary.name} className="rounded-xl bg-white border border-slate-200 p-3 shadow-sm">
                          <p className="text-sm font-semibold text-slate-900">{summary.name}</p>
                          <p className="text-sm font-mono text-slate-900">{formatNumber(summary.value)} <span className="text-[10px] text-slate-500">{summary.unit}</span></p>
                          <p className={`mt-1 text-[11px] font-semibold ${summary.status === 'Action' ? 'text-red-700' : summary.status === 'Watch' ? 'text-amber-700' : 'text-green-700'}`}>{summary.status}</p>
                          <p className="mt-1 text-sm  text-slate-200">{summary.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 bg-white p-3">
                  <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                    {ahmsAiMockData.quickPrompts.map((prompt) => (
                      <button key={prompt} onClick={() => { setQuery(prompt); answerQuestion(prompt); }} className="whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100">
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => event.key === 'Enter' && answerQuestion()}
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ask AHMS AI..."
                    />
                    <button onClick={startVoiceInput} className={`h-11 w-11 flex-shrink-0 rounded-xl border flex items-center justify-center ${isListening ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200'}`} title="Voice to text">
                      <Mic size={17} />
                    </button>
                    <button disabled={isGenerating || !query.trim()} onClick={() => answerQuestion()} className="h-11 flex-shrink-0 rounded-xl bg-green-600 px-3 text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-4" title="Ask">
                      <span className="flex items-center gap-2 text-sm font-semibold"><Send size={17} /> <span className="hidden sm:inline">Ask</span></span>
                    </button>
                  </div>
                </div>
              {submittedQuery && !isGenerating && (
                <div className="hidden border-t border-slate-200 bg-slate-50 p-3">
                  <div className="rounded-2xl bg-white border border-slate-200 p-3 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Mock RAG sources</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ahmsAiMockData.ragSources.map((source) => (
                      <div key={source.name} className="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-semibold text-slate-700">{source.name}</p>
                          <p className="text-slate-500">{formatNumber(source.records)} records</p>
                        </div>
                        <span className="rounded-lg bg-green-50 px-2 py-1 font-mono text-green-700">{source.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={downloadCsv} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2.5 text-sm text-white">
                    <Download size={16} /> Excel
                  </button>
                  <button onClick={shareSummary} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => onOpenChange(!isOpen)}
          className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl ring-4 ring-green-100 transition-transform hover:scale-105"
          title="AHMS AI chat bot"
        >
          <Bot size={25} />
        </button>
      </div>
    </>
  );
}

function AppShell() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage(user?.homePath ?? 'dashboard'));
  const [semenDistricts, setSemenDistricts] = useState<DistrictSemen[]>(odishaDistricts);
  const [medicineInventory, setMedicineInventory] = useState<MedicineStockItem[]>(medicineStock);
  const [medicineRequests, setMedicineRequests] = useState<MedicineRequisition[]>(initialMedicineRequisitions);
  const [tourStatus, setTourStatus] = useState('Draft');
  const [visitSynced, setVisitSynced] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

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
      <Header isCollapsed={isCollapsed} onAiClick={() => setAiChatOpen(true)} />
      <main className={`pt-20 pb-8 px-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>
        <div className="max-w-[1600px] mx-auto">{renderPage()}</div>
      </main>
      <AhmsAiChatbot districts={semenDistricts} currentPage={currentPage} isOpen={aiChatOpen} onOpenChange={setAiChatOpen} />
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
