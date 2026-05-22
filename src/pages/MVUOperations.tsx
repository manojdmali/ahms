import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Cloud,
  CloudOff,
  Download,
  MapPin,
  Navigation,
  Route,
  Send,
  Truck,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MedicineStockItem, medicineStock, MVUUnit, mvuUnits } from '../data/medicineMvuData';

type DirectorateMVUScreen = 'command' | 'compliance' | 'fleet' | 'manpower' | 'targets';
type BvoMvuScreen = 'plan' | 'inventory' | 'assignment';
type MvuMobileScreen = 'home' | 'visit' | 'daily' | 'stock';

interface DirectorateMVUProps {
  screen?: DirectorateMVUScreen;
  units?: MVUUnit[];
  onNavigate?: (page: string) => void;
}

interface CDVOMVUProps {
  units?: MVUUnit[];
}

interface BVOMVUProps {
  screen?: BvoMvuScreen;
  tourStatus?: string;
  onTourStatusChange?: (status: string) => void;
  onNavigate?: (page: string) => void;
}

interface MVUMobileProps {
  screen?: MvuMobileScreen;
  visitSynced?: boolean;
  onVisitSynced?: (synced: boolean) => void;
  stock?: MedicineStockItem[];
  onStockChange?: (stock: MedicineStockItem[]) => void;
  onNavigate?: (page: string) => void;
}

const directorateScreens: Array<[DirectorateMVUScreen, string, string, string]> = [
  ['command', 'S5-D-01', 'Command Dashboard', 'mvu-command'],
  ['compliance', 'S5-D-02', 'Compliance Report', 'mvu-compliance'],
  ['fleet', 'S5-D-03', 'Fleet Edge', 'mvu-fleet'],
  ['manpower', 'S5-D-04', 'Manpower', 'mvu-manpower'],
  ['targets', 'S5-D-05', 'Targets', 'mvu-targets'],
];

const bvoScreens: Array<[BvoMvuScreen, string, string, string]> = [
  ['plan', 'S5-B-01', 'Tour Plan', 'bvo-mvu-plan'],
  ['inventory', 'S5-B-02', 'Medicine Inventory', 'bvo-mvu-inventory'],
  ['assignment', 'S5-B-03', 'Assignments', 'bvo-mvu-assignment'],
];

const mobileScreens: Array<[MvuMobileScreen, string, string, string]> = [
  ['home', 'S5-M-01', 'Home', 'mvu-team-home'],
  ['visit', 'S5-M-02', 'Visit Log', 'mvu-team-visit'],
  ['daily', 'S5-M-03', 'Daily Form', 'mvu-team-daily'],
  ['stock', 'S5-M-04', 'Stock Update', 'mvu-team-stock'],
];

const statusStyle = (status: MVUUnit['status']) => {
  if (status === 'On tour') return { bg: '#dcfce7', text: '#166534' };
  if (status === 'Delayed') return { bg: '#fef3c7', text: '#92400e' };
  return { bg: '#fee2e2', text: '#991b1b' };
};

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

function TopTabs({ active, onNavigate }: { active: DirectorateMVUScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {directorateScreens.map(([key, id, label, route]) => (
        <button key={key} onClick={() => onNavigate?.(route)} className={`px-3 py-2 rounded-xl text-sm ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>{id} {label}</button>
      ))}
    </div>
  );
}

function DownloadButtons() {
  return <div className="flex gap-2">{['PDF', 'CSV', 'Excel'].map((item) => <button key={item} className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm flex items-center gap-2"><Download size={15} />{item}</button>)}</div>;
}

function OdishaMapMock({ units, onSelect }: { units: MVUUnit[]; onSelect?: (unit: MVUUnit) => void }) {
  return (
    <div className="relative h-[430px] rounded-2xl bg-gradient-to-br from-green-100 via-blue-50 to-amber-100 border border-white/50 overflow-hidden">
      <div className="absolute inset-8 rounded-[45%] border-2 border-green-300 bg-white/25" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 430" aria-hidden="true">
        <path d="M80 330 C130 260 100 190 180 120 C250 50 340 90 385 150 C440 225 410 315 340 360 C250 420 145 400 80 330Z" fill="rgba(255,255,255,0.32)" stroke="#86efac" strokeWidth="3" />
        <path d="M130 322 C205 280 250 260 305 220 C345 190 370 170 410 142" stroke="#16a34a" strokeWidth="5" strokeDasharray="10 8" fill="none" />
        <path d="M150 348 C230 320 290 270 370 220" stroke="#2563eb" strokeWidth="3" strokeDasharray="6 7" fill="none" />
      </svg>
      {units.map((unit, index) => {
        const style = statusStyle(unit.status);
        const points = [[68, 70], [48, 38], [58, 54], [72, 42], [36, 68]];
        const [left, top] = points[index % points.length];
        return (
          <button
            key={unit.id}
            onClick={() => onSelect?.(unit)}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-xl shadow-lg text-xs font-semibold"
            style={{ left: `${left}%`, top: `${top}%`, background: style.bg, color: style.text }}
          >
            <MapPin size={14} className="inline mr-1" />{unit.id}
          </button>
        );
      })}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/80 border border-white/50">
        <p className="text-sm font-semibold text-slate-900">AI route optimization: MVU-12 can cover 11 villages instead of 8 in the same time.</p>
        <p className="text-xs text-slate-600">Suggested route shown in blue; current route shown in green.</p>
      </div>
    </div>
  );
}

export function DirectorateMVUOperations({ screen = 'command', units = mvuUnits, onNavigate }: DirectorateMVUProps) {
  const [selected, setSelected] = useState<MVUUnit>(units[0]);
  const activeToday = units.filter((item) => item.status === 'On tour' || item.status === 'Delayed').length;
  const villagesCovered = units.reduce((sum, item) => sum + item.villagesVisited, 0);
  const understaffed = units.filter((item) => item.staffPresent < item.staffSanctioned || item.status === 'Understaffed');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">Module 5 - Directorate MVU Operations</p>
        <h2 className="text-2xl text-slate-900 mb-4">State MVU Command & Analytics</h2>
        <TopTabs active={screen} onNavigate={onNavigate} />
      </div>
      {screen === 'command' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4"><Truck className="text-green-700 mb-2" /><p className="text-sm text-slate-600">MVUs active today</p><p className="text-3xl font-mono">{activeToday}/150+</p></div>
            <div className="glass-card rounded-xl p-4"><MapPin className="text-blue-700 mb-2" /><p className="text-sm text-slate-600">Villages covered this month</p><p className="text-3xl font-mono">{fmt(villagesCovered)}</p></div>
            <div className="glass-card rounded-xl p-4"><Users className="text-red-700 mb-2" /><p className="text-sm text-slate-600">Understaffed MVUs</p><p className="text-3xl font-mono">{understaffed.length}</p></div>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900"><AlertTriangle size={18} className="inline mr-2" />AI alert: MVU-07 Ganjam understaffed for 3 consecutive weeks - recommend redeployment.</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><OdishaMapMock units={units} onSelect={setSelected} /></div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-slate-900 mb-3">{selected.id} Detail Panel</h3>
              <p className="text-sm text-slate-600">{selected.district} / {selected.status}</p>
              <div className="mt-4 space-y-3">
                <p className="text-sm">Tour compliance: {Math.round((selected.villagesVisited / selected.villagesPlanned) * 100)}%</p>
                <p className="text-sm">Treatments: {selected.treatments}</p>
                <p className="text-sm">Vaccinations: {selected.vaccinations}</p>
                <p className="text-sm">Staffing: {selected.staffPresent}/{selected.staffSanctioned}</p>
              </div>
            </div>
          </div>
        </>
      )}
      {screen === 'compliance' && <ComplianceReport units={units} />}
      {screen === 'fleet' && <FleetPanel unit={selected} />}
      {screen === 'manpower' && <ManpowerSummary units={units} />}
      {screen === 'targets' && <ServiceTargets units={units} />}
    </motion.div>
  );
}

function ComplianceReport({ units }: { units: MVUUnit[] }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div><p className="text-xs text-green-700 font-semibold">S5-D-02</p><h3 className="text-slate-900">Tour Plan Compliance Report</h3><p className="text-sm text-slate-600">Quarterly planned vs visited villages and service targets.</p></div>
        <DownloadButtons />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead><tr className="text-left text-sm text-slate-600 border-b"><th className="py-3">MVU</th><th>Planned</th><th>Visited</th><th>Compliance</th><th>Missed villages</th><th>Treatments</th><th>Vaccinations</th><th>AI</th><th>Camps</th></tr></thead>
          <tbody>{units.map((unit) => <tr key={unit.id} className="border-b border-white/40"><td className="py-3">{unit.id}</td><td>{unit.villagesPlanned}</td><td>{unit.villagesVisited}</td><td>{Math.round((unit.villagesVisited / unit.villagesPlanned) * 100)}%</td><td className="text-red-700">{unit.villagesPlanned - unit.villagesVisited}</td><td>{unit.treatments}</td><td>{unit.vaccinations}</td><td>{unit.ai}</td><td>{unit.camps}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">Plan deviation detected: MVU-05 visited an unplanned village and skipped a planned one - BVO notified.</div>
    </div>
  );
}

function FleetPanel({ unit }: { unit: MVUUnit }) {
  const routeData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({ day, distance: 42 + index * 9, idle: index === 3 ? 7.5 : 1.5 + index * 0.4 }));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs text-green-700 font-semibold">S5-D-03 DEMO CRITICAL</p><h3 className="text-slate-900 mb-2">Tata Fleet Edge Panel</h3><p className="text-sm text-slate-600 mb-4">{unit.id} past week route history. Idle period flagged on Thursday.</p>
        <OdishaMapMock units={[unit]} />
      </div>
      <div className="glass-card rounded-2xl p-6">
        <ResponsiveContainer width="100%" height={260}><LineChart data={routeData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Line dataKey="distance" stroke="#16a34a" strokeWidth={3} /><Line dataKey="idle" stroke="#dc2626" strokeWidth={3} /></LineChart></ResponsiveContainer>
        <div className="grid grid-cols-3 gap-3 mt-4"><div className="p-3 rounded-xl bg-white/70">Distance<br /><b>{unit.distanceKm} km</b></div><div className="p-3 rounded-xl bg-red-50 text-red-800">Idle<br /><b>{unit.idleHours}h</b></div><div className="p-3 rounded-xl bg-white/70">Driver score<br /><b>{unit.driverScore}</b></div></div>
      </div>
    </div>
  );
}

function ManpowerSummary({ units }: { units: MVUUnit[] }) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">AI prediction: Livestock disease incidence historically peaks in Koraput and Malkangiri in June-July. Recommend pre-positioning 3 additional MVUs by May 25.</div>
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs text-green-700 font-semibold">S5-D-04</p><h3 className="text-slate-900 mb-4">Manpower Summary</h3>
        <div className="grid gap-3">{units.map((unit) => <div key={unit.id} className={`p-4 rounded-xl border ${unit.staffPresent < unit.staffSanctioned ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}><div className="flex justify-between"><span>{unit.id} {unit.district}</span><span>{unit.staffPresent}/{unit.staffSanctioned} present</span></div></div>)}</div>
      </div>
    </div>
  );
}

function ServiceTargets({ units }: { units: MVUUnit[] }) {
  const data = units.map((unit) => ({ id: unit.id, actual: unit.treatments + unit.vaccinations + unit.ai, target: 700 }));
  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="text-xs text-green-700 font-semibold">S5-D-05</p><h3 className="text-slate-900 mb-4">Service Targets & Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"><input defaultValue="CDVO target: 700" className="px-3 py-2 rounded-xl bg-white/70" /><input defaultValue="BVO target: 120" className="px-3 py-2 rounded-xl bg-white/70" /><button className="rounded-xl bg-green-600 text-white">Set Target</button></div>
      <ResponsiveContainer width="100%" height={320}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="id" /><YAxis /><Tooltip /><Bar dataKey="target" fill="#bfdbfe" /><Bar dataKey="actual" fill="#16a34a" /></BarChart></ResponsiveContainer>
    </div>
  );
}

export function CDVOMVUOperations({ units = mvuUnits }: CDVOMVUProps) {
  const [comment, setComment] = useState('Approved for Q1 route coverage.');
  const [approved, setApproved] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6"><p className="text-sm text-green-700">CDVO Web Portal</p><h2 className="text-2xl text-slate-900">District MVU Dashboard</h2></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 lg:col-span-2"><h3>S5-C-01 District MVUs</h3><div className="grid gap-3 mt-4">{units.slice(0, 4).map((unit) => <div key={unit.id} className="p-3 rounded-xl bg-white/70 border border-white/40 flex justify-between"><span>{unit.id} {unit.status}</span><span>{Math.round((unit.villagesVisited / unit.villagesPlanned) * 100)}%</span></div>)}</div></div>
        <div className="glass-card rounded-2xl p-6"><h3>Pending Tour Plans</h3><p className="text-3xl font-mono my-3">1</p><p className="text-sm text-slate-600">BVO submitted 3-month plan.</p></div>
      </div>
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs text-green-700 font-semibold">S5-C-02 DEMO CRITICAL</p><h3 className="text-slate-900 mb-3">Tour Plan Approval</h3>
        <p className="text-sm text-slate-600 mb-3">Village list per week: Remuna, Basta, Soro, Nilgiri, Jaleswar.</p>
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} className="w-full p-3 rounded-xl bg-white/70 border border-white/30 mb-3" />
        <button onClick={() => setApproved(true)} className="px-5 py-3 rounded-xl bg-green-600 text-white">Approve Plan</button>
        {approved && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800">BVO mobile status updated to Approved.</div>}
      </div>
      <div className="glass-card rounded-2xl p-6"><h3>S5-C-03 District Reports</h3><p className="text-sm text-slate-600 mb-3">Tour compliance, services rendered vs targets, and MVU medicine inventory.</p><DownloadButtons /></div>
    </motion.div>
  );
}

export function BVOMVUOperations({ screen = 'plan', tourStatus = 'Pending', onTourStatusChange, onNavigate }: BVOMVUProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6"><p className="text-sm text-green-700">BVO Portal + Mobile</p><h2 className="text-2xl text-slate-900 mb-4">MVU Planning & Inventory</h2><div className="flex flex-wrap gap-2">{bvoScreens.map(([key, id, label, route]) => <button key={key} onClick={() => onNavigate?.(route)} className={`px-3 py-2 rounded-xl text-sm ${screen === key ? 'bg-green-600 text-white' : 'bg-white/70'}`}>{id} {label}</button>)}</div></div>
      {screen === 'plan' && <div className="glass-card rounded-2xl p-6"><h3>S5-B-01 Tour Plan Submission</h3><p className="text-sm text-slate-600 mb-3">3-month village schedule, add villages per week, submit for CDVO approval.</p><div className="grid gap-2 mb-4">{['Week 1 - Remuna - 2026-05-27 - Treatment/Vaccination', 'Week 2 - Basta - 2026-06-03 - AI/Awareness', 'Week 3 - Nilgiri - 2026-06-10 - Deworming'].map((item) => <div key={item} className="p-3 rounded-xl bg-white/70">{item}</div>)}</div><button onClick={() => onTourStatusChange?.('Pending')} className="px-5 py-3 rounded-xl bg-green-600 text-white">Submit for CDVO Approval</button><span className="ml-3 px-3 py-2 rounded-xl bg-amber-50 text-amber-800">Status: {tourStatus}</span></div>}
      {screen === 'inventory' && <div className="glass-card rounded-2xl p-6"><h3>S5-B-02 MVU Medicine Inventory</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">{medicineStock.map((item) => <div key={item.sku} className={`p-4 rounded-xl ${item.stock < item.threshold ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}><p className="font-semibold">{item.sku}</p><p>{item.stock} units</p><p className="text-xs">Supplied centrally</p></div>)}</div></div>}
      {screen === 'assignment' && <div className="glass-card rounded-2xl p-6"><h3>S5-B-03 Village Assignment View</h3><div className="space-y-3 mt-4">{['Remuna - visited', 'Basta - pending', 'Soro - behind schedule'].map((item) => <div key={item} className="p-3 rounded-xl bg-white/70 flex justify-between"><span>{item}</span><CheckCircle2 size={18} className="text-green-700" /></div>)}</div></div>}
    </motion.div>
  );
}

function PhoneShell({ children, title }: { children: React.ReactNode; title: string }) {
  return <div className="mx-auto max-w-[430px]"><div className="rounded-[28px] border-8 border-slate-900 bg-slate-950 shadow-2xl overflow-hidden"><div className="bg-slate-900 text-white px-5 py-3"><h2 className="text-lg">{title}</h2><p className="text-xs text-green-200">Offline capable MVU team app</p></div><div className="bg-mesh min-h-[720px] p-4">{children}</div></div></div>;
}

export function MVUTeamMobileApp({ screen = 'home', visitSynced, onVisitSynced, stock, onStockChange, onNavigate }: MVUMobileProps) {
  const [offline, setOffline] = useState(true);
  const [localStock, setLocalStock] = useState<MedicineStockItem[]>(medicineStock);
  const activeStock = stock ?? localStock;
  const changeStock = onStockChange ?? setLocalStock;
  const deduct = () => changeStock(activeStock.map((item) => item.sku === 'Dewormer Bolus' ? { ...item, stock: Math.max(0, item.stock - 12), lastUsed: '2026-05-22' } : item));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PhoneShell title="MVU Field">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">{mobileScreens.map(([key, id, label, route]) => <button key={key} onClick={() => onNavigate?.(route)} className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${screen === key ? 'bg-green-600 text-white' : 'bg-white/70'}`}>{id} {label}</button>)}</div>
        {screen === 'home' && <div className="space-y-4"><div className="p-3 rounded-xl bg-white/80"><p className="font-semibold">Today's villages</p><p className="text-sm">Remuna, Basta, Soro</p></div><div className={`p-3 rounded-xl ${offline ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>{offline ? <CloudOff size={16} className="inline mr-1" /> : <Cloud size={16} className="inline mr-1" />}{offline ? 'Offline' : 'Online'}</div><div className="grid grid-cols-2 gap-3">{['Log Village Visit', 'Update Medicine Stock', 'Daily Form', 'Raise Grievance'].map((item, index) => <button key={item} onClick={() => onNavigate?.(mobileScreens[Math.min(index + 1, 3)][3])} className="p-4 rounded-xl bg-white/80 text-left text-sm">{item}</button>)}</div></div>}
        {screen === 'visit' && <div className="space-y-4"><button onClick={() => setOffline(!offline)} className={`w-full p-3 rounded-xl text-white ${offline ? 'bg-red-600' : 'bg-green-600'}`}>{offline ? 'Airplane mode ON' : 'Reconnect and Sync'}</button><input defaultValue="Remuna" className="w-full px-3 py-2 rounded-xl bg-white/80" /><div className="grid grid-cols-2 gap-3"><div className="p-4 rounded-xl bg-white/80 text-center"><Camera className="mx-auto text-green-700" /><p className="text-sm">Arrival photo</p><p className="text-xs">GPS 21.49, 86.93</p></div><div className="p-4 rounded-xl bg-white/80 text-center"><Camera className="mx-auto text-green-700" /><p className="text-sm">Departure photo</p><p className="text-xs">GPS matched</p></div></div><div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-sm">System compares GPS with planned village. Different village would be flagged.</div><button onClick={() => onVisitSynced?.(!offline)} className="w-full p-3 rounded-xl bg-green-600 text-white">Submit queued visit</button>{visitSynced && <div className="p-3 rounded-xl bg-green-50 text-green-800">Synced to CDVO dashboard.</div>}</div>}
        {screen === 'daily' && <div className="space-y-3"><input defaultValue="Remuna" className="w-full px-3 py-2 rounded-xl bg-white/80" /><input defaultValue="2026-05-22" className="w-full px-3 py-2 rounded-xl bg-white/80" /><input defaultValue="Staff present: 3, gaps: 1 pharmacist" className="w-full px-3 py-2 rounded-xl bg-white/80" /><input defaultValue="Farmers benefitted: M 42 / F 31 / Total 73" className="w-full px-3 py-2 rounded-xl bg-white/80" /><textarea defaultValue="Treatments 18, Vaccinations 34, AI 4, samples 3, deworming 22, user charges Rs 480, awareness camp on FMD." className="w-full p-3 rounded-xl bg-white/80" /><button className="w-full p-3 rounded-xl bg-green-600 text-white">Submit Daily Form</button></div>}
        {screen === 'stock' && <div className="space-y-3">{activeStock.slice(0, 4).map((item) => <div key={item.sku} className={`p-3 rounded-xl ${item.stock < item.threshold ? 'bg-red-50 text-red-800' : 'bg-white/80'}`}><p className="font-semibold">{item.sku}</p><p className="text-sm">{item.stock} units</p></div>)}<button onClick={deduct} className="w-full p-3 rounded-xl bg-green-600 text-white">Deduct 12 Dewormer Bolus</button></div>}
      </PhoneShell>
    </motion.div>
  );
}
