import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRightLeft,
  BarChart3,
  Bot,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Clock,
  Database,
  Download,
  FileDown,
  FileSpreadsheet,
  FlaskConical,
  Map,
  MapPin,
  MessageSquare,
  Mic,
  PackageCheck,
  Send,
  ShieldAlert,
  Share2,
  Sparkles,
  Syringe,
  Table2,
  TrendingUp,
  UploadCloud,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  allocationHistory,
  anomalyAlerts,
  DistrictSemen,
  forecastData,
  odishaDistricts,
  restockRequests,
} from '../data/semenData';

export type DirectorateSemenScreen =
  | 'state'
  | 'drilldown'
  | 'allocation'
  | 'redistribution'
  | 'requests'
  | 'reports'
  | 'forecasting';

type StockBand = 'healthy' | 'watch' | 'critical';
type RequestStatus = 'pending' | 'approved' | 'rejected' | 'procurement' | 'fulfilled';

interface SemenDashboardProps {
  screen?: DirectorateSemenScreen;
  districts?: DistrictSemen[];
  onDistrictsChange?: (districts: DistrictSemen[]) => void;
  onNavigate?: (page: string) => void;
}

interface RequestRow {
  id: string;
  district: string;
  type: string;
  animal: string;
  qty: number;
  urgency: string;
  submitted: string;
  status: RequestStatus;
  vendor?: string;
}

interface AllocationLogRow {
  id: string;
  district: string;
  semenType: string;
  animalType: string;
  mode: 'numbers' | 'percent';
  inputQuantity: number;
  allocatedQty: number;
  pickupSlot: string;
  beforeStock: number;
  afterStock: number;
  status: string;
}

interface RedistributionLogRow {
  id: string;
  donor: string;
  recipient: string;
  mode: 'numbers' | 'percent';
  inputQuantity: number;
  transferQty: number;
  pickupPlan: string;
  donorBefore: number;
  donorAfter: number;
  recipientBefore: number;
  recipientAfter: number;
  status: string;
}

const screenMeta: Record<DirectorateSemenScreen, { id: string; label: string; page: string }> = {
  state: { id: 'S1-D-01', label: 'Semen Dashboard', page: 'semen-dashboard' },
  drilldown: { id: 'S1-D-02', label: 'District Drilldown', page: 'semen-drilldown' },
  allocation: { id: 'S1-D-03', label: 'District-wise allocation', page: 'semen-allocation' },
  redistribution: { id: 'S1-D-04', label: 'Stock Redistribution', page: 'semen-redistribution' },
  requests: { id: 'S1-D-05', label: 'Restocking Requests', page: 'semen-requests' },
  reports: { id: 'S1-D-06', label: 'Reports', page: 'semen-reports' },
  forecasting: { id: 'S1-D-07', label: 'AI Forecasting', page: 'semen-forecasting' },
};

const vendors = ['Odisha Livestock Development Agency', 'NDDB Sabarmati', 'BAIF Foundation', 'Central Frozen Semen Bank'];
const semenTypes = ['Normal', 'Sex Sorted'];
const animalTypes = ['Cattle', 'Buffalo'];

const formatNumber = (value: number) => new Intl.NumberFormat('en-IN').format(Math.round(value));
const pct = (value: number) => `${Math.round(value)}%`;

const makeAllocationHistory = (districts: DistrictSemen[]): AllocationLogRow[] => {
  const rows = [
    { district: 'Khordha', semenType: 'Normal', animalType: 'Cattle', mode: 'numbers' as const, inputQuantity: 650, pickupSlot: '2026-05-24 09:30', status: 'Submitted' },
    { district: 'Puri', semenType: 'Sex Sorted', animalType: 'Cattle', mode: 'numbers' as const, inputQuantity: 280, pickupSlot: '2026-05-23 12:00', status: 'Submitted' },
    { district: 'Sambalpur', semenType: 'Normal', animalType: 'Buffalo', mode: 'percent' as const, inputQuantity: 1, pickupSlot: '2026-05-22 15:30', status: 'Submitted' },
  ];

  return rows.map((row, index) => {
    const district = districts.find((item) => item.name === row.district) ?? districts[index] ?? districts[0];
    const allocatedQty = row.mode === 'percent' ? Math.round((50000 * row.inputQuantity) / 100) : row.inputQuantity;
    const afterStock = district?.stock ?? allocatedQty;
    const beforeStock = Math.max(0, afterStock - allocatedQty);

    return {
      id: `ALLOC-${String(index + 1).padStart(3, '0')}`,
      district: district?.name ?? row.district,
      semenType: row.semenType,
      animalType: row.animalType,
      mode: row.mode,
      inputQuantity: row.inputQuantity,
      allocatedQty,
      pickupSlot: row.pickupSlot,
      beforeStock,
      afterStock,
      status: row.status,
    };
  });
};

const makeRedistributionHistory = (districts: DistrictSemen[]): RedistributionLogRow[] => {
  const rows = [
    { donor: 'Balasore', recipient: 'Cuttack', mode: 'numbers' as const, inputQuantity: 400, pickupPlan: 'Single pickup slot', status: 'Confirmed' },
    { donor: 'Mayurbhanj', recipient: 'Gajapati', mode: 'numbers' as const, inputQuantity: 260, pickupPlan: 'Split: 10:00, 13:00, 16:00', status: 'Confirmed' },
  ];

  return rows.map((row, index) => {
    const donor = districts.find((item) => item.name === row.donor) ?? districts[index] ?? districts[0];
    const recipient = districts.find((item) => item.name === row.recipient) ?? districts[index + 1] ?? districts[0];
    const transferQty = row.mode === 'percent' ? Math.round(((donor?.stock ?? 0) * row.inputQuantity) / 100) : row.inputQuantity;
    const donorAfter = donor?.stock ?? 0;
    const recipientAfter = recipient?.stock ?? transferQty;

    return {
      id: `REDIST-${String(index + 1).padStart(3, '0')}`,
      donor: donor?.name ?? row.donor,
      recipient: recipient?.name ?? row.recipient,
      mode: row.mode,
      inputQuantity: row.inputQuantity,
      transferQty,
      pickupPlan: row.pickupPlan,
      donorBefore: donorAfter + transferQty,
      donorAfter,
      recipientBefore: Math.max(0, recipientAfter - transferQty),
      recipientAfter,
      status: row.status,
    };
  });
};

const getStockRatio = (district: DistrictSemen) => district.stock / Math.max(district.allocated, 1);

const getStockBand = (ratio: number): StockBand => {
  if (ratio >= 0.6) return 'healthy';
  if (ratio >= 0.35) return 'watch';
  return 'critical';
};

const bandStyles: Record<StockBand, { label: string; bg: string; border: string; text: string; fill: string }> = {
  healthy: { label: 'Green', bg: '#dcfce7', border: '#86efac', text: '#166534', fill: '#16a34a' },
  watch: { label: 'Yellow', bg: '#fef3c7', border: '#fcd34d', text: '#92400e', fill: '#d97706' },
  critical: { label: 'Red', bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', fill: '#dc2626' },
};

const updateDistrictStock = (districts: DistrictSemen[], districtName: string, delta: number) =>
  districts.map((district) =>
    district.name === districtName
      ? {
          ...district,
          stock: Math.max(0, district.stock + delta),
          allocated: Math.max(0, district.allocated + Math.max(delta, 0)),
          daysToStockout:
            district.daysToStockout === null ? null : Math.max(3, district.daysToStockout + Math.round(delta / 80)),
          lastUpdated: 'Just now',
          reporting: true,
        }
      : district
  );

const makeBlocks = (district: DistrictSemen) =>
  Array.from({ length: Math.min(district.blocks, 10) }, (_, index) => {
    const stock = Math.max(45, Math.round((district.stock / Math.min(district.blocks, 10)) * (0.62 + ((index % 5) * 0.11))));
    const allocated = Math.max(stock + 50, Math.round((district.allocated / Math.min(district.blocks, 10)) * (0.9 + ((index % 4) * 0.07))));
    return {
      name: `${district.name} Block ${index + 1}`,
      stock,
      allocated,
      reporting: index % 6 !== 2,
      lastUpdated: index % 6 === 2 ? '18h ago' : `${index + 1}h ago`,
    };
  });

const makeLacs = (district: DistrictSemen) =>
  Array.from({ length: Math.min(district.lacs, 16) }, (_, index) => {
    const stock = Math.max(12, Math.round((district.stock / Math.min(district.lacs, 16)) * (0.54 + ((index % 7) * 0.09))));
    const allocated = Math.max(stock + 20, Math.round((district.allocated / Math.min(district.lacs, 16)) * (0.88 + ((index % 4) * 0.05))));
    return {
      name: `LAC ${district.name}-${index + 1}`,
      stock,
      allocated,
      lastUpdated: index % 5 === 0 ? 'Yesterday' : `${index + 2}h ago`,
    };
  });

const StatTile = ({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: string;
}) => (
  <div className="glass-card rounded-xl p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tone }}>
        {icon}
      </div>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
    <p className="text-2xl text-slate-900 font-mono mb-1">{value}</p>
    <p className="text-xs text-slate-500">{detail}</p>
  </div>
);

const SectionHeader = ({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) => (
  <div className="mb-4">
    <p className="text-xs font-semibold text-green-700 mb-1">{eyebrow}</p>
    <h3 className="text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-600">{detail}</p>
  </div>
);

const DownloadButtons = () => (
  <div className="flex flex-wrap gap-2">
    {['PDF', 'CSV', 'Excel'].map((type) => (
      <button key={type} className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm flex items-center gap-2">
        <Download size={15} />
        {type}
      </button>
    ))}
  </div>
);

function DirectorateShell({
  activeScreen,
  onNavigate,
}: {
  activeScreen: DirectorateSemenScreen;
  onNavigate?: (page: string) => void;
}) {
  return (
    <div className="glass-card-darker rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="text-sm text-green-700 mb-1">Directorate Semen Command Centre</p>
          <h2 className="text-2xl text-slate-900 mb-1">State-Level Semen Inventory & Forecast View</h2>
          <p className="text-sm text-slate-600">All Directorate semen screens mapped for demo navigation.</p>
        </div>

      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(screenMeta).map(([key, item]) => (
          <button
            key={key}
            onClick={() => onNavigate?.(item.page)}
            className={`px-3 py-2 rounded-xl text-sm border transition-all ${
              activeScreen === key
                ? 'bg-green-600 text-white border-green-600 shadow-md'
                : 'bg-white/70 text-slate-700 border-white/40 hover:bg-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StateDashboard({
  districts,
  onNavigate,
  onSelectDistrict,
}: {
  districts: DistrictSemen[];
  onNavigate?: (page: string) => void;
  onSelectDistrict: (district: string) => void;
}) {
  const totalDoses = districts.reduce((sum, item) => sum + item.stock, 0);
  const totalAllocated = districts.reduce((sum, item) => sum + item.allocated, 0);
  const usedThisMonth = districts.reduce((sum, item) => sum + item.used, 0);
  const totalTarget = districts.reduce((sum, item) => sum + item.target, 0);
  const nonReportingDistricts = districts.filter((item) => !item.reporting);
  const compliancePercent = Math.round(((districts.length - nonReportingDistricts.length) / districts.length) * 100);

  const stockoutAlerts = [...districts]
    .filter((item) => item.daysToStockout !== null && item.daysToStockout <= 14)
    .sort((a, b) => (a.daysToStockout ?? 999) - (b.daysToStockout ?? 999));

  const utilizationData = districts
    .map((district) => ({
      district: district.name,
      utilization: Math.round((district.used / district.target) * 100),
    }))
    .sort((a, b) => b.utilization - a.utilization);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatTile icon={<Syringe size={20} className="text-green-700" />} label="Total doses in state" value={formatNumber(totalDoses)} detail="Available frozen semen doses" tone="#dcfce7" />
        <StatTile icon={<PackageCheck size={20} className="text-blue-700" />} label="Doses allocated" value={formatNumber(totalAllocated)} detail={`${pct((totalDoses / totalAllocated) * 100)} stock remaining`} tone="#dbeafe" />
        <StatTile icon={<BarChart3 size={20} className="text-amber-700" />} label="Doses used this month" value={formatNumber(usedThisMonth)} detail={`${pct((usedThisMonth / totalTarget) * 100)} of monthly target`} tone="#fef3c7" />
        <StatTile icon={<ShieldAlert size={20} className="text-red-700" />} label="Reporting compliance" value={`${compliancePercent}%`} detail={`${nonReportingDistricts.length} districts pending update`} tone="#fee2e2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <SectionHeader eyebrow="" title="30-District Heatmap" detail="Click any district to open the District Drilldown with blocks and LACs." />
            <div className="hidden md:flex items-center gap-3 text-xs text-slate-600">
              {Object.values(bandStyles).map((style) => (
                <span key={style.label} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: style.bg, border: `1px solid ${style.border}` }} />
                  {style.label}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))' }}>
            {districts.map((district) => {
              const ratio = getStockRatio(district);
              const band = getStockBand(ratio);
              const style = bandStyles[band];
              const stockPercent = Math.round(ratio * 100);
              return (
                <button
                  key={district.id}
                  onClick={() => {
                    onSelectDistrict(district.name);
                    onNavigate?.('semen-drilldown');
                  }}
                  className="text-left rounded-xl p-3 border button-press"
                  style={{ background: style.bg, borderColor: style.border }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold" style={{ color: style.text }}>{district.name}</p>
                    <span className="text-xs font-mono" style={{ color: style.text }}>{district.id}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{formatNumber(district.stock)} doses</p>
                  <div className="h-2 rounded-full bg-white/70 overflow-hidden">
                    <div className="h-2 rounded-full" style={{ width: `${Math.min(stockPercent, 100)}%`, background: style.fill }} />
                  </div>
                  <p className="text-xs mt-2" style={{ color: style.text }}>{stockPercent}% of allocation</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="AI Early Warnings" title="AI Stock-Out Alert Cards" detail="Priority districts for replenishment or redistribution." />
          <div className="space-y-3">
            {stockoutAlerts.map((district) => {
              const isCritical = (district.daysToStockout ?? 99) <= 10;
              return (
                <div key={district.id} className="p-4 rounded-xl border" style={{ background: isCritical ? '#fef2f2' : '#fffbeb', borderColor: isCritical ? '#fecaca' : '#fde68a' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-900 font-semibold">{district.name}: {district.daysToStockout} days to stock-out</p>
                      <p className="text-xs text-slate-600 mt-1">Current stock {formatNumber(district.stock)} doses; used {formatNumber(district.used)} this month.</p>
                    </div>
                    <Clock size={18} className={isCritical ? 'text-red-600' : 'text-amber-600'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <SectionHeader eyebrow="" title="Dose Utilisation % vs Target" detail="District-wise monthly AI dose usage against target." />
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="district" angle={-45} textAnchor="end" interval={0} height={90} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 120]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Utilisation']} />
                <Bar dataKey="utilization" radius={[6, 6, 0, 0]}>
                  {utilizationData.map((item) => (
                    <Cell key={item.district} fill={item.utilization >= 90 ? '#16a34a' : item.utilization >= 75 ? '#d97706' : '#dc2626'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="" title="Data Updation Compliance" detail="Districts not reporting today." />
          <div className="space-y-3">
            {nonReportingDistricts.map((district) => (
              <div key={district.id} className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/30">
                <div>
                  <p className="text-sm text-slate-900">{district.name}</p>
                  <p className="text-xs text-slate-500">Last update: {district.lastUpdated}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs">Not reporting</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DistrictDrilldown({ districts, selectedDistrictName, onSelectedDistrictChange }: { districts: DistrictSemen[]; selectedDistrictName: string; onSelectedDistrictChange: (name: string) => void }) {
  const district = districts.find((item) => item.name === selectedDistrictName) ?? districts[0];
  const blocks = makeBlocks(district);
  const lacs = makeLacs(district);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeader eyebrow="" title="District Inventory Drilldown" detail="Blocks and LACs under selected district with live stock status." />
          <select value={district.name} onChange={(event) => onSelectedDistrictChange(event.target.value)} className="px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 text-sm">
            {districts.map((item) => <option key={item.id}>{item.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
          <StatTile icon={<Map size={20} className="text-green-700" />} label="District stock" value={formatNumber(district.stock)} detail={`${district.blocks} blocks, ${district.lacs} LACs`} tone="#dcfce7" />
          <StatTile icon={<Syringe size={20} className="text-blue-700" />} label="Allocated" value={formatNumber(district.allocated)} detail={`${pct(getStockRatio(district) * 100)} stock against allocation`} tone="#dbeafe" />
          <StatTile icon={<TrendingUp size={20} className="text-amber-700" />} label="Used this month" value={formatNumber(district.used)} detail={`${pct((district.used / district.target) * 100)} of target`} tone="#fef3c7" />
          <StatTile icon={<Clock size={20} className="text-red-700" />} label="Last updated" value={district.lastUpdated} detail={district.reporting ? 'District reporting active' : 'Reporting pending'} tone="#fee2e2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="BLOCK INVENTORY" title="All Blocks in District" detail="Non-reporting blocks are flagged for follow-up." />
          <div className="space-y-3">
            {blocks.map((block) => {
              const style = bandStyles[getStockBand(block.stock / block.allocated)];
              return (
                <div key={block.name} className="p-3 rounded-xl border" style={{ background: style.bg, borderColor: style.border }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: style.text }}>{block.name}</p>
                      <p className="text-xs text-slate-600">Last updated: {block.lastUpdated}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono" style={{ color: style.text }}>{formatNumber(block.stock)}</p>
                      {!block.reporting && <p className="text-xs text-red-700">Not reporting</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="LAC INVENTORY" title="Colour-Coded Inventory per LAC" detail="Green/yellow/red inventory with LAC timestamps." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lacs.map((lac) => {
              const style = bandStyles[getStockBand(lac.stock / lac.allocated)];
              return (
                <div key={lac.name} className="p-3 rounded-xl border" style={{ background: style.bg, borderColor: style.border }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold" style={{ color: style.text }}>{lac.name}</p>
                    <p className="text-sm font-mono" style={{ color: style.text }}>{formatNumber(lac.stock)}</p>
                  </div>
                  <p className="text-xs text-slate-600">Last updated: {lac.lastUpdated}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AllocationScreen({ districts, onDistrictsChange }: { districts: DistrictSemen[]; onDistrictsChange: (districts: DistrictSemen[]) => void }) {
  const [districtName, setDistrictName] = useState('Cuttack');
  const [semenType, setSemenType] = useState('Normal');
  const [animalType, setAnimalType] = useState('Cattle');
  const [mode, setMode] = useState<'numbers' | 'percent'>('numbers');
  const [quantity, setQuantity] = useState(500);
  const [pickupDate, setPickupDate] = useState('2026-05-25');
  const [pickupTime, setPickupTime] = useState('10:30');
  const [message, setMessage] = useState('');
  const [allocationRows, setAllocationRows] = useState<AllocationLogRow[]>(() => makeAllocationHistory(districts));
  const fsbStock = 50000;
  const district = districts.find((item) => item.name === districtName) ?? districts[0];
  const allocationQty = mode === 'percent' ? Math.round((fsbStock * quantity) / 100) : quantity;

  const submitAllocation = () => {
    onDistrictsChange(updateDistrictStock(districts, districtName, allocationQty));
    setAllocationRows((rows) => [
      {
        id: `ALLOC-${String(rows.length + 1).padStart(3, '0')}`,
        district: districtName,
        semenType,
        animalType,
        mode,
        inputQuantity: quantity,
        allocatedQty: allocationQty,
        pickupSlot: `${pickupDate} ${pickupTime}`,
        beforeStock: district.stock,
        afterStock: district.stock + allocationQty,
        status: 'Submitted',
      },
      ...rows,
    ]);
    setMessage(`${formatNumber(allocationQty)} ${semenType} ${animalType} doses allocated to ${districtName}. Stock rises from ${formatNumber(district.stock)} to ${formatNumber(district.stock + allocationQty)}.`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="glass-card rounded-2xl p-5 lg:col-span-2">
        <SectionHeader eyebrow="" title="Semen Allocation to Districts" detail="Allocate state FSB stock with pickup slot. Submit updates district inventory instantly." />
        
        <div className="space-y-4 mt-4">
          {/* District & Semen Selection */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-blue-700" />
              District & Stock Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">District</span>
                <select value={districtName} onChange={(event) => setDistrictName(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {districts.map((item) => <option key={item.id}>{item.name}</option>)}
                </select>
                <p className="text-xs text-slate-600">Select target district for allocation</p>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Semen type</span>
                <select value={semenType} onChange={(event) => setSemenType(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {semenTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
                <p className="text-xs text-slate-600">Normal or sex sorted doses</p>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Animal type</span>
                <select value={animalType} onChange={(event) => setAnimalType(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {animalTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
                <p className="text-xs text-slate-600">Cattle or buffalo breeds</p>
              </label>
            </div>
          </div>

          {/* Quantity Details */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Syringe size={16} className="text-amber-700" />
              Quantity Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Quantity mode</span>
                <select value={mode} onChange={(event) => setMode(event.target.value as 'numbers' | 'percent')} className="w-full px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="numbers">Absolute Numbers</option>
                  <option value="percent">% of FSB stock</option>
                </select>
                <p className="text-xs text-slate-600">Choose how to specify quantity</p>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Quantity</span>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <span className="px-3 py-2.5 rounded-xl bg-amber-100 text-amber-900 font-semibold text-sm whitespace-nowrap">{mode === 'percent' ? `${quantity}%` : formatNumber(allocationQty)}</span>
                </div>
                <p className="text-xs text-slate-600">FSB total: {formatNumber(fsbStock)} doses</p>
              </label>
            </div>
          </div>

          {/* Pickup Schedule */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CalendarClock size={16} className="text-purple-700" />
              Pickup Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Pickup date</span>
                <input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <p className="text-xs text-slate-600">When to pick up the stock</p>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Pickup time</span>
                <input type="time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <p className="text-xs text-slate-600">Preferred pickup time slot</p>
              </label>
            </div>
          </div>
        </div>

        <button onClick={submitAllocation} className="mt-6 w-full px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg flex items-center justify-center gap-2 button-press font-semibold hover:shadow-xl transition-all">
          <Send size={18} />
          Submit Allocation
        </button>
        {message && <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{message}</div>}

      </div>

      <div className="glass-card rounded-2xl p-5">
        <SectionHeader eyebrow="PREVIEW" title="Live Inventory Impact" detail="Compact stock impact before you submit." />
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-white/70 border border-white/40">
            <p className="text-xs text-slate-500 font-semibold uppercase">Before</p>
            <p className="text-xl font-mono text-slate-900 mt-1">{formatNumber(district.stock)}</p>
          </div>
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-semibold uppercase">Add</p>
            <p className="text-xl font-mono text-green-700 mt-1">+{formatNumber(allocationQty)}</p>
          </div>
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-semibold uppercase">After</p>
            <p className="text-xl font-mono text-green-800 mt-1">{formatNumber(district.stock + allocationQty)}</p>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-xl bg-white/60 border border-white/30 text-sm">
          <p className="font-semibold text-slate-900">{district.name}</p>
          <p className="text-xs text-slate-600 mt-1">{semenType} {animalType} - pickup {pickupDate} at {pickupTime}</p>
        </div>
      </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Table2 size={16} className="text-green-700" />
              Allocation History
            </p>
            <p className="text-xs text-slate-600 mt-1">Past allocation data plus new submissions from this screen.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
            {allocationRows.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 760 }}>
            <thead>
              <tr className="text-left text-xs uppercase text-slate-600 border-b border-white/40">
                <th className="py-2.5 px-3">ID / Pickup</th>
                <th className="py-2.5 px-3">District & Type</th>
                <th className="py-2.5 px-3 text-right">Quantity</th>
                <th className="py-2.5 px-3">Stock Impact</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {allocationRows.map((row) => (
                <tr key={row.id} className="border-b border-white/30 hover:bg-white/40 transition-colors">
                  <td className="py-3 px-3">
                    <p className="text-sm font-mono text-slate-900">{row.id}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{row.pickupSlot}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-sm font-semibold text-slate-900">{row.district}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{row.semenType} - {row.animalType}</p>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <p className="text-sm font-mono text-slate-900">{formatNumber(row.allocatedQty)}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{row.mode === 'percent' ? `${row.inputQuantity}% FSB` : 'Numbers'}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-sm font-mono text-slate-700">{formatNumber(row.beforeStock)}{' -> '}<span className="text-green-700">{formatNumber(row.afterStock)}</span></p>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RedistributionScreen({ districts, onDistrictsChange }: { districts: DistrictSemen[]; onDistrictsChange: (districts: DistrictSemen[]) => void }) {
  const [donorName, setDonorName] = useState('Balasore');
  const [recipientName, setRecipientName] = useState('Cuttack');
  const [mode, setMode] = useState<'numbers' | 'percent'>('numbers');
  const [quantity, setQuantity] = useState(400);
  const [multiSlot, setMultiSlot] = useState(false);
  const [message, setMessage] = useState('');
  const [redistributionRows, setRedistributionRows] = useState<RedistributionLogRow[]>(() => makeRedistributionHistory(districts));
  const donor = districts.find((item) => item.name === donorName) ?? districts[0];
  const recipient = districts.find((item) => item.name === recipientName) ?? districts[1];
  const transferQty = mode === 'percent' ? Math.round((donor.stock * quantity) / 100) : quantity;

  const confirm = () => {
    const afterDonor = updateDistrictStock(districts, donorName, -transferQty);
    const afterBoth = updateDistrictStock(afterDonor, recipientName, transferQty);
    onDistrictsChange(afterBoth);
    setRedistributionRows((rows) => [
      {
        id: `REDIST-${String(rows.length + 1).padStart(3, '0')}`,
        donor: donorName,
        recipient: recipientName,
        mode,
        inputQuantity: quantity,
        transferQty,
        pickupPlan: multiSlot ? 'Split: 10:00, 13:00, 16:00' : 'Single pickup slot',
        donorBefore: donor.stock,
        donorAfter: Math.max(0, donor.stock - transferQty),
        recipientBefore: recipient.stock,
        recipientAfter: recipient.stock + transferQty,
        status: 'Confirmed',
      },
      ...rows,
    ]);
    setMessage(`${formatNumber(transferQty)} doses moved from ${donorName} to ${recipientName}. Both district stocks updated instantly.`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="glass-card rounded-2xl p-5 lg:col-span-2">
        <SectionHeader eyebrow="" title="Redistribution Between Districts" detail="Move surplus stock from donor districts to deficit districts." />
        
        {/* AI Suggestion */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 mb-4 flex items-start gap-3">
          <Sparkles className="text-green-700 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm font-semibold text-green-900">💡 AI Recommendation</p>
            <p className="text-sm text-green-800 mt-1">Balasore has 800 doses surplus. Transfer 400 doses to Cuttack to optimize utilization.</p>
            <p className="text-xs text-green-700 mt-1">Smart allocation based on inventory analysis</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Donor District */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-red-700" />
              Donor District (Surplus Stock)
            </h3>
            <label className="space-y-2 text-sm">
              <span className="text-slate-700 font-semibold">Select donor</span>
              <select value={donorName} onChange={(event) => setDonorName(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-red-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500">
                {districts.map((item) => <option key={item.id}>{item.name}</option>)}
              </select>
              <p className="text-xs text-slate-600">District with surplus stock to transfer</p>
            </label>
            {donor && (
              <div className="mt-3 p-3 rounded-lg bg-white/60 border border-red-200">
                <p className="text-xs text-slate-600">Available stock</p>
                <p className="text-xl font-bold text-red-700">{formatNumber(donor.stock)}</p>
              </div>
            )}
          </div>

          {/* Flow Indicator */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300">
              <ArrowRightLeft size={18} className="text-slate-700" />
              <span className="text-sm font-semibold text-slate-700">Transfer</span>
            </div>
          </div>

          {/* Recipient District */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-700" />
              Recipient District (Deficit Stock)
            </h3>
            <label className="space-y-2 text-sm">
              <span className="text-slate-700 font-semibold">Select recipient</span>
              <select value={recipientName} onChange={(event) => setRecipientName(event.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-green-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500">
                {districts.map((item) => <option key={item.id}>{item.name}</option>)}
              </select>
              <p className="text-xs text-slate-600">District with deficit stock to receive doses</p>
            </label>
            {recipient && (
              <div className="mt-3 p-3 rounded-lg bg-white/60 border border-green-200">
                <p className="text-xs text-slate-600">Current stock</p>
                <p className="text-xl font-bold text-green-700">{formatNumber(recipient.stock)}</p>
              </div>
            )}
          </div>

          {/* Transfer Details */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Syringe size={16} className="text-blue-700" />
              Transfer Quantity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Quantity mode</span>
                <select value={mode} onChange={(event) => setMode(event.target.value as 'numbers' | 'percent')} className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="numbers">Absolute Numbers</option>
                  <option value="percent">% of donor stock</option>
                </select>
                <p className="text-xs text-slate-600">How to specify quantity</p>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-slate-700 font-semibold">Quantity</span>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-blue-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="px-3 py-2.5 rounded-xl bg-blue-100 text-blue-900 font-semibold text-sm whitespace-nowrap">{mode === 'percent' ? `${quantity}%` : formatNumber(transferQty)}</span>
                </div>
                <p className="text-xs text-slate-600">Max available: {formatNumber(donor.stock)}</p>
              </label>
            </div>
          </div>

          {/* Pickup Options */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" checked={multiSlot} onChange={(event) => setMultiSlot(event.target.checked)} className="w-4 h-4 rounded border-purple-300 text-purple-600 cursor-pointer" />
              <div>
                <span className="font-semibold text-slate-900">Split pickup into multiple slots</span>
                <p className="text-xs text-slate-600 mt-0.5">Distribute transfer across 3 pickup times (10:00, 13:00, 16:00)</p>
              </div>
            </label>
          </div>
        </div>

        <button onClick={confirm} className="mt-6 w-full px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg flex items-center justify-center gap-2 button-press font-semibold hover:shadow-xl transition-all">
          <ArrowRightLeft size={18} />
          Confirm Redistribution
        </button>
        {message && <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{message}</div>}

      </div>

      <div className="glass-card rounded-2xl p-5">
        <SectionHeader eyebrow="LIVE BALANCE" title="Before & After Impact" detail={multiSlot ? 'Pickup slots: 10:00, 13:00, 16:00' : 'Single pickup slot'} />
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-red-50 border border-red-200">
            <p className="text-xs text-red-700 uppercase font-semibold">{donor.name} donor</p>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <span className="font-mono text-slate-800">{formatNumber(donor.stock)}</span>
              <span className="font-mono text-red-700">-{formatNumber(transferQty)}</span>
              <span className="font-mono text-red-800">{formatNumber(Math.max(0, donor.stock - transferQty))}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 uppercase font-semibold">{recipient.name} recipient</p>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <span className="font-mono text-slate-800">{formatNumber(recipient.stock)}</span>
              <span className="font-mono text-green-700">+{formatNumber(transferQty)}</span>
              <span className="font-mono text-green-800">{formatNumber(recipient.stock + transferQty)}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/60 border border-white/30">
            <p className="text-xs font-semibold text-slate-700">Transfer plan</p>
            <p className="text-xs text-slate-600 mt-1">{mode === 'percent' ? `${quantity}% of donor stock` : `${formatNumber(transferQty)} doses`} - {multiSlot ? 'split pickup' : 'single pickup'}</p>
          </div>
        </div>
      </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Table2 size={16} className="text-green-700" />
              Redistribution History
            </p>
            <p className="text-xs text-slate-600 mt-1">Past redistributions plus new confirmations from this screen.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
            {redistributionRows.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 860 }}>
            <thead>
              <tr className="text-left text-xs uppercase text-slate-600 border-b border-white/40">
                <th className="py-2.5 px-3">ID / Plan</th>
                <th className="py-2.5 px-3">Movement</th>
                <th className="py-2.5 px-3 text-right">Qty</th>
                <th className="py-2.5 px-3">Donor Impact</th>
                <th className="py-2.5 px-3">Recipient Impact</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {redistributionRows.map((row) => (
                <tr key={row.id} className="border-b border-white/30 hover:bg-white/40 transition-colors">
                  <td className="py-3 px-3">
                    <p className="text-sm font-mono text-slate-900">{row.id}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{row.pickupPlan}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-sm font-semibold text-slate-900">{row.donor}</p>
                    <p className="text-xs text-slate-500 mt-0.5">to {row.recipient}</p>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <p className="text-sm font-mono text-slate-900">{formatNumber(row.transferQty)}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{row.mode === 'percent' ? `${row.inputQuantity}% donor` : 'Numbers'}</p>
                  </td>
                  <td className="py-3 px-3 text-sm font-mono text-slate-700">
                    {formatNumber(row.donorBefore)}{' -> '}<span className="text-red-700">{formatNumber(row.donorAfter)}</span>
                  </td>
                  <td className="py-3 px-3 text-sm font-mono text-slate-700">
                    {formatNumber(row.recipientBefore)}{' -> '}<span className="text-green-700">{formatNumber(row.recipientAfter)}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RequestManagement() {
  const [requests, setRequests] = useState<RequestRow[]>(restockRequests.map((item) => ({ ...item, status: item.status as RequestStatus })));
  const [vendor, setVendor] = useState(vendors[0]);
  const sorted = [...requests].sort((a, b) => ['critical', 'high', 'medium', 'low'].indexOf(a.urgency) - ['critical', 'high', 'medium', 'low'].indexOf(b.urgency));
  const setStatus = (id: string, status: RequestStatus) => setRequests((rows) => rows.map((row) => row.id === id ? { ...row, status, vendor: status === 'procurement' ? vendor : row.vendor } : row));
  const count = (status: RequestStatus) => requests.filter((row) => row.status === status).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatTile icon={<AlertTriangle size={20} className="text-red-700" />} label="Pending count" value={String(count('pending'))} detail="Awaiting action" tone="#fee2e2" />
        <StatTile icon={<CheckCircle2 size={20} className="text-green-700" />} label="Approved count" value={String(count('approved'))} detail="Districts notified" tone="#dcfce7" />
        <StatTile icon={<PackageCheck size={20} className="text-blue-700" />} label="Fulfilled count" value={String(count('fulfilled'))} detail="Loop closed" tone="#dbeafe" />
        <StatTile icon={<Clock size={20} className="text-amber-700" />} label="Avg approval time" value="1.8d" detail="Across this month" tone="#fef3c7" />
      </div>
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <SectionHeader eyebrow="" title="Restocking Request Management" detail="Sortable by urgency with approve, reject, procurement, and fulfilment actions." />
          <select value={vendor} onChange={(event) => setVendor(event.target.value)} className="px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 text-sm">
            {vendors.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-left text-sm text-slate-600 border-b border-white/40">
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Animal</th>
                <th className="py-3 px-3">Qty</th>
                <th className="py-3 px-3">Urgency</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id} className="border-b border-white/30">
                  <td className="py-3 px-3 text-sm text-slate-900">{row.district}</td>
                  <td className="py-3 px-3 text-sm">{row.type}</td>
                  <td className="py-3 px-3 text-sm">{row.animal}</td>
                  <td className="py-3 px-3 text-sm font-mono">{formatNumber(row.qty)}</td>
                  <td className="py-3 px-3"><span className={`px-2 py-1 rounded-full text-xs ${row.urgency === 'critical' ? 'bg-red-100 text-red-700' : row.urgency === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{row.urgency}</span></td>
                  <td className="py-3 px-3 text-sm">{row.submitted}</td>
                  <td className="py-3 px-3 text-sm">{row.status}{row.vendor ? `: ${row.vendor}` : ''}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setStatus(row.id, 'approved')} className="px-2 py-1 rounded-lg bg-green-50 text-green-700 text-xs">Approve</button>
                      <button onClick={() => setStatus(row.id, 'rejected')} className="px-2 py-1 rounded-lg bg-red-50 text-red-700 text-xs">Reject</button>
                      <button onClick={() => setStatus(row.id, 'procurement')} className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs">Procure</button>
                      <button onClick={() => setStatus(row.id, 'fulfilled')} className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs">Fulfilled</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReportsScreen({ districts }: { districts: DistrictSemen[] }) {
  const [semenTypeFilter, setSemenTypeFilter] = useState('Normal + Sex Sorted');
  const [animalTypeFilter, setAnimalTypeFilter] = useState('Cattle + Buffalo');
  const [dateFilter, setDateFilter] = useState('2026-05-01');
  const [sortBy, setSortBy] = useState<'district' | 'utilisation' | 'stock' | 'daysToStockout'>('district');
  const [chatQuery, setChatQuery] = useState('Show critical districts and semen utilisation summary');
  const [chatAnswer, setChatAnswer] = useState('Critical stock pockets are concentrated in Gajapati, Cuttack, Malkangiri, Deogarh, and Nuapada. Prioritise immediate replenishment for districts below 14 days to stockout, then rebalance excess doses from Balasore and Mayurbhanj. The RAG context used district stock, utilisation, reporting, block, and LAC coverage records.');
  const [isListening, setIsListening] = useState(false);
  
  const data = districts.slice(0, 12).map((district) => ({
    district: district.name,
    utilisation: Math.round((district.used / district.target) * 100),
    restock: district.daysToStockout ?? 45,
    compliance: district.reporting ? 96 : 44,
  }));

  const tableData = [...districts].sort((a, b) => {
    switch (sortBy) {
      case 'utilisation':
        return (b.used / b.target) - (a.used / a.target);
      case 'stock':
        return b.stock - a.stock;
      case 'daysToStockout':
        return (a.daysToStockout ?? 45) - (b.daysToStockout ?? 45);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalStock = tableData.reduce((sum, d) => sum + d.stock, 0);
  const totalAllocated = tableData.reduce((sum, d) => sum + d.allocated, 0);
  const totalUsed = tableData.reduce((sum, d) => sum + d.used, 0);
  const totalTarget = tableData.reduce((sum, d) => sum + d.target, 0);
  const averageUtilisation = Math.round((totalUsed / totalTarget) * 100);
  const criticalDistricts = tableData.filter((d) => (d.daysToStockout ?? 45) <= 14);
  const topUtilisation = [...tableData].sort((a, b) => b.used / b.target - a.used / a.target).slice(0, 5);
  const ragSources = [
    { name: 'District stock ledger', rows: tableData.length, confidence: 98 },
    { name: 'AI service history', rows: totalUsed, confidence: 94 },
    { name: 'Block and LAC drilldown', rows: tableData.reduce((sum, d) => sum + d.blocks + d.lacs, 0), confidence: 91 },
  ];
  const masterReportItems = [
    { title: 'Dose-wise utilisation by semen type', detail: `${formatNumber(totalUsed)} doses used from ${formatNumber(totalAllocated)} allocated`, tone: 'bg-green-50 text-green-700 border-green-200' },
    { title: 'Farmer-wise AI service history', detail: 'Service timeline, technician, cattle or buffalo, repeat AI, and outcome flags', tone: 'bg-blue-50 text-blue-700 border-blue-200' },
    { title: 'Breed and demographic coverage', detail: `${formatNumber(totalTarget)} target coverage with breed, age group, and village segmentation`, tone: 'bg-amber-50 text-amber-700 border-amber-200' },
    { title: 'District, block, LAC drilldown extract', detail: `${tableData.length} districts, ${tableData.reduce((sum, d) => sum + d.blocks, 0)} blocks, ${tableData.reduce((sum, d) => sum + d.lacs, 0)} LACs`, tone: 'bg-slate-50 text-slate-700 border-slate-200' },
  ];

  const answerQuestion = (query = chatQuery) => {
    const normalized = query.toLowerCase();
    const lowestStock = [...tableData].sort((a, b) => a.stock - b.stock).slice(0, 3).map((d) => d.name).join(', ');
    const bestUtilisation = topUtilisation.map((d) => `${d.name} ${Math.round((d.used / d.target) * 100)}%`).join(', ');
    const criticalNames = criticalDistricts.map((d) => d.name).join(', ') || 'no critical districts';
    let response = `State utilisation is ${averageUtilisation}% with ${formatNumber(totalStock)} doses in stock. Critical districts are ${criticalNames}. Recommended action: push replenishment to low-stock districts, verify pending LAC reporting, and export the master report for review.`;

    if (normalized.includes('critical') || normalized.includes('stockout')) {
      response = `${criticalDistricts.length} districts are at or below 14 days to stockout: ${criticalNames}. Dispatch priority should start with ${lowestStock}, and the procurement queue should reserve buffer for remote LACs.`;
    } else if (normalized.includes('utilisation') || normalized.includes('performance')) {
      response = `Top utilisation districts are ${bestUtilisation}. Overall utilisation is ${averageUtilisation}%, so the next review should compare demand with allocated doses before releasing additional sex-sorted stock.`;
    } else if (normalized.includes('farmer') || normalized.includes('history')) {
      response = `Farmer-wise AI history should be filtered by district, breed, technician, and repeat-service status. The current master extract can link ${formatNumber(totalUsed)} completed AI services with field-level demographic coverage.`;
    } else if (normalized.includes('excel') || normalized.includes('download')) {
      response = 'Excel-ready export is prepared with district summary, dose utilisation, critical stockout list, and RAG source metadata. Use the Excel button below to download the CSV extract.';
    }

    setChatAnswer(response);
  };

  const downloadMasterCsv = () => {
    const header = ['District', 'Current Stock', 'Allocated', 'Used', 'Target', 'Utilisation %', 'Days to Stockout', 'Blocks', 'LACs', 'Reporting'];
    const rows = tableData.map((d) => [
      d.name,
      d.stock,
      d.allocated,
      d.used,
      d.target,
      Math.round((d.used / d.target) * 100),
      d.daysToStockout ?? 'Long buffer',
      d.blocks,
      d.lacs,
      d.reporting ? 'Reporting' : 'Pending',
    ]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `semen-master-report-${dateFilter}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareReport = async () => {
    const shareText = `Semen master report: ${averageUtilisation}% utilisation, ${formatNumber(totalStock)} stock, ${criticalDistricts.length} critical districts.`;
    if (navigator.share) {
      await navigator.share({ title: 'Semen Master Report', text: shareText });
      return;
    }
    await navigator.clipboard?.writeText(shareText);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setChatAnswer('Voice input is ready for supported browsers. This browser does not expose speech recognition, so type the question and press Ask AI.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      setChatQuery(transcript);
      answerQuestion(transcript);
    };
    recognition.start();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <SectionHeader eyebrow="" title="Analytics & Reports" detail="Filterable reports for semen type, animal type, date range, and level." />
          <div className="flex flex-wrap gap-2">
            <select value={semenTypeFilter} onChange={(e) => setSemenTypeFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm"><option>Normal + Sex Sorted</option><option>Normal</option><option>Sex Sorted</option></select>
            <select value={animalTypeFilter} onChange={(e) => setAnimalTypeFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm"><option>Cattle + Buffalo</option><option>Cattle</option><option>Buffalo</option></select>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="text-left text-sm text-slate-600 font-semibold border-b-2 border-white/40">
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4 text-right">Current Stock</th>
                <th className="py-3 px-4 text-right">Allocated</th>
                <th className="py-3 px-4 text-right">Used</th>
                <th className="py-3 px-4 text-right">Target</th>
                <th className="py-3 px-4 text-center">Utilisation %</th>
                <th className="py-3 px-4 text-right">Days to Stockout</th>
                <th className="py-3 px-4">Blocks</th>
                <th className="py-3 px-4">LACs</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((district) => {
                const utilisationPct = Math.round((district.used / district.target) * 100);
                const stockRatio = district.stock / district.allocated;
                const statusColor = district.reporting ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50';
                const utilisationStyle = utilisationPct >= 90 ? 'text-green-700 bg-green-50' : utilisationPct >= 75 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';
                const daysStyle = (district.daysToStockout ?? 45) <= 14 ? 'text-red-700 bg-red-50' : (district.daysToStockout ?? 45) <= 28 ? 'text-amber-700 bg-amber-50' : 'text-green-700 bg-green-50';
                
                return (
                  <tr key={district.id} className="border-b border-white/20 hover:bg-white/40 transition-colors">
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">{district.name}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-700">{formatNumber(district.stock)}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-700">{formatNumber(district.allocated)}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-700">{formatNumber(district.used)}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-700">{formatNumber(district.target)}</td>
                    <td className="py-3 px-4 text-center"><span className={`px-3 py-1 rounded-full text-sm font-semibold ${utilisationStyle}`}>{utilisationPct}%</span></td>
                    <td className="py-3 px-4 text-right"><span className={`px-3 py-1 rounded-full text-sm font-semibold ${daysStyle}`}>{district.daysToStockout ?? 'Long buffer'}</span></td>
                    <td className="py-3 px-4 text-sm text-slate-700">{district.blocks}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{district.lacs}</td>
                    <td className="py-3 px-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>{district.reporting ? 'Reporting' : 'Pending'}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/30">
          <div className="p-4 rounded-xl bg-white/50 border border-white/30">
            <p className="text-xs text-slate-600 mb-1">Total Stock (All Districts)</p>
            <p className="text-2xl font-bold text-slate-900">{formatNumber(tableData.reduce((sum, d) => sum + d.stock, 0))}</p>
            <p className="text-xs text-slate-500 mt-1">Across all 30 districts</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 border border-white/30">
            <p className="text-xs text-slate-600 mb-1">Avg Utilisation Rate</p>
            <p className="text-2xl font-bold text-slate-900">{Math.round(tableData.reduce((sum, d) => sum + (d.used / d.target * 100), 0) / tableData.length)}%</p>
            <p className="text-xs text-slate-500 mt-1">Across all districts</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 border border-white/30">
            <p className="text-xs text-slate-600 mb-1">Districts Reporting</p>
            <p className="text-2xl font-bold text-green-700">{tableData.filter(d => d.reporting).length}/{tableData.length}</p>
            <p className="text-xs text-slate-500 mt-1">{Math.round(tableData.filter(d => d.reporting).length / tableData.length * 100)}% active</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 border border-white/30">
            <p className="text-xs text-slate-600 mb-1">Critical (Days to Stockout &lt;= 14)</p>
            <p className="text-2xl font-bold text-red-700">{tableData.filter(d => (d.daysToStockout ?? 45) <= 14).length}</p>
            <p className="text-xs text-slate-500 mt-1">Immediate action needed</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="REPORT" title="Dose Utilisation Heatmap" detail="District utilisation by selected filters." />
          <div className="grid grid-cols-3 gap-2 mb-4">
            {data.map((item) => {
              const style = item.utilisation >= 90 ? bandStyles.healthy : item.utilisation >= 75 ? bandStyles.watch : bandStyles.critical;
              return <div key={item.district} className="p-3 rounded-xl border" style={{ background: style.bg, borderColor: style.border }}><p className="text-xs font-semibold" style={{ color: style.text }}>{item.district}</p><p className="text-lg font-mono" style={{ color: style.text }}>{item.utilisation}%</p></div>;
            })}
          </div>
          <DownloadButtons />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="REPORT" title="Restocking Need Heatmap" detail="Lower days to stock-out needs faster action." />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="district" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="restock" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <DownloadButtons />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="REPORT" title="Data Updation Rate Chart" detail="All-level reporting compliance." />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="district" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="compliance" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <DownloadButtons />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="MASTER REPORT" title="Dose-wise, Farmer-wise, Demographic Breakdown" detail="AI-ready master extract with district, block, LAC, farmer, breed, and service history coverage." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {masterReportItems.map((item) => (
              <div key={item.title} className={`p-3 rounded-xl border ${item.tone}`}>
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet size={17} />
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3 mt-3">
            <div className="p-3 rounded-xl bg-white/70 border border-white/40">
              <p className="text-xs text-slate-500">Utilisation</p>
              <p className="text-xl font-mono text-slate-900">{averageUtilisation}%</p>
            </div>
            <div className="p-3 rounded-xl bg-white/70 border border-white/40">
              <p className="text-xs text-slate-500">Critical</p>
              <p className="text-xl font-mono text-red-700">{criticalDistricts.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/70 border border-white/40">
              <p className="text-xs text-slate-500">RAG Ready</p>
              <p className="text-xl font-mono text-green-700">{ragSources.length}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={downloadMasterCsv} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition-colors">
              <FileDown size={16} /> Excel CSV
            </button>
            <button onClick={shareReport} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 border border-white/40 text-slate-700 text-sm hover:bg-white transition-colors">
              <Share2 size={16} /> Share
            </button>
            <DownloadButtons />
          </div>
        </div>
      </div>
      <div className="hidden glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <SectionHeader eyebrow="AHMS AI CHAT BOT" title="Ask Reports by Text or Voice" detail="Plug-and-play frontend for retrieval-backed semen analytics, graph answers, Excel exports, and shareable summaries." />
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
              <Database size={14} /> RAG connected
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <BrainCircuit size={14} /> API ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-5">
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/70 border border-white/40 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                  <Bot size={22} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">AI Master Report Assistant</p>
                  <p className="text-xs text-slate-500">Answers from district stock, AI service history, demographics, and LAC drilldown context.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <MessageSquare size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={chatQuery}
                    onChange={(event) => setChatQuery(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && answerQuestion()}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ask: Which districts need urgent stock? Show farmer-wise AI history..."
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={startVoiceInput} title="Voice to text" className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${isListening ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                    <Mic size={18} />
                  </button>
                  <button onClick={() => answerQuestion()} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                    <Send size={16} /> Ask AI
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Critical stockout list', 'Dose utilisation performance', 'Farmer-wise AI service history', 'Excel download summary'].map((prompt) => (
                  <button key={prompt} onClick={() => { setChatQuery(prompt); answerQuestion(prompt); }} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs hover:bg-slate-200 transition-colors">
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-green-300" />
                <p className="text-sm font-semibold">AI output</p>
              </div>
              <p className="text-sm leading-6 text-slate-100 mb-4">{chatAnswer}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ragSources.map((source) => (
                  <div key={source.name} className="rounded-xl bg-white/10 border border-white/10 p-3">
                    <p className="text-xs text-slate-300">{source.name}</p>
                    <p className="text-lg font-mono">{formatNumber(source.rows)}</p>
                    <p className="text-xs text-green-200">{source.confidence}% confidence</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/70 border border-white/40">
                <p className="text-xs text-slate-500 mb-1">API endpoint</p>
                <p className="text-sm font-mono text-slate-800">/api/ai/semen-rag</p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 border border-white/40">
                <p className="text-xs text-slate-500 mb-1">Upload sources</p>
                <p className="text-sm text-slate-800 flex items-center gap-2"><UploadCloud size={15} /> PDF, Excel, CSV</p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 border border-white/40">
                <p className="text-xs text-slate-500 mb-1">Export pack</p>
                <p className="text-sm text-slate-800 flex items-center gap-2"><Table2 size={15} /> CSV, PDF, chart</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white/70 border border-white/40 p-4">
              <p className="text-sm font-semibold text-slate-900 mb-3">AI-generated graph answer</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topUtilisation.map((district) => ({ district: district.name, utilisation: Math.round((district.used / district.target) * 100), stock: district.stock }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="utilisation" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="stock" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl bg-white/70 border border-white/40 p-4">
              <p className="text-sm font-semibold text-slate-900 mb-3">Recommended action queue</p>
              <div className="space-y-2">
                {criticalDistricts.slice(0, 5).map((district) => (
                  <div key={district.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{district.name}</p>
                      <p className="text-xs text-slate-500">{district.blocks} blocks · {district.lacs} LACs · {district.lastUpdated}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-red-600 text-white text-xs font-semibold">{district.daysToStockout} days</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={downloadMasterCsv} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition-colors">
                <FileDown size={16} /> Download report
              </button>
              <button onClick={shareReport} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 border border-white/40 text-slate-700 text-sm hover:bg-white transition-colors">
                <Share2 size={16} /> Share summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastingScreen({ districts }: { districts: DistrictSemen[] }) {
  const forecastRows = districts
    .map((district) => ({
      district: district.name,
      projected: Math.round(district.target * (1.12 + (district.daysToStockout && district.daysToStockout < 14 ? 0.18 : 0))),
      current: district.stock,
      recommended: Math.max(0, Math.round(district.target * 1.15 - district.stock)),
      stockout: district.daysToStockout ?? 42,
    }))
    .sort((a, b) => b.recommended - a.recommended)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <SectionHeader eyebrow="" title="ARIMA Demand Forecast" detail="Predicted demand by district for the next 3 months." />
          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#16a34a" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="forecast" stroke="#dc2626" strokeWidth={3} strokeDasharray="6 6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="DEMO CRITICAL" title="Procurement AI Story" detail="Pick Cuttack and explain early ordering." />
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm font-semibold text-red-900">Cuttack: predicted demand spike plus 9 days to stock-out.</p>
            <p className="text-sm text-red-700 mt-2">Auto-raised procurement 2 weeks early for 1,085 doses. This is why we ordered before stock-out.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="FORECAST TABLE" title="District vs Projected Doses Needed" detail="Numerical forecast and optimizer output." />
          <div className="space-y-3">
            {forecastRows.map((row) => (
              <div key={row.district} className="grid grid-cols-4 gap-3 items-center p-3 rounded-xl bg-white/60 border border-white/30 text-sm">
                <span className="font-semibold text-slate-900">{row.district}</span>
                <span className="font-mono text-slate-700">{formatNumber(row.projected)}</span>
                <span className="font-mono text-slate-700">{formatNumber(row.current)}</span>
                <span className="font-mono text-green-700">{formatNumber(row.recommended)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <SectionHeader eyebrow="AI MOMENT" title="Anomaly Alerts" detail="Fraud and duplicate utilisation watch." />
          <div className="space-y-3">
            {anomalyAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm font-semibold text-red-900">{alert.lac}: {alert.doses} doses logged in {alert.window} - verify.</p>
                <p className="text-xs text-red-700 mt-1">{alert.district} district, {alert.time}</p>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm font-semibold text-amber-900">Duplicate dose code found in two LAC submissions.</p>
              <p className="text-xs text-amber-700 mt-1">Queued for supervisor verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SemenDashboard({ screen = 'state', districts, onDistrictsChange, onNavigate }: SemenDashboardProps) {
  const [localDistricts, setLocalDistricts] = useState<DistrictSemen[]>(odishaDistricts);
  const [selectedDistrictName, setSelectedDistrictName] = useState('Cuttack');
  const activeDistricts = districts ?? localDistricts;
  const updateDistricts = onDistrictsChange ?? setLocalDistricts;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <DirectorateShell activeScreen={screen} onNavigate={onNavigate} />
      {screen === 'state' && <StateDashboard districts={activeDistricts} onNavigate={onNavigate} onSelectDistrict={setSelectedDistrictName} />}
      {screen === 'drilldown' && <DistrictDrilldown districts={activeDistricts} selectedDistrictName={selectedDistrictName} onSelectedDistrictChange={setSelectedDistrictName} />}
      {screen === 'allocation' && <AllocationScreen districts={activeDistricts} onDistrictsChange={updateDistricts} />}
      {screen === 'redistribution' && <RedistributionScreen districts={activeDistricts} onDistrictsChange={updateDistricts} />}
      {screen === 'requests' && <RequestManagement />}
      {screen === 'reports' && <ReportsScreen districts={activeDistricts} />}
      {screen === 'forecasting' && <ForecastingScreen districts={activeDistricts} />}
    </motion.div>
  );
}

export function CDVOSemenPortal({ districts = odishaDistricts }: { districts?: DistrictSemen[] }) {
  const [selectedDistrictName, setSelectedDistrictName] = useState('Khordha');
  const [active, setActive] = useState<'dashboard' | 'allocation' | 'approval' | 'restocking' | 'reports'>('dashboard');
  const district = districts.find((item) => item.name === selectedDistrictName) ?? districts[0];
  const blocks = makeBlocks(district);
  const lacs = makeLacs(district);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">CDVO Web Portal</p>
        <h2 className="text-2xl text-slate-900 mb-4">District Semen Operations - {district.name}</h2>
        <div className="flex flex-wrap gap-2">
          {[
            ['dashboard', 'District Dashboard'],
            ['allocation', 'Block Allocation'],
            ['approval', 'Request Approval'],
            ['restocking', 'Restocking Request'],
            ['reports', 'District Reports'],
          ].map(([key, label]) => (
            <button key={key} onClick={() => setActive(key as typeof active)} className={`px-3 py-2 rounded-xl text-sm ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>{label}</button>
          ))}
        </div>
      </div>
      {active === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatTile icon={<Syringe size={20} className="text-green-700" />} label="District total stock" value={formatNumber(district.stock)} detail={getStockBand(getStockRatio(district))} tone="#dcfce7" />
            <StatTile icon={<PackageCheck size={20} className="text-blue-700" />} label="Directorate inventory" value={formatNumber(districts.reduce((sum, item) => sum + item.stock, 0))} detail="Visible above district" tone="#dbeafe" />
            <StatTile icon={<ShieldAlert size={20} className="text-red-700" />} label="Non-reporting blocks" value={String(blocks.filter((item) => !item.reporting).length)} detail="Flagged for follow-up" tone="#fee2e2" />
            <StatTile icon={<AlertTriangle size={20} className="text-amber-700" />} label="Pending block requests" value="5" detail="Awaiting CDVO action" tone="#fef3c7" />
          </div>
          <DistrictDrilldown districts={districts} selectedDistrictName={selectedDistrictName} onSelectedDistrictChange={setSelectedDistrictName}/>
          
          {/* Recent Allocations Card */}
          <div className="glass-card rounded-2xl p-6">
            <SectionHeader eyebrow="ALLOCATION LOG" title="Recent Semen Dose Allocation" detail={`Last 7 days allocation history for ${district.name}`} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">Block</th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">Semen Type</th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">Animal</th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">Quantity</th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">Date & Time</th>
                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allocationHistory.filter((item) => item.district === district.name).slice(0, 5).map((row) => (
                    <tr key={row.id} className="border-b border-white/10 hover:bg-white/30 transition-colors">
                      <td className="py-3 px-4 text-slate-900 font-medium">{row.block}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${row.semenType === 'Normal' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {row.semenType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{row.animalType}</td>
                      <td className="py-3 px-4 font-mono text-slate-900">{formatNumber(row.quantity)}</td>
                      <td className="py-3 px-4 text-slate-700 text-xs">
                        <div>{row.allocatedDate}</div>
                        <div className="text-slate-500">{row.allocatedTime}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          row.status === 'Received' ? 'bg-green-100 text-green-700' :
                          row.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          row.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700">View Full History</button>
              <button className="px-4 py-2 rounded-xl border border-green-600 text-green-700 text-sm font-medium hover:bg-green-50">Export Report</button>
            </div>
          </div>
        </>
      )}
      {active === 'allocation' && <BlockAllocation blocks={blocks} />}
      {active === 'approval' && <BlockRequestApproval />}
      {active === 'restocking' && <RestockingRequestForm district={district} />}
      {active === 'reports' && <ReportsScreen districts={[district, ...districts.slice(1, 8)]} />}
      <div className="glass-card rounded-2xl p-6">
        <SectionHeader eyebrow="LAC BREAKDOWN" title="LAC-wise Inventory Snapshot" detail="Quick district view for CDVO monitoring." />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {lacs.slice(0, 8).map((lac) => <div key={lac.name} className="p-3 rounded-xl bg-white/60 border border-white/30"><p className="text-sm text-slate-900">{lac.name}</p><p className="font-mono text-green-700">{formatNumber(lac.stock)}</p></div>)}
        </div>
      </div>
    </motion.div>
  );
}

function BlockAllocation({ blocks }: { blocks: ReturnType<typeof makeBlocks> }) {
  const [block, setBlock] = useState(blocks[0]?.name ?? '');
  const [type, setType] = useState('Normal');
  const [quantity, setQuantity] = useState(120);
  const [pickupSlot, setPickupSlot] = useState('2026-05-25T11:00');
  const [message, setMessage] = useState<string | null>(null);
  const [rows, setRows] = useState<Array<{ id: string; block: string; type: string; quantity: number; pickupSlot: string; status: 'Allocated' | 'In Transit' | 'Delivered' }>>([
    { id: 'ALLOC-001', block: 'Khordha Block 1', type: 'Normal', quantity: 120, pickupSlot: '2026-05-25 11:00', status: 'Allocated' },
    { id: 'ALLOC-002', block: 'Khordha Block 3', type: 'Sex Sorted', quantity: 80, pickupSlot: '2026-05-24 15:30', status: 'In Transit' },
    { id: 'ALLOC-003', block: 'Khordha Block 5', type: 'Normal', quantity: 140, pickupSlot: '2026-05-23 10:00', status: 'Delivered' },
  ]);

  const submitAllocation = () => {
    const newRow = {
      id: `ALLOC-${String(rows.length + 1).padStart(3, '0')}`,
      block,
      type,
      quantity,
      pickupSlot: pickupSlot.replace('T', ' '),
      status: 'Allocated' as const,
    };
    setRows((current) => [newRow, ...current]);
    setMessage(`${formatNumber(quantity)} doses allocated to ${block} and added to allocation history.`);
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <div>
        <SectionHeader eyebrow="" title="Block Allocation Screen" detail="Select block, type, quantity, pickup slot, and redistribute between blocks." />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <select value={block} onChange={(event) => setBlock(event.target.value)} className="px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 text-slate-900">{blocks.map((item) => <option key={item.name}>{item.name}</option>)}</select>
          <select value={type} onChange={(event) => setType(event.target.value)} className="px-4 py-2.5 rounded-xl bg-white/70 border border-green/30 text-slate-900"><option>Normal</option><option>Sex Sorted</option></select>
          <input type="number" value={quantity} min={1} onChange={(event) => setQuantity(Number(event.target.value))} className="px-4 py-2.5 rounded-xl bg-white/70 border border-green/30 text-slate-900" />
          <input type="datetime-local" value={pickupSlot} onChange={(event) => setPickupSlot(event.target.value)} className="px-4 py-2.5 rounded-xl bg-white/70 border border-green/30 text-slate-900" />
        </div>
        <button onClick={submitAllocation} className="mt-5 px-8 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all">Submit Block Allocation</button>
        {message && <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{message}</div>}
      </div>

      <div className="glass-card rounded-2xl p-6 bg-white/80 border border-white/40">
        <SectionHeader eyebrow="ALLOCATION HISTORY" title="Allocated Blocks" detail="Recent block allocations for this district." />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold">Allocation ID</th>
                <th className="py-3 px-4 font-semibold">Block</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Pickup Slot</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-slate-900">{row.id}</td>
                  <td className="py-3 px-4 text-slate-900">{row.block}</td>
                  <td className="py-3 px-4 text-slate-700">{row.type}</td>
                  <td className="py-3 px-4 font-mono text-slate-900">{formatNumber(row.quantity)}</td>
                  <td className="py-3 px-4 text-slate-700">{row.pickupSlot}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${row.status === 'Delivered' ? 'bg-green-100 text-green-700' : row.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BlockRequestApproval() {
  const [rows, setRows] = useState([
    { id: 'SDVO-RQ-001', block: 'Khordha Block 2', type: 'Normal', quantity: 140, urgency: 'high', status: 'Pending' },
    { id: 'SDVO-RQ-002', block: 'Khordha Block 5', type: 'Sex Sorted', quantity: 80, urgency: 'medium', status: 'Pending' },
    { id: 'SDVO-RQ-003', block: 'Khordha Block 8', type: 'Normal', quantity: 220, urgency: 'critical', status: 'Pending' },
  ]);
  const [message, setMessage] = useState<{ type: 'success' | 'alert'; text: string } | null>(null);

  const handleAction = (id: string, action: 'Approved' | 'Rejected' | 'Forwarded') => {
    const selected = rows.find((row) => row.id === id);
    setRows((items) => items.map((row) => (row.id === id ? { ...row, status: action } : row)));

    if (action === 'Approved') {
      setMessage({ type: 'success', text: `${selected?.block} approved. SDVO stock reservation completed and block notified.` });
    } else if (action === 'Rejected') {
      setMessage({ type: 'alert', text: `${selected?.block} request rejected. Rejection note sent to block inventory desk.` });
    } else {
      setMessage({ type: 'success', text: `${selected?.block} forwarded to Directorate for higher-level allocation approval.` });
    }
  };

  const statusClass: Record<string, string> = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Approved: 'bg-green-50 text-green-700 border-green-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
    Forwarded: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const urgencyClass: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-amber-100 text-amber-700',
  };

  const actionStyles = [
    { label: 'Approve', status: 'Approved' as const, className: 'bg-green-600 text-white hover:bg-green-700' },
    { label: 'Reject', status: 'Rejected' as const, className: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100' },
    { label: 'Forward to Directorate', status: 'Forwarded' as const, className: 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <SectionHeader eyebrow="" title="Restocking Request Approval: Block -> District" detail="Edit, approve, reject, or forward to Directorate with one click." />
        <div className="text-right">
          <p className="text-xs text-slate-500">Pending requests</p>
          <p className="text-2xl font-mono text-slate-900">{rows.filter((row) => row.status === 'Pending').length}</p>
        </div>
      </div>
      {message && (
        <div className={`mb-4 flex items-start justify-between gap-3 rounded-xl border p-4 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          <div className="flex items-start gap-2">
            {message.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" /> : <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs font-semibold opacity-80 hover:opacity-100">Close</button>
        </div>
      )}
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl bg-white/70 border border-white/40 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-900">{row.block}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${urgencyClass[row.urgency]}`}>{row.urgency}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusClass[row.status]}`}>{row.status}</span>
                </div>
                <p className="text-xs text-slate-600">{row.type}, {row.quantity} doses, request ID {row.id}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {actionStyles.map((action) => (
                  <button
                    key={action.status}
                    onClick={() => handleAction(row.id, action.status)}
                    disabled={row.status === action.status}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${action.className}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestockingRequestForm({ district }: { district: DistrictSemen }) {
  const [requests, setRequests] = useState<Array<{ id: string; block: string; semenType: string; animalType: string; quantity: number; urgency: 'low' | 'medium' | 'high' | 'critical'; justification: string; submittedDate: string; status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' }>>([
    { id: 'RESTOCK-001', block: 'Block 1', semenType: 'Normal', animalType: 'Cattle', quantity: 300, urgency: 'high', justification: 'Stock depleting faster than anticipated', submittedDate: '2026-05-24', status: 'Submitted' },
    { id: 'RESTOCK-002', block: 'Block 3', semenType: 'Sex Sorted', animalType: 'Cattle', quantity: 150, urgency: 'medium', justification: 'Seasonal demand increase', submittedDate: '2026-05-23', status: 'Approved' },
  ]);
  const [formData, setFormData] = useState({ block: 'Block 1', semenType: 'Normal', animalType: 'Cattle', quantity: 200, urgency: 'medium', justification: '' });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: `RESTOCK-${String(requests.length + 1).padStart(3, '0')}`,
      ...formData,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Draft' as const,
    };
    setRequests([newRequest, ...requests]);
    setMessage({ type: 'success', text: `Restocking request submitted to Directorate. Request ID: ${newRequest.id}` });
    setFormData({ block: 'Block 1', semenType: 'Normal', animalType: 'Cattle', quantity: 200, urgency: 'medium', justification: '' });
  };

  const urgencyColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const statusColors: Record<string, string> = {
    Draft: 'bg-slate-100 text-slate-700 border-slate-200',
    Submitted: 'bg-blue-100 text-blue-700 border-blue-200',
    Approved: 'bg-green-100 text-green-700 border-green-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <SectionHeader eyebrow="" title="Raise Restocking Request" detail="Submit semen restocking requests to Directorate for review and approval." />
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Block</label>
              <select
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Array.from({ length: Math.min(district.blocks, 10) }, (_, i) => `Block ${i + 1}`).map((block) => (
                  <option key={block}>{block}</option>
                ))}
              </select>
              <p className="text-xs text-slate-600 mt-1">Select the block requiring stock</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Semen Type</label>
              <select
                value={formData.semenType}
                onChange={(e) => setFormData({ ...formData, semenType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Normal</option>
                <option>Sex Sorted</option>
              </select>
              <p className="text-xs text-slate-600 mt-1">Type of semen doses needed</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Animal Type</label>
              <select
                value={formData.animalType}
                onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Cattle</option>
                <option>Buffalo</option>
                <option>Mixed</option>
              </select>
              <p className="text-xs text-slate-600 mt-1">Breed type</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Quantity (doses)</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-slate-600 mt-1">Number of semen doses required</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Urgency Level</label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value as 'low' | 'medium' | 'high' | 'critical' })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="low">Low - Routine replenishment</option>
                <option value="medium">Medium - Moderate demand</option>
                <option value="high">High - Urgent requirement</option>
                <option value="critical">Critical - Immediate need</option>
              </select>
              <p className="text-xs text-slate-600 mt-1">Priority level for approval</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Justification</label>
              <textarea
                value={formData.justification}
                onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                placeholder="Explain why this restocking is needed (e.g., seasonal demand, higher AI activity, stock depleting faster than expected)"
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-slate-600 mt-1">Provide context for the request</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Send size={18} />
              Submit Request to Directorate
            </button>
            <button
              type="button"
              onClick={() => setFormData({ block: 'Block 1', semenType: 'Normal', animalType: 'Cattle', quantity: 200, urgency: 'medium', justification: '' })}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              {message.type === 'success' ? <CheckCircle2 size={20} className="text-green-700 flex-shrink-0 mt-0.5" /> : <AlertTriangle size={20} className="text-red-700 flex-shrink-0 mt-0.5" />}
              <p className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message.text}</p>
            </div>
          )}
        </form>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader eyebrow="" title="Restocking Request History" detail={`All requests from ${district.name} district`} />
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">{requests.length} requests</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Request ID</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Block</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Type & Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Urgency</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Submitted</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-slate-900">{req.id}</td>
                  <td className="py-3 px-4 text-slate-900">{req.block}</td>
                  <td className="py-3 px-4 text-slate-700">{req.semenType} - {req.animalType} ({formatNumber(req.quantity)} doses)</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${urgencyColors[req.urgency]}`}>
                      {req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{req.submittedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[req.status]}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function SDVOSemenPortal({ districts = odishaDistricts }: { districts?: DistrictSemen[] }) {
  const district = districts.find((item) => item.name === 'Puri') ?? districts[0];
  const blocks = makeBlocks(district).slice(0, 5);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">SDVO / Deputy Director Web Portal</p>
        <h2 className="text-2xl text-slate-900 mb-1">SDVO Inventory View</h2>
        <p className="text-sm text-slate-600">SDVO-level stock summary with blocks under jurisdiction and forwarding workflow.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatTile icon={<Syringe size={20} className="text-green-700" />} label="SDVO stock summary" value={formatNumber(district.stock)} detail={`${district.name} subdivision`} tone="#dcfce7" />
        <StatTile icon={<Map size={20} className="text-blue-700" />} label="Blocks under SDVO" value={String(blocks.length)} detail="Jurisdiction mapped" tone="#dbeafe" />
        <StatTile icon={<Send size={20} className="text-amber-700" />} label="Requests to forward" value="3" detail="Block to district" tone="#fef3c7" />
      </div>
      <BlockRequestApproval />
    </motion.div>
  );
}
