import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  Barcode,
  Bot,
  CheckCircle2,
  Cloud,
  CloudOff,
  FilePlus2,
  History,
  Home,
  MessageSquare,
  PackageCheck,
  Search,
  Send,
  UserPlus,
  Phone,
  ChevronRight,
  Clock,
  Stethoscope,
  MapPin,
  ArrowLeft,
  Shield,
  HeartPulse,
  Filter,
} from 'lucide-react';
import {
  FarmerMedicineProfile,
  farmerMedicineProfiles,
  MedicineRequisition,
  MedicineStockItem,
  medicineStock,
} from '../data/medicineMvuData';
import { formatDisplayDate } from '../utils/dateFormat';

type LacScreen = 'home' | 'log' | 'farmer' | 'barcode' | 'request' | 'inventory' | 'offline';
type FarmerScreen = 'login' | 'request' | 'history' | 'chatbot';

interface LacMedicineAppProps {
  screen?: LacScreen;
  stock?: MedicineStockItem[];
  requisitions?: MedicineRequisition[];
  onStockChange?: (stock: MedicineStockItem[]) => void;
  onRequisitionAdd?: (request: MedicineRequisition) => void;
  onNavigate?: (page: string) => void;
}

interface FarmerMedicineAppProps {
  screen?: FarmerScreen;
  onNavigate?: (page: string) => void;
}

const lacScreens: Array<[LacScreen, string]> = [
  ['home', 'Home'],
  ['log', 'Log Medicine'],
  ['farmer', 'Farmer Profile'],
  ['barcode', 'Barcode Receipt'],
  ['request', 'Raise Request'],
  ['inventory', 'Inventory'],
  ['offline', 'Offline Mode'],
];

const farmerScreens: Array<[FarmerScreen, string]> = [
  ['login', 'Login'],
  ['request', 'Service Request'],
  ['history', 'History'],
  ['chatbot', 'Chatbot'],
];

const medicineRoutes: Record<LacScreen, string> = {
  home: 'lac-medicine-home',
  log: 'lac-medicine-log',
  farmer: 'lac-medicine-farmer',
  barcode: 'lac-medicine-barcode',
  request: 'lac-medicine-request',
  inventory: 'lac-medicine-inventory',
  offline: 'lac-medicine-offline',
};

const farmerRoutes: Record<FarmerScreen, string> = {
  login: 'farmer-medicine-login',
  request: 'farmer-medicine-request',
  history: 'farmer-medicine-history',
  chatbot: 'farmer-medicine-chatbot',
};

const toneForStock = (item: MedicineStockItem) => {
  if (item.stock <= item.threshold * 0.6) return { bg: '#fee2e2', text: '#991b1b', label: 'Critical' };
  if (item.stock <= item.threshold * 1.25) return { bg: '#fef3c7', text: '#92400e', label: 'Watch' };
  return { bg: '#dcfce7', text: '#166534', label: 'Healthy' };
};

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

function PhoneShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-[430px]">
      <div className="rounded-[28px] border-8 border-slate-900 bg-slate-950 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 =text-green-00 px-5 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-200">{subtitle}</p>
            <h2 className="text-lg">{title}</h2>
          </div>
          <div className="w-12 h-1.5 rounded-full bg-slate-700" />
        </div>
        <div className="bg-mesh min-h-[720px] p-4">{children}</div>
      </div>
    </div>
  );
}

function MobileTabs({ active, onNavigate }: { active: LacScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
      {lacScreens.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onNavigate?.(medicineRoutes[key])}
          className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function FarmerTabs({ active, onNavigate }: { active: FarmerScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
      {farmerScreens.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onNavigate?.(farmerRoutes[key])}
          className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function StockTiles({ stock, compact = false, onSelect }: { stock: MedicineStockItem[]; compact?: boolean; onSelect?: (item: MedicineStockItem) => void }) {
  return (
    <div className={compact ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
      {stock.map((item) => {
        const tone = toneForStock(item);
        return (
          <button
            key={item.sku}
            onClick={() => onSelect?.(item)}
            className="text-left rounded-xl p-3 border"
            style={{ background: tone.bg, borderColor: tone.bg, color: tone.text }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{item.sku}</p>
              <span className="text-xs">{tone.label}</span>
            </div>
            <p className="text-2xl font-mono mt-1">{fmt(item.stock)}</p>
            <p className="text-xs opacity-80">{item.category}</p>
          </button>
        );
      })}
    </div>
  );
}

export function LacMedicineMobileApp({
  screen = 'home',
  stock,
  requisitions,
  onStockChange,
  onRequisitionAdd,
  onNavigate,
}: LacMedicineAppProps) {
  const [localStock, setLocalStock] = useState<MedicineStockItem[]>(medicineStock);
  const [selectedMedicine, setSelectedMedicine] = useState('FMD Vaccine');
  const [selectedFarmer, setSelectedFarmer] = useState('Gopal Jena');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState('');
  const [offline, setOffline] = useState(false);
  const [selectedSku, setSelectedSku] = useState<MedicineStockItem | null>(null);
  const activeStock = stock ?? localStock;
  const changeStock = onStockChange ?? setLocalStock;
  const farmer = farmerMedicineProfiles.find((item) => item.name === selectedFarmer) ?? farmerMedicineProfiles[0];
  const criticalItems = activeStock.filter((item) => toneForStock(item).label === 'Critical');

  const deductStock = () => {
    const updated = activeStock.map((item) => item.sku === selectedMedicine ? { ...item, stock: Math.max(0, item.stock - quantity), lastUsed: '2026-05-22' } : item);
    changeStock(updated);
    setToast(`${selectedMedicine} deducted by ${quantity}. ${farmer.name}'s history auto-filled and log is saved.`);
  };

  const receiveBarcode = () => {
    const updated = activeStock.map((item) => item.sku === 'FMD Vaccine' ? { ...item, stock: item.stock + 120, lastReceived: '2026-05-22' } : item);
    changeStock(updated);
    setToast('Barcode MED-FMD-7788 identified. 120 FMD Vaccine doses received and requisition marked Fulfilled.');
  };

  const submitP0 = () => {
    const request: MedicineRequisition = {
      id: `REQ-${Math.floor(200 + Math.random() * 500)}`,
      source: 'Balasore LAC-2',
      medicine: selectedMedicine,
      quantity: 200,
      urgency: 'P0',
      status: 'Pending',
      submittedAt: 'Just now',
    };
    onRequisitionAdd?.(request);
    setToast('P0 request submitted. It appears immediately in BVO/CDVO queue as a red urgent item.');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PhoneShell title="LAC Medicine" subtitle="Balasore LAC-2 / Remuna Block">
        <MobileTabs active={screen} onNavigate={onNavigate} />
        {toast && <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
        {screen === 'home' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <p className="text-sm text-slate-600">Ramesh Das</p>
              <h3 className="text-slate-900">LAC / VD Assignment</h3>
              <p className="text-xs text-slate-500">Balasore LAC-2, Remuna Block</p>
            </div>
            {criticalItems.length > 0 && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800"><AlertTriangle size={16} className="inline mr-1" /> Critical stock: {criticalItems.map((item) => item.sku).join(', ')}</div>}
            <StockTiles stock={activeStock} compact />
            <div className="grid grid-cols-2 gap-3">
              {[['Log Medicine', 'lac-medicine-log', Home], ['Scan Barcode', 'lac-medicine-barcode', Barcode], ['Raise Request', 'lac-medicine-request', FilePlus2], ['Raise Grievance', 'lac-medicine-offline', MessageSquare]].map(([label, route, Icon]) => {
                const C = Icon as typeof Home;
                return <button key={label as string} onClick={() => onNavigate?.(route as string)} className="p-4 rounded-xl bg-white/80 border border-white/40 text-left"><C size={20} className="text-green-700 mb-2" /><p className="text-sm font-semibold text-slate-900">{label as string}</p></button>;
              })}
            </div>
          </div>
        )}
        {screen === 'log' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-slate-900 mb-3">Medicine Administration Log</h3>
              <label className="text-xs text-slate-600">Search farmer (L2 auto-fill)</label>
              <select value={selectedFarmer} onChange={(event) => setSelectedFarmer(event.target.value)} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
                {farmerMedicineProfiles.map((item) => <option key={item.aadhaar}>{item.name}</option>)}
              </select>
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-3">
                <p className="text-sm text-green-900">{farmer.name} - {farmer.animal}</p>
                <p className="text-xs text-green-700">History auto-filled: {farmer.history.length} previous medicine entries</p>
              </div>
              <button className="mb-3 w-full p-3 rounded-xl bg-white/70 border border-white/30 text-sm flex items-center gap-2"><UserPlus size={16} /> Create New Farmer Profile</button>
              <select value={selectedMedicine} onChange={(event) => setSelectedMedicine(event.target.value)} className="w-full mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
                {activeStock.map((item) => <option key={item.sku}>{item.sku}</option>)}
              </select>
              <input type="number" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
              <input type="date" defaultValue="2026-05-22" className="w-full mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3">
                <p className="text-xs text-amber-800">Stray animal entry: select SKU + animal type when farmer is unknown.</p>
              </div>
              <button onClick={deductStock} className="w-full p-3 rounded-xl bg-green-600 text-white">Submit and Deduct Inventory</button>
            </div>
          </div>
        )}
        {screen === 'farmer' && (
          <div className="space-y-4">
            <div className="relative"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input placeholder="Search by name or Aadhaar" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 border border-white/40" /></div>
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-slate-900">{farmer.name}</h3>
              <p className="text-sm text-slate-600">{farmer.aadhaar} / {farmer.mobile}</p>
              <p className="text-sm text-green-700 mt-2">Total medicines received: {farmer.history.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
            <select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>All medicines</option><option>FMD Vaccine</option></select>
            {farmer.history.map((item) => <div key={`${item.medicine}${item.date}`} className="p-3 rounded-xl bg-white/80 border border-white/40"><p className="text-sm font-semibold">{item.medicine}</p><p className="text-xs text-slate-600">{item.quantity} doses, {formatDisplayDate(item.date)}, {item.lac}</p></div>)}
          </div>
        )}
        {screen === 'barcode' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5 text-center">
              <Barcode size={72} className="mx-auto text-green-700 mb-3" />
              <h3 className="text-slate-900">Inflow Barcode Scan</h3>
              <p className="text-sm text-slate-600">MED-FMD-7788 detected: FMD Vaccine</p>
              <input type="number" defaultValue={120} className="w-full my-4 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
              <button onClick={receiveBarcode} className="w-full p-3 rounded-xl bg-green-600 text-white">Mark as Received</button>
            </div>
            {(requisitions ?? []).slice(0, 3).map((req) => <div key={req.id} className="p-3 rounded-xl bg-white/80 border border-white/40 flex justify-between"><span className="text-sm">{req.medicine}</span><span className="text-xs text-green-700">Fulfilled</span></div>)}
          </div>
        )}
        {screen === 'request' && (
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <h3 className="text-slate-900">Requisition Request Form</h3>
            <select value={selectedMedicine} onChange={(event) => setSelectedMedicine(event.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30">{activeStock.map((item) => <option key={item.sku}>{item.sku}</option>)}</select>
            <input type="number" defaultValue={200} className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            <select defaultValue="P0" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select>
            <button onClick={submitP0} className="w-full p-3 rounded-xl bg-red-600 text-white">Submit P0 Request</button>
          </div>
        )}
        {screen === 'inventory' && (
          <div className="space-y-4">
            {criticalItems.length > 0 && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">Critical stock banner: {criticalItems.length} SKU needs action.</div>}
            <StockTiles stock={activeStock} compact onSelect={setSelectedSku} />
            {selectedSku && <div className="p-4 rounded-xl bg-white/80 border border-white/40"><p className="font-semibold">{selectedSku.sku}</p><p className="text-sm text-slate-600">Qty {selectedSku.stock}, received {formatDisplayDate(selectedSku.lastReceived)}, used {formatDisplayDate(selectedSku.lastUsed)}</p></div>}
          </div>
        )}
        {screen === 'offline' && (
          <div className="space-y-4">
            <button onClick={() => setOffline(!offline)} className={`w-full p-3 rounded-xl text-white ${offline ? 'bg-red-600' : 'bg-green-600'}`}>{offline ? 'Go Online / Sync' : 'Turn Offline Mode On'}</button>
            <div className={`p-3 rounded-xl border text-sm ${offline ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>{offline ? <CloudOff size={16} className="inline mr-1" /> : <Cloud size={16} className="inline mr-1" />} {offline ? 'Offline banner: logs saved locally.' : 'Online: queued logs auto-synced with confirmation toast.'}</div>
            <div className="p-4 rounded-xl bg-white/80 border border-white/40"><p className="font-semibold">Queued medicine log</p><p className="text-sm text-slate-600">FMD Vaccine for Gopal Jena saved locally and ready to sync.</p></div>
          </div>
        )}
      </PhoneShell>
    </motion.div>
  );
}

const ANIMAL_OPTIONS = [
  { label: 'Cow', emoji: '🐄' },
  { label: 'Buffalo', emoji: '🐃' },
  { label: 'Goat', emoji: '🐐' },
  { label: 'Sheep', emoji: '🐑' },
  { label: 'Pig', emoji: '🐖' },
  { label: 'Poultry', emoji: '🐔' },
];

const SYMPTOM_OPTIONS = [
  'FMD symptoms', 'Fever / shivering', 'Not eating', 'Wound / injury',
  'Diarrhea', 'Eye discharge', 'Skin disease', 'Pregnancy issue',
  'Limping', 'Reduced milk',
];

const SERVICE_HISTORY = [
  { id: 'SR-2198', animal: 'Cow', issue: 'Calcium deficiency', date: '2026-04-24', status: 'Completed', lac: 'Balasore LAC-2', doctor: 'Dr. Ramesh Das' },
  { id: 'SR-2201', animal: 'Cow', issue: 'FMD symptoms', date: '2026-05-08', status: 'Completed', lac: 'Balasore LAC-2', doctor: 'Dr. Ramesh Das' },
  { id: 'SR-2310', animal: 'Goat', issue: 'Fever / shivering', date: '2026-05-18', status: 'Pending', lac: 'Remuna Block', doctor: 'Assigned soon' },
];

export function FarmerMedicineApp({ screen = 'login', onNavigate }: FarmerMedicineAppProps) {
  const profile = farmerMedicineProfiles[0];

  // Login flow
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loginStep, setLoginStep] = useState('phone' as 'phone' | 'otp' | 'done');
  const isLoggedIn = loginStep === 'done';

  // Request wizard
  const [reqStep, setReqStep] = useState(1);
  const [animal, setAnimal] = useState('');
  const [symptoms, setSymptoms] = useState([] as string[]);
  const [urgency, setUrgency] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [srId] = useState(`SR-${2300 + Math.floor(Math.random() * 200)}`);

  // History filter
  const [histFilter, setHistFilter] = useState('all' as 'all' | 'pending' | 'completed');

  // Chatbot
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(
    [{ from: 'bot', text: "Namaskar! I'm your AI animal health assistant. Ask me anything about your animal's health or medicine." }] as Array<{ from: string; text: string }>
  );

  const filtered = histFilter === 'all'
    ? SERVICE_HISTORY
    : SERVICE_HISTORY.filter(r => r.status.toLowerCase() === histFilter);

  const toggleSymptom = (s: string) =>
    setSymptoms((prev: string[]) => prev.includes(s) ? prev.filter((x: string) => x !== s) : [...prev, s]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setMessages((prev: Array<{ from: string; text: string }>) => [
      ...prev,
      { from: 'user', text: q },
      { from: 'bot', text: 'Our vet team will review your query shortly. Meanwhile, isolate the animal and avoid self-medication. Balasore LAC-2 is 4.2 km away — call 94370-12098 for urgent help.' },
    ]);
    setChatInput('');
  };

  const resetRequest = () => {
    setSubmitted(false); setReqStep(1); setAnimal(''); setSymptoms([]); setUrgency(''); setNotes('');
  };

  const bottomNav = [
    { key: 'request' as FarmerScreen, label: 'Request', icon: FilePlus2, route: farmerRoutes.request },
    { key: 'history' as FarmerScreen, label: 'History', icon: History, route: farmerRoutes.history },
    { key: 'chatbot' as FarmerScreen, label: 'AI Help', icon: Bot, route: farmerRoutes.chatbot },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Phone frame — fixed height, flex column so header/content/nav stack cleanly */}
      <div className="mx-auto max-w-[390px]">
        <div className="rounded-[36px] px-6 border-[6px] border-slate-900 shadow-2xl overflow-hidden flex flex-col bg-white" style={{ height: 780 }}>

          {/* ── Status bar notch ── */}
          <div className=" hidden bg-slate-900 flex justify-between items-center px-6 pt-2 pb-1 shrink-0">
            <span className="text-[10px] text-slate-400 font-medium">9:41</span>
            <div className="w-24 h-4 bg-slate-800 rounded-full" />
            <span className="text-[10px] text-slate-400 font-medium">●●●</span>
          </div>

          {/* ── App Header ── */}
          <div className={`px-5 pt-3 pb-4 shrink-0 ${isLoggedIn ? 'bg-gradient-to-r from-green-700 to-emerald-600' : 'bg-gradient-to-br from-green-800 via-green-700 to-emerald-600'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="hidden w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(255,255,255,0.18)' }}>🐄</div>
                <div>
                  <p className="text-[9px] text-green-200 font-semibold uppercase tracking-widest">Odisha AHMS</p>
                  <h2 className="text-white text-sm font-bold leading-tight">Farmer Medicine Portal</h2>
                </div>
              </div>
              {isLoggedIn && (
                <div className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center text-white font-bold text-xs" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  {profile.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              )}
            </div>
            {isLoggedIn && (
              <div className="mt-2.5 rounded-2xl px-6 py-2 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.14)' }}>
                <div>
                  <p className="text-white font-semibold text-xs">{profile.name}</p>
                  <p className="text-green-200 text-[10px] mt-0.5">{profile.mobile} · {profile.aadhaar}</p>
                </div>
                <div className="rounded-lg px-2 py-1" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <p className="text-white text-[10px] font-bold">2 Animals</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Scrollable Screen Content ── */}
          <div className="flex-1 overflow-y-auto bg-slate-50 overscroll-contain">
            <AnimatePresence mode="wait">

              {/* LOGIN */}
              {screen === 'login' && (
                <motion.div key="login" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-3 space-y-3">
                  {loginStep === 'done' ? (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3.5 text-center">
                        <CheckCircle2 size={32} className="mx-auto text-green-600 mb-1.5" />
                        <p className="text-green-900 font-bold text-sm">Login Successful!</p>
                        <p className="text-green-700 text-[11px] mt-0.5">Welcome back, {profile.name}</p>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm space-y-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg shrink-0">🧑‍🌾</div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate">{profile.name}</p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{profile.aadhaar} · {profile.mobile}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-50 rounded-xl px-3 py-2">
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Animal</p>
                            <p className="font-semibold text-slate-800 text-[11px] mt-0.5">{profile.animal}</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl px-3 py-2">
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">LAC Zone</p>
                            <p className="font-semibold text-slate-800 text-[11px] mt-0.5">Balasore LAC-2</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {bottomNav.map(({ key, label, icon: Icon, route }) => (
                          <button key={key} onClick={() => onNavigate?.(route)} className="bg-white border border-slate-200 rounded-2xl py-3 flex flex-col items-center gap-1.5 shadow-sm hover:border-green-400 hover:bg-green-50 active:scale-95 transition-all">
                            <Icon size={18} className="text-green-600" />
                            <span className="text-[10px] font-bold text-slate-600 tracking-wide">{label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : loginStep === 'otp' ? (
                    <>
                      <button onClick={() => setLoginStep('phone')} className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 transition-colors">
                        <ArrowLeft size={13} /> Back
                      </button>
                      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4 shadow-sm space-y-3">
                        <div className="text-center">
                          <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Phone size={20} className="text-green-600" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">Enter OTP</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">Sent to +91 {phone}</p>
                        </div>
                        <div className="flex gap-1.5 justify-center">
                          {otp.map((digit, i) => (
                            <input key={i} type="text" maxLength={1} value={digit}
                              onChange={e => { const v = e.target.value.replace(/\D/, ''); const next = [...otp]; next[i] = v; setOtp(next); }}
                              className="w-9 h-10 rounded-xl border-2 border-slate-200 text-center text-sm font-bold text-slate-900 focus:border-green-500 focus:outline-none bg-slate-50 transition-colors"
                            />
                          ))}
                        </div>
                        <button onClick={() => setLoginStep('done')} className="w-full py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs tracking-wide hover:bg-green-700 active:scale-[0.98] transition-all">
                          Verify & Login
                        </button>
                        <p className="text-center text-[10px] text-slate-400">Didn't receive? <button className="text-green-600 font-semibold">Resend OTP</button></p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center pt-2 pb-1">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2.5 text-2xl">🐄</div>
                        <p className="text-sm font-bold text-slate-900">Farmer Login</p>
                        <p className="text-[11px] text-slate-400 mt-1">Access medicine services for your animals</p>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3.5 shadow-sm space-y-3">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                          <div className="flex gap-1.5 mt-1.5">
                            <div className="flex items-center gap-1 px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-600 font-bold shrink-0">🇮🇳 +91</div>
                            <input type="tel" maxLength={10} value={phone} onChange={e => setPhone(e.target.value.replace(/\D/, ''))}
                              placeholder="10-digit mobile number"
                              className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:border-green-500 focus:outline-none bg-slate-50 text-xs transition-colors placeholder:text-slate-300"
                            />
                          </div>
                        </div>
                        <button onClick={() => phone.length === 10 && setLoginStep('otp')} disabled={phone.length !== 10}
                          className="w-full py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 active:scale-[0.98] transition-all">
                          Send OTP
                        </button>
                      </div>
                      <p className="text-center text-[10px] text-slate-400">Same login works across all AHMS farmer modules</p>
                    </>
                  )}
                </motion.div>
              )}

              {/* SERVICE REQUEST */}
              {screen === 'request' && (
                <motion.div key="request" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-3">
                  {submitted ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-4 text-center">
                        <CheckCircle2 size={36} className="mx-auto text-green-600 mb-2" />
                        <p className="font-bold text-green-900 text-sm">Request Submitted!</p>
                        <p className="text-green-700 text-[11px] mt-0.5">Your service request has been raised</p>
                        <div className="mt-2.5 bg-white rounded-xl border border-green-200 px-4 py-1.5 inline-block">
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider">Request ID</p>
                          <p className="font-mono font-bold text-green-800 text-base mt-0.5">{srId}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm space-y-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Summary</p>
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg shrink-0">{ANIMAL_OPTIONS.find(a => a.label === animal)?.emoji ?? '🐄'}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-900 text-xs">{animal}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${urgency === 'Emergency' ? 'bg-red-100 text-red-700' : urgency === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{urgency}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{symptoms.join(' · ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                          <Clock size={11} className="shrink-0" /> A LAC officer will contact you within 24 hours
                        </div>
                      </div>
                      <button onClick={resetRequest} className="w-full py-2.5 rounded-xl border-2 border-green-600 text-green-700 font-bold text-xs tracking-wide hover:bg-green-50 active:scale-[0.98] transition-all">
                        Raise Another Request
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Step indicator */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map(s => (
                          <div key={s} className="flex items-center gap-1 flex-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shrink-0 ${reqStep > s ? 'bg-green-600 border-green-600 text-white' : reqStep === s ? 'border-green-600 text-green-700 bg-white' : 'border-slate-200 text-slate-400 bg-white'}`}>
                              {reqStep > s ? <CheckCircle2 size={10} /> : s}
                            </div>
                            {s < 3 && <div className={`flex-1 h-px rounded-full ${reqStep > s ? 'bg-green-500' : 'bg-slate-200'}`} />}
                          </div>
                        ))}
                        <span className="text-[9px] text-slate-400 ml-1.5 shrink-0 font-medium">Step {reqStep} / 3</span>
                      </div>

                      {reqStep === 1 && (
                        <div className="space-y-3">
                          <div>
                            <p className="font-bold text-slate-900 text-xs">Which animal needs help?</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Select the animal type to continue</p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {ANIMAL_OPTIONS.map(({ label, emoji }) => (
                              <button key={label} onClick={() => setAnimal(label)}
                                className={`rounded-xl py-2.5 flex flex-col items-center gap-1 border-2 transition-all active:scale-95 ${animal === label ? 'border-green-500 bg-green-50 shadow-sm' : 'border-slate-200 bg-white hover:border-green-300'}`}>
                                <span className="text-xl leading-none">{emoji}</span>
                                <span className="text-[10px] font-semibold text-slate-700 mt-0.5">{label}</span>
                              </button>
                            ))}
                          </div>
                          <button onClick={() => animal && setReqStep(2)} disabled={!animal}
                            className="w-full py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5">
                            Continue <ChevronRight size={13} />
                          </button>
                        </div>
                      )}

                      {reqStep === 2 && (
                        <div className="space-y-3">
                          <div>
                            <button onClick={() => setReqStep(1)} className="flex items-center gap-1 text-[10px] text-slate-400 mb-1.5 hover:text-slate-600 transition-colors"><ArrowLeft size={11} /> Back</button>
                            <p className="font-bold text-slate-900 text-xs">What symptoms do you see?</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Select all that apply</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {SYMPTOM_OPTIONS.map(s => (
                              <button key={s} onClick={() => toggleSymptom(s)}
                                className={`px-4 py-1 rounded-full text-[10px] font-semibold border transition-all active:scale-95 ${symptoms.includes(s) ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-green-400 hover:text-green-700'}`}>
                                {s}
                              </button>
                            ))}
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">How urgent is this?</p>
                            <div className="space-y-1.5">
                              {[
                                { label: 'Emergency', desc: 'Severe distress · within 24h', icon: HeartPulse, active: 'ring-1 ring-red-300 border-red-400 bg-red-50', base: 'border-slate-200 bg-white hover:border-red-200' },
                                { label: 'Urgent', desc: 'Worsening condition · 2–3 days', icon: Stethoscope, active: 'ring-1 ring-amber-300 border-amber-400 bg-amber-50', base: 'border-slate-200 bg-white hover:border-amber-200' },
                                { label: 'Routine', desc: 'Checkup or vaccination · within a week', icon: Shield, active: 'ring-1 ring-green-300 border-green-500 bg-green-50', base: 'border-slate-200 bg-white hover:border-green-200' },
                              ].map(({ label, desc, icon: Icon, active, base }) => (
                                <button key={label} onClick={() => setUrgency(label)}
                                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all text-left active:scale-[0.98] ${urgency === label ? active : base}`}>
                                  <Icon size={14} className={urgency === label ? 'text-slate-600 shrink-0' : 'text-slate-300 shrink-0'} />
                                  <div className="min-w-0">
                                    <p className="text-[11px] font-bold text-slate-800 leading-tight">{label}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{desc}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                          <button onClick={() => symptoms.length > 0 && urgency && setReqStep(3)} disabled={symptoms.length === 0 || !urgency}
                            className="w-full py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5">
                            Continue <ChevronRight size={13} />
                          </button>
                        </div>
                      )}

                      {reqStep === 3 && (
                        <div className="space-y-3">
                          <div>
                            <button onClick={() => setReqStep(2)} className="flex items-center gap-1 text-[10px] text-slate-400 mb-1.5 hover:text-slate-600 transition-colors"><ArrowLeft size={11} /> Back</button>
                            <p className="font-bold text-slate-900 text-xs">Additional details</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Help the vet prepare before the visit</p>
                          </div>
                          <div className="bg-white rounded-2xl border border-slate-200 px-6 py-3 shadow-sm space-y-2.5">
                            <div>
                              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Village / Location</label>
                              <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50">
                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                <input placeholder="e.g. Remuna village, Balasore" className="flex-1 min-w-0 bg-transparent text-[11px] text-slate-900 focus:outline-none placeholder:text-slate-300" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Additional Notes</label>
                              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                                placeholder="Describe the symptoms in more detail..."
                                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-[11px] text-slate-900 resize-none focus:outline-none focus:border-green-400 transition-colors placeholder:text-slate-300" />
                            </div>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 space-y-1.5">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Confirm Summary</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm leading-none">{ANIMAL_OPTIONS.find(a => a.label === animal)?.emoji}</span>
                              <span className="font-bold text-slate-800 text-[11px]">{animal}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${urgency === 'Emergency' ? 'bg-red-100 text-red-700' : urgency === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{urgency}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{symptoms.join(' · ')}</p>
                          </div>
                          <button onClick={() => setSubmitted(true)}
                            className="w-full py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs tracking-wide hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5">
                            <CheckCircle2 size={13} /> Submit Service Request
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* HISTORY */}
              {screen === 'history' && (
                <motion.div key="history" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-xs">Service History</p>
                    <Filter size={13} className="text-slate-400" />
                  </div>
                  <div className="flex gap-1.5">
                    {(['all', 'pending', 'completed'] as const).map(f => (
                      <button key={f} onClick={() => setHistFilter(f)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize transition-all active:scale-95 ${histFilter === f ? 'bg-green-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:border-green-300 hover:text-green-700'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {filtered.map(r => (
                      <div key={r.id} className="bg-white rounded-2xl border border-slate-200 px-6 py-3 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 ${r.status === 'Completed' ? 'bg-green-100' : 'bg-amber-100'}`}>
                              {ANIMAL_OPTIONS.find(a => a.label === r.animal)?.emoji ?? '🐄'}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 text-[11px] truncate">{r.animal} · {r.issue}</p>
                              <p className="text-[9px] text-slate-400 mt-0.5 font-mono tracking-tight">{r.id} · {formatDisplayDate(r.date)}</p>
                            </div>
                          </div>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 whitespace-nowrap ${r.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {r.status}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-[9px] text-slate-400 border-t border-slate-100 pt-2">
                          <span className="flex items-center gap-1 min-w-0 truncate"><MapPin size={8} className="shrink-0" />{r.lac}</span>
                          <span className="flex items-center gap-1 min-w-0 truncate"><Stethoscope size={8} className="shrink-0" />{r.doctor}</span>
                        </div>
                      </div>
                    ))}
                    {filtered.length === 0 && (
                      <div className="text-center py-10 text-slate-300">
                        <History size={28} className="mx-auto mb-1.5" />
                        <p className="text-[11px] font-medium">No {histFilter} requests</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* CHATBOT */}
              {screen === 'chatbot' && (
                <motion.div key="chatbot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 shrink-0">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Bot size={13} className="text-green-700" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">AHMS AI Assistant</p>
                      <p className="text-[9px] text-green-500 font-semibold">● Online · responds instantly</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6 py-3 space-y-2 bg-slate-50">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex items-end gap-1.5 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.from === 'bot' && (
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mb-0.5">
                            <Bot size={10} className="text-green-700" />
                          </div>
                        )}
                        <div className={`max-w-[76%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${msg.from === 'user' ? 'bg-green-600 text-white rounded-br-sm' : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm shadow-sm'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {['FMD symptoms?', 'Vaccination schedule', 'Nearest LAC vet'].map(q => (
                        <button key={q} onClick={() => setChatInput(q)}
                          className="px-4 py-1 rounded-full text-[9px] font-semibold bg-white border border-slate-200 text-slate-500 hover:border-green-400 hover:text-green-700 transition-colors shadow-sm">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex gap-2 shrink-0">
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendChat()}
                      placeholder="Ask about your animal's health..."
                      className="flex-1 min-w-0 px-3 py-2 rounded-full border border-slate-200 text-[11px] focus:outline-none focus:border-green-400 bg-slate-50 transition-colors placeholder:text-slate-300"
                    />
                    <button onClick={sendChat} className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 active:scale-95 transition-all shrink-0">
                      <Send size={13} className="text-white" />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Bottom Navigation ── */}
          {isLoggedIn && screen !== 'login' && (
            <div className="bg-white border-t border-slate-100 flex shrink-0">
              {bottomNav.map(({ key, label, icon: Icon, route }) => (
                <button key={key} onClick={() => onNavigate?.(route)}
                  className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-colors active:bg-slate-50 ${screen === key ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Icon size={18} />
                  <span className="text-[9px] font-bold">{label}</span>
                  {screen === key && <div className="w-3.5 h-0.5 rounded-full bg-green-500 mt-0.5" />}
                </button>
              ))}
            </div>
          )}

          {/* ── Home indicator ── */}
          <div className="bg-white flex justify-center pb-2 pt-1 shrink-0">
            <div className="w-24 h-1 rounded-full bg-slate-300" />
          </div>

        </div>
      </div>
    </motion.div>
  );
}


