import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronDown,
  Clock,
  Package,
  CalendarDays,
  Info,
  Maximize2,
  Minimize2,
  ArrowRight,
  FileText,
  PackageMinus
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip as LeafletTooltip } from 'react-leaflet';
import L from 'leaflet';
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
import { formatDisplayDate } from '../utils/dateFormat';

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

const directorateScreens: Array<[DirectorateMVUScreen, string, string]> = [
  ['command', 'Command Dashboard', 'mvu-command'],
  ['compliance', 'Compliance Report', 'mvu-compliance'],
  ['fleet', 'Fleet Edge', 'mvu-fleet'],
  ['manpower', 'Manpower', 'mvu-manpower'],
  ['targets', 'Targets', 'mvu-targets'],
];

const bvoScreens: Array<[BvoMvuScreen, string, string]> = [
  ['plan', 'Tour Plan', 'bvo-mvu-plan'],
  ['inventory', 'Medicine Inventory', 'bvo-mvu-inventory'],
  ['assignment', 'Assignments', 'bvo-mvu-assignment'],
];

const mobileScreens: Array<[MvuMobileScreen, string, string]> = [
  ['home', 'Home', 'mvu-team-home'],
  ['visit', 'Visit Log', 'mvu-team-visit'],
  ['daily', 'Daily Form', 'mvu-team-daily'],
  ['stock', 'Stock Update', 'mvu-team-stock'],
];

const statusStyle = (status: MVUUnit['status']) => {
  if (status === 'On tour') return { bg: '#dcfce7', text: '#166534' };
  if (status === 'Delayed') return { bg: '#fef3c7', text: '#92400e' };
  return { bg: '#fee2e2', text: '#991b1b' };
};

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

const bvoTourPlanStops = [
  { id: 1, week: 'Week 1', village: 'Remuna', date: '2026-05-27', service: 'Treatment/Vaccination', lat: 21.5222, lng: 86.8833, status: 'visited', distance: '0 km' },
  { id: 2, week: 'Week 2', village: 'Basta', date: '2026-06-03', service: 'AI/Awareness', lat: 21.6667, lng: 87.0500, status: 'current', distance: '24 km' },
  { id: 3, week: 'Week 3', village: 'Nilgiri', date: '2026-06-10', service: 'Deworming', lat: 21.4583, lng: 86.7667, status: 'planned', distance: '45 km' },
  { id: 4, week: 'Week 4', village: 'Jaleswar', date: '2026-06-17', service: 'Health Camp', lat: 21.7917, lng: 87.2167, status: 'planned', distance: '32 km' }
];

const createCustomIcon = (status: string) => {
  const isVisited = status === 'visited';
  const isCurrent = status === 'current';
  
  const bgColorClass = isVisited 
    ? 'bg-gradient-to-br from-green-500 to-green-700' 
    : isCurrent 
      ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
      : 'bg-gradient-to-br from-amber-400 to-amber-600';

  const pulse = isCurrent ? '<div class="absolute inset-0 -m-2 rounded-full bg-blue-500 animate-ping opacity-50"></div>' : '';
  const iconSvg = isVisited 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

  return L.divIcon({
    className: 'bg-transparent border-0',
    html: `
      <div class="relative flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white ${bgColorClass}">
        ${pulse}
        ${iconSvg}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

function BVOTourPlanMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const visitedPositions = bvoTourPlanStops.filter(s => s.status === 'visited' || s.status === 'current').map(s => [s.lat, s.lng] as [number, number]);
  const plannedPositions = bvoTourPlanStops.filter(s => s.status === 'planned' || s.status === 'current').map(s => [s.lat, s.lng] as [number, number]);

  const mapCenter: [number, number] = [21.62, 86.98];

  const wrapperClasses = isFullscreen
    ? "fixed inset-0 z-50 bg-slate-100 flex flex-col"
    : "relative min-h-[450px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm flex flex-col";

  return (
    <div className={wrapperClasses}>
      {/* Header */}
      <div className={`relative flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-3 px-5 pt-4 bg-white/90 backdrop-blur-md z-[400] shadow-sm ${isFullscreen ? 'shrink-0' : ''}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1 flex items-center gap-1.5"><Navigation size={14}/> Live Route Tracking</p>
          <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Balasore District Route
          </h4>
        </div>
        <div className="flex gap-2 sm:gap-3 items-center">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200">
            <Route size={14} className="text-blue-600" /> 101 km
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200">
            <Truck size={14} className="text-green-600" /> 4 Stops
          </span>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className={`relative flex-grow w-full ${isFullscreen ? 'h-full' : 'h-[360px]'} bg-slate-100 z-10`}>
        {isClient && (
          <MapContainer center={mapCenter} zoom={10} scrollWheelZoom={true} className="w-full h-full z-10" style={{ minHeight: isFullscreen ? '100%' : '360px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Planned Path */}
            <Polyline positions={plannedPositions} pathOptions={{ color: '#f59e0b', weight: 4, dashArray: '8, 8' }} />
            
            {/* Visited Path */}
            <Polyline positions={visitedPositions} pathOptions={{ color: '#16a34a', weight: 5 }} />

            {/* Stops */}
            {bvoTourPlanStops.map((stop) => (
              <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={createCustomIcon(stop.status)}>
                <LeafletTooltip direction="top" offset={[0, -10]} opacity={1} permanent={stop.status === 'current'} className="custom-tooltip">
                  <div className="min-w-[180px] p-1">
                    <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <p className="font-bold text-slate-900 text-sm">{stop.village}</p>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        stop.status === 'visited' ? 'bg-green-50 text-green-700 border-green-200' : stop.status === 'current' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {stop.status}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="flex items-center gap-2 text-slate-600"><Clock size={12} className="text-slate-400" /> <span className="font-medium">{stop.week}</span></p>
                      <p className="flex items-center gap-2 text-slate-600"><Package size={12} className="text-slate-400" /> <span className="font-medium">{stop.service}</span></p>
                      <p className="flex items-center gap-2 text-slate-600"><Route size={12} className="text-slate-400" /> Dist: <span className="font-medium">{stop.distance}</span></p>
                    </div>
                  </div>
                </LeafletTooltip>
              </Marker>
            ))}
          </MapContainer>
        )}
        
        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-xl bg-white/95 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-md border border-slate-200/80 backdrop-blur-sm z-[400]">
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" /> Visited</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm relative"><div className="absolute inset-0 bg-blue-500 animate-ping rounded-full opacity-50" /></div> Active</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" /> Planned</span>
        </div>
      </div>
    </div>
  );
}

function TopTabs({ active, onNavigate }: { active: DirectorateMVUScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {directorateScreens.map(([key, label, route]) => (
        <button key={key} onClick={() => onNavigate?.(route)} className={`px-3 py-2 rounded-xl text-sm ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>{label}</button>
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
        <div><h3 className="text-slate-900">Tour Plan Compliance Report</h3><p className="text-sm text-slate-600">Quarterly planned vs visited villages and service targets.</p></div>
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
        <h3 className="text-slate-900 mb-2">Tata Fleet Edge Panel</h3><p className="text-sm text-slate-600 mb-4">{unit.id} past week route history. Idle period flagged on Thursday.</p>
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
        <h3 className="text-slate-900 mb-4">Manpower Summary</h3>
        <div className="grid gap-3">{units.map((unit) => <div key={unit.id} className={`p-4 rounded-xl border ${unit.staffPresent < unit.staffSanctioned ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}><div className="flex justify-between"><span>{unit.id} {unit.district}</span><span>{unit.staffPresent}/{unit.staffSanctioned} present</span></div></div>)}</div>
      </div>
    </div>
  );
}

function ServiceTargets({ units }: { units: MVUUnit[] }) {
  const data = units.map((unit) => ({ id: unit.id, actual: unit.treatments + unit.vaccinations + unit.ai, target: 700 }));
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-slate-900 mb-4">Service Targets & Analytics</h3>
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
        <div className="glass-card rounded-2xl p-6 lg:col-span-2"><h3>District MVUs</h3><div className="grid gap-3 mt-4">{units.slice(0, 4).map((unit) => <div key={unit.id} className="p-3 rounded-xl bg-white/70 border border-white/40 flex justify-between"><span>{unit.id} {unit.status}</span><span>{Math.round((unit.villagesVisited / unit.villagesPlanned) * 100)}%</span></div>)}</div></div>
        <div className="glass-card rounded-2xl p-6"><h3>Pending Tour Plans</h3><p className="text-3xl font-mono my-3">1</p><p className="text-sm text-slate-600">BVO submitted 3-month plan.</p></div>
      </div>
      <div className="glass-card rounded-2xl p-6">
       <h3 className="text-slate-900 mb-3">Tour Plan Approval</h3>
        <p className="text-sm text-slate-600 mb-3">Village list per week: Remuna, Basta, Soro, Nilgiri, Jaleswar.</p>
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} className="w-full p-3 rounded-xl bg-white/70 border border-white/30 mb-3" />
        <button onClick={() => setApproved(true)} className="px-5 py-3 rounded-xl bg-green-600 text-white px-3">Approve Plan</button>
        {approved && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800">BVO mobile status updated to Approved.</div>}
      </div>
      <div className="glass-card rounded-2xl p-6"><h3>District Reports</h3><p className="text-sm text-slate-600 mb-3">Tour compliance, services rendered vs targets, and MVU medicine inventory.</p><DownloadButtons /></div>
    </motion.div>
  );
}

function VillageAssignmentView() {
  const assignments = [
    { id: 'v1', village: 'Remuna', status: 'Visited', date: '2026-05-20', mvu: 'MVU-31', services: 'Treatment/Vaccination', notes: 'Completed successfully without any delays.' },
    { id: 'v2', village: 'Basta', status: 'Pending', date: '2026-05-24', mvu: 'MVU-31', services: 'AI/Awareness', notes: 'Scheduled for next week.' },
    { id: 'v3', village: 'Soro', status: 'Behind Schedule', date: '2026-05-18', mvu: 'MVU-05', services: 'Deworming', notes: 'Delayed due to vehicle breakdown. Need support.' },
    { id: 'v4', village: 'Nilgiri', status: 'Pending', date: '2026-05-26', mvu: 'MVU-12', services: 'Treatment/Vaccination', notes: 'All supplies confirmed.' }
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Visited': return 'text-green-700 bg-green-100 border-green-200';
      case 'Pending': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Behind Schedule': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Visited': return <CheckCircle2 size={16} className="text-green-700" />;
      case 'Pending': return <Clock size={16} className="text-amber-700" />;
      case 'Behind Schedule': return <AlertTriangle size={16} className="text-red-700" />;
      default: return null;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Village Assignment View</h3>
          <p className="text-slate-600">Track and manage MVU village assignments</p>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        {assignments.map((item) => (
          <div key={item.id} className="rounded-xl bg-white/70 border border-slate-200 shadow-sm overflow-hidden transition-all duration-200">
            <button 
              onClick={() => toggleExpand(item.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors text-left focus:outline-none button-press"
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-slate-100`}>
                  <MapPin size={20} className="text-slate-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-lg">{item.village}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-500 font-medium">{item.mvu}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-500">{formatDisplayDate(item.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status}
                </span>
                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-200 ${expandedId === item.id ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Assigned Services</p>
                        <p className="font-medium text-slate-900">{item.services}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Notes / Issues</p>
                        <p className="font-medium text-slate-900">{item.notes}</p>
                      </div>
                    </div>
                    {item.status === 'Behind Schedule' && (
                      <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-800 flex items-start gap-2">
                         <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                         <p>Requires immediate attention. Contact the MVU team or reassign if necessary.</p>
                      </div>
                    )}
                     <div className="mt-4 flex justify-end gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">View History</button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">Update Status</button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function MVUInventoryView() {
  const today = formatDisplayDate(new Date().toISOString().split('T')[0]);
  const criticalCount = medicineStock.filter(i => i.stock < i.threshold).length;
  const healthyCount = medicineStock.length - criticalCount;

  const [reorderingItem, setReorderingItem] = useState<MedicineStockItem | null>(null);
  const [reorderQuantity, setReorderQuantity] = useState<number>(100);
  const [reorderUrgency, setReorderUrgency] = useState<'P0' | 'P1' | 'P2' | 'P3'>('P1');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const handleReorderClick = (item: MedicineStockItem) => {
    setReorderingItem(item);
    setReorderQuantity(item.threshold * 2); // default suggestion
    setReorderUrgency(item.stock < item.threshold * 0.5 ? 'P0' : 'P1');
  };

  const submitReorder = () => {
    if (reorderingItem) {
      setToast({ message: `Requisition submitted to CDVO for ${reorderQuantity} units of ${reorderingItem.sku} (${reorderUrgency}).`, type: 'success' });
      setReorderingItem(null);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 relative">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 border ${
              toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <CheckCircle2 size={20} />
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package size={24} className="text-green-700" /> MVU Medicine Inventory
          </h3>
          <p className="text-slate-600 mt-1">Real-time stock levels across all active MVUs in the block.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/80 border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
          <CalendarDays size={18} className="text-slate-500" />
          <span className="font-medium text-slate-800">Today: {today}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
         <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Total Items tracked</p>
            <p className="text-2xl font-bold text-slate-800">{medicineStock.length}</p>
         </div>
         <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Healthy Stock</p>
            <p className="text-2xl font-bold text-green-600">{healthyCount}</p>
         </div>
         <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 mb-1">Critical Low Stock</p>
            <p className="text-2xl font-bold text-red-700">{criticalCount}</p>
         </div>
         <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Recent Shipments</p>
            <p className="text-2xl font-bold text-blue-700">2</p>
         </div>
      </div>

      <div className="space-y-4">
        {medicineStock.map((item) => {
          const isLow = item.stock < item.threshold;
          return (
            <div key={item.sku} className={`p-5 rounded-xl border transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${isLow ? 'bg-red-50/30 border-red-200' : 'bg-white/70 border-slate-200'}`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${isLow ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                  <Package size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{item.sku}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">{item.category}</span>
                    <span className="text-xs text-slate-500">Barcode: <span className="font-mono">{item.barcode}</span></span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center">
                <div>
                   <p className="text-xs text-slate-500 mb-1">Current Stock</p>
                   <p className={`text-xl font-bold ${isLow ? 'text-red-600' : 'text-slate-800'}`}>
                     {item.stock} <span className="text-sm font-normal text-slate-500">units</span>
                   </p>
                </div>
                <div>
                   <p className="text-xs text-slate-500 mb-1">Threshold</p>
                   <p className="text-base font-semibold text-slate-700">{item.threshold}</p>
                </div>
                <div>
                   <p className="text-xs text-slate-500 mb-1">Last Received</p>
                   <p className="text-sm font-medium text-slate-700">{formatDisplayDate(item.lastReceived)}</p>
                </div>
                <div>
                   <p className="text-xs text-slate-500 mb-1">Last Used</p>
                   <p className="text-sm font-medium text-slate-700">{formatDisplayDate(item.lastUsed)}</p>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex justify-end">
                <button 
                  onClick={() => handleReorderClick(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm w-full md:w-auto justify-center ${isLow ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'}`}
                >
                  {isLow ? <><AlertTriangle size={16} /> Reorder Now</> : 'Reorder'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Reorder Modal Overlay */}
      <AnimatePresence>
        {reorderingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Send size={20} className="text-blue-600" />
                  Submit CDVO Requisition
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Medicine</p>
                  <p className="font-semibold text-slate-900 text-lg">{reorderingItem.sku}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Current Stock</p>
                    <p className="font-medium text-slate-800">{reorderingItem.stock} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Threshold</p>
                    <p className="font-medium text-slate-800">{reorderingItem.threshold} units</p>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Requested Quantity</label>
                  <input 
                    type="number" 
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Urgency</label>
                  <select 
                    value={reorderUrgency}
                    onChange={(e) => setReorderUrgency(e.target.value as any)}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="P0">P0 - Critical (Immediate)</option>
                    <option value="P1">P1 - High (Within 24h)</option>
                    <option value="P2">P2 - Normal (Routine)</option>
                    <option value="P3">P3 - Low</option>
                  </select>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                <button 
                  onClick={() => setReorderingItem(null)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitReorder}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm button-press"
                >
                  Submit Requisition
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
         <Info size={20} className="text-slate-500 shrink-0 mt-0.5" />
         <p className="text-sm text-slate-600">Stock levels are aggregated across all active MVUs in this block. Data syncs automatically when MVUs return to areas with network coverage. Items marked in red have fallen below their minimum required threshold and should be reordered from the CDVO immediately.</p>
      </div>
    </div>
  );
}

export function BVOMVUOperations({ screen = 'plan', tourStatus = 'Pending', onTourStatusChange, onNavigate }: BVOMVUProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6"><p className="text-sm text-green-700">BVO Portal + Mobile</p><h2 className="text-2xl text-slate-900 mb-4">MVU Planning & Inventory</h2><div className="flex flex-wrap gap-2">{bvoScreens.map(([key, label, route]) => <button key={key} onClick={() => onNavigate?.(route)} className={`min-h-10 px-6 py-2.5 rounded-xl text-sm font-medium ${screen === key ? 'bg-green-600 text-white' : 'bg-white/70'}`}>{label}</button>)}</div></div>
      {screen === 'plan' && (
        <div className="glass-card rounded-2xl p-6">
          <h3>Tour Plan Submission</h3>
          <p className="text-sm text-slate-600 mb-3">Prepare a 3-month village schedule, add villages week-wise, and submit it for CDVO approval.</p>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr] mb-4">
            <div className="grid gap-2">
              {bvoTourPlanStops.map((stop) => (
                <div key={stop.village} className="flex items-start gap-3 rounded-xl bg-white/70 p-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    {stop.week.replace('Week ', 'W')}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{stop.village}</p>
                    <p className="text-sm text-slate-600">{formatDisplayDate(stop.date)} - {stop.service}</p>
                  </div>
                </div>
              ))}
            </div>
            <BVOTourPlanMap />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={() => onTourStatusChange?.('Pending')}
              className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-700/20 transition-all button-press hover:from-green-700 hover:to-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white/70"
            >
              <Send size={14} />
              <span>Submit for CDVO Approval</span>
            </button>
            <span className="inline-flex min-h-10 w-full sm:w-auto items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
              Status: {tourStatus}
            </span>
          </div>
        </div>
      )}
      {screen === 'inventory' && <MVUInventoryView />}
      {screen === 'assignment' && <VillageAssignmentView />}
    </motion.div>
  );
}

function PhoneShell({ children, title, subtitle = "Offline capable MVU team app" }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-[430px]">
      <div className="rounded-[32px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden relative">
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-32 h-6 bg-slate-900 rounded-b-xl"></div>
        </div>
        
        <div className="bg-slate-900 text-green-600 px-6 pt-8 pb-4">
          <p className="text-xs text-green-400 font-medium mb-1 tracking-wide uppercase">{subtitle}</p>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="bg-slate-50 min-h-[720px] p-5 relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" ></div>
          <div className="relative z-10">{children}</div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-1 bg-slate-900 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
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
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">{mobileScreens.map(([key, label, route]) => <button key={key} onClick={() => onNavigate?.(route)} className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${screen === key ? 'bg-green-600 text-white' : 'bg-white/70'}`}>{label}</button>)}</div>
        {screen === 'home' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl shadow-sm border ${offline ? 'bg-red-50 border-red-100 text-red-800' : 'bg-green-50 border-green-100 text-green-800'} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {offline ? <CloudOff size={20} /> : <Cloud size={20} />}
                <span className="font-semibold">{offline ? 'Offline Mode' : 'Online & Synced'}</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">{offline ? 'Local Storage' : 'Live Data'}</span>
            </div>
            
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500 font-medium mb-1">Today's Route</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Balasore LAC-2</h3>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin size={16} className="text-green-600" />
                Remuna <ArrowRight size={14} className="text-slate-400" /> Basta <ArrowRight size={14} className="text-slate-400" /> Soro
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Log Village Visit', icon: <Camera size={24} className="text-blue-600 mb-3" />, route: mobileScreens[1][2] },
                { title: 'Update Stock', icon: <Package size={24} className="text-amber-600 mb-3" />, route: mobileScreens[3][2] },
                { title: 'Daily Form', icon: <FileText size={24} className="text-purple-600 mb-3" />, route: mobileScreens[2][2] },
                { title: 'Alerts', icon: <AlertTriangle size={24} className="text-red-600 mb-3" />, route: mobileScreens[0][2] }
              ].map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => onNavigate?.(item.route)} 
                  className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200 text-left hover:bg-slate-50 transition-colors flex flex-col items-start"
                >
                  {item.icon}
                  <span className="font-semibold text-slate-900">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {screen === 'visit' && (
          <div className="space-y-6">
            <button onClick={() => setOffline(!offline)} className={`w-full p-4 rounded-2xl font-bold text-white shadow-md transition-colors flex items-center justify-center gap-2 ${offline ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
              {offline ? <CloudOff size={20} /> : <Cloud size={20} />}
              {offline ? 'Turn Sync ON' : 'Sync Active'}
            </button>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Current Village</label>
              <input defaultValue="Remuna" className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Camera size={24} />
                </div>
                <p className="font-semibold text-slate-900 mt-1">Arrival</p>
                <p className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md font-mono">GPS 21.49, 86.93</p>
              </div>
              <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer">
                <Camera size={24} />
                <p className="font-medium mt-1">Departure</p>
                <p className="text-xs">Tap to capture</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex gap-3">
              <AlertTriangle size={20} className="shrink-0 mt-0.5 text-amber-600" />
              <p>System verifies GPS with the planned village coordinates automatically.</p>
            </div>
            
            <button onClick={() => onVisitSynced?.(!offline)} className="w-full p-4 rounded-2xl bg-slate-900 text-white font-bold shadow-md hover:bg-slate-800 transition-colors">
              Submit Visit Log
            </button>
            
            {visitSynced && (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-2 font-medium">
                <CheckCircle2 size={20} className="text-green-600" /> Synced to CDVO dashboard.
              </div>
            )}
          </div>
        )}

        {screen === 'daily' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Village</label>
                <input defaultValue="Remuna" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Date</label>
                <input defaultValue={formatDisplayDate('2026-05-22')} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Staffing</label>
              <input defaultValue="Staff present: 3, gaps: 1 pharmacist" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Beneficiaries</label>
              <input defaultValue="Farmers benefitted: M 42 / F 31 / Total 73" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Activity Summary</label>
              <textarea rows={4} defaultValue="Treatments 18, Vaccinations 34, AI 4, samples 3, deworming 22, user charges Rs 480, awareness camp on FMD." className="w-full p-4 rounded-xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none leading-relaxed" />
            </div>
            
            <button className="w-full mt-2 p-4 rounded-2xl bg-green-600 text-white font-bold shadow-md hover:bg-green-700 transition-colors">
              Submit Daily Report
            </button>
          </div>
        )}

        {screen === 'stock' && (
          <div className="space-y-4">
             <div className="flex items-center justify-between mb-2 px-1">
               <h3 className="font-bold text-slate-900">Current Inventory</h3>
               <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-md">{activeStock.length} Items</span>
             </div>
             
            <div className="space-y-3">
              {activeStock.slice(0, 4).map((item) => {
                const isLow = item.stock < item.threshold;
                return (
                  <div key={item.sku} className={`p-4 rounded-2xl flex items-center justify-between shadow-sm border ${isLow ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200'}`}>
                    <div>
                      <p className={`font-bold ${isLow ? 'text-red-900' : 'text-slate-900'}`}>{item.sku}</p>
                      <p className={`text-sm font-medium mt-0.5 ${isLow ? 'text-red-700' : 'text-slate-500'}`}>Min required: {item.threshold}</p>
                    </div>
                    <div className={`text-right ${isLow ? 'text-red-700' : 'text-slate-700'}`}>
                      <p className="text-2xl font-black">{item.stock}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider">Units</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button onClick={deduct} className="w-full mt-4 p-4 rounded-2xl bg-slate-900 text-white font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <PackageMinus size={20} />
              Deduct 12 Dewormer Bolus
            </button>
          </div>
        )}
      </PhoneShell>
    </motion.div>
  );
}
