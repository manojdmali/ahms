import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MedicineRequisition } from '../data/medicineMvuData';
import { formatDisplayDate } from '../utils/dateFormat';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  Search, 
  Filter,
  Clock,
  PackageCheck,
  Building,
  Calendar,
  Syringe,
  MessageSquare,
  Info
} from 'lucide-react';

interface BlockAllocationRecord {
  id: string;
  recipientType: 'LAC' | 'AIT';
  recipientName: string;
  block: string;
  district: string;
  semenType: 'Normal' | 'Sex Sorted';
  quantity: number;
  allocatedAt: string;
  status: 'Allocated' | 'In Transit' | 'Delivered';
}


interface BVOMedicineQueueProps {
  requisitions: MedicineRequisition[];
  onUpdateStatus?: (id: string, status: MedicineRequisition['status']) => void;
}

export default function BVOMedicineQueue({ requisitions, onUpdateStatus }: BVOMedicineQueueProps) {
  const [selectedReq, setSelectedReq] = useState<MedicineRequisition | null>(null);
  const [filter, setFilter] = useState<'All' | 'P0' | 'P1' | 'P2' | 'P3'>('All');
  const [search, setSearch] = useState('');
  
  // Enhancement states
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [allocationSearch, setAllocationSearch] = useState('');
  const [allocationRecipientType, setAllocationRecipientType] = useState<'LAC' | 'AIT'>('LAC');
  const [allocationRecipientName, setAllocationRecipientName] = useState('Khordha LAC-1');
  const [allocationBlock, setAllocationBlock] = useState('Khordha Block 2');
  const [allocationDistrict, setAllocationDistrict] = useState('Khordha');
  const [allocationSemenType, setAllocationSemenType] = useState<'Normal' | 'Sex Sorted'>('Normal');
  const [allocationQuantity, setAllocationQuantity] = useState(50);
  const [recentAllocations, setRecentAllocations] = useState<BlockAllocationRecord[]>([
    { id: 'ALOC-1001', recipientType: 'LAC', recipientName: 'Khordha LAC-1', block: 'Khordha Block 2', district: 'Khordha', semenType: 'Normal', quantity: 180, allocatedAt: '2026-05-24 13:15', status: 'Delivered' },
    { id: 'ALOC-1002', recipientType: 'AIT', recipientName: 'Balasore AIT-1', block: 'Khordha Block 5', district: 'Khordha', semenType: 'Sex Sorted', quantity: 120, allocatedAt: '2026-05-24 09:30', status: 'In Transit' },
    { id: 'ALOC-1003', recipientType: 'LAC', recipientName: 'Cuttack LAC-4', block: 'Cuttack Block 4', district: 'Cuttack', semenType: 'Normal', quantity: 200, allocatedAt: '2026-05-23 17:20', status: 'Delivered' },
    { id: 'ALOC-1004', recipientType: 'AIT', recipientName: 'Ganjam AIT-2', block: 'Ganjam Block 1', district: 'Ganjam', semenType: 'Normal', quantity: 150, allocatedAt: '2026-05-23 11:05', status: 'Allocated' },
    { id: 'ALOC-1005', recipientType: 'LAC', recipientName: 'Balasore LAC-2', block: 'Balasore Block 6', district: 'Balasore', semenType: 'Sex Sorted', quantity: 90, allocatedAt: '2026-05-22 15:40', status: 'In Transit' },
  ]);
  const allocationLacRecipients = ['Khordha LAC-1', 'Khordha LAC-2', 'Cuttack LAC-4', 'Balasore LAC-2', 'Ganjam LAC-3'];
  const allocationAitRecipients = ['Balasore AIT-1', 'Sambalpur AIT-2', 'Cuttack AIT-1'];
  const allocationRecipients = allocationRecipientType === 'LAC' ? allocationLacRecipients : allocationAitRecipients;
  const allocationBlocks = ['Khordha Block 2', 'Khordha Block 5', 'Cuttack Block 4', 'Ganjam Block 1', 'Balasore Block 6'];
  const allocationDistricts = ['Khordha', 'Cuttack', 'Ganjam', 'Balasore'];

  const filteredAllocations = useMemo(() => {
    return recentAllocations.filter((item) =>
      item.block.toLowerCase().includes(allocationSearch.toLowerCase()) ||
      item.district.toLowerCase().includes(allocationSearch.toLowerCase()) ||
      item.semenType.toLowerCase().includes(allocationSearch.toLowerCase()) ||
      item.status.toLowerCase().includes(allocationSearch.toLowerCase()) ||
      item.recipientName.toLowerCase().includes(allocationSearch.toLowerCase()) ||
      item.recipientType.toLowerCase().includes(allocationSearch.toLowerCase())
    );
  }, [allocationSearch, recentAllocations]);

  const handleAllocateDose = () => {
    if (!allocationRecipientName || allocationQuantity <= 0) {
      setToast({ message: 'Please select a recipient and enter a valid quantity.', type: 'error' });
      return;
    }

    const newAllocation: BlockAllocationRecord = {
      id: `ALOC-${Math.floor(1000 + Math.random() * 9000)}`,
      recipientType: allocationRecipientType,
      recipientName: allocationRecipientName,
      block: allocationBlock,
      district: allocationDistrict,
      semenType: allocationSemenType,
      quantity: allocationQuantity,
      allocatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Allocated',
    };

    setRecentAllocations((prev) => [newAllocation, ...prev]);
    setToast({ message: `${allocationQuantity} doses allocated to ${allocationRecipientName}`, type: 'success' });
    setAllocationQuantity(0);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredRequisitions = useMemo(() => {
    return requisitions.filter(req => {
      const matchesFilter = filter === 'All' || req.urgency === filter;
      const matchesSearch = req.medicine.toLowerCase().includes(search.toLowerCase()) || 
                            req.source.toLowerCase().includes(search.toLowerCase()) ||
                            req.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }).sort((a, b) => {
      if (a.urgency === 'P0' && b.urgency !== 'P0') return -1;
      if (a.urgency !== 'P0' && b.urgency === 'P0') return 1;
      return 0;
    });
  }, [requisitions, filter, search]);

  const stats = useMemo(() => {
    return {
      total: requisitions.length,
      pending: requisitions.filter(r => r.status === 'Pending').length,
      urgent: requisitions.filter(r => r.urgency === 'P0' && r.status === 'Pending').length,
      approved: requisitions.filter(r => r.status === 'Approved').length,
    };
  }, [requisitions]);

  const handleApprove = () => {
    if (selectedReq && onUpdateStatus) {
      onUpdateStatus(selectedReq.id, 'Approved');
      setToast({ message: `Requisition ${selectedReq.id} approved successfully. Stock allocated.`, type: 'success' });
      setSelectedReq(null);
    }
  };

  const handleRejectConfirm = () => {
    if (selectedReq && onUpdateStatus) {
      // In a real app we'd save the reject reason to the backend
      onUpdateStatus(selectedReq.id, 'Rejected');
      setToast({ message: `Requisition ${selectedReq.id} rejected.`, type: 'error' });
      setIsRejecting(false);
      setRejectReason('');
      setSelectedReq(null);
    }
  };

  const handleBack = () => {
    setSelectedReq(null);
    setIsRejecting(false);
    setRejectReason('');
  };

  if (selectedReq) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto relative">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className={`absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 border ${
                toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Queue</span>
        </button>

        <div className="glass-card rounded-2xl p-8 shadow-lg bg-white/60">
          <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">Requisition Details</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedReq.urgency === 'P0' ? 'bg-red-100 text-red-700 border border-red-200' : 
                  'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {selectedReq.urgency} Priority
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedReq.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                  selectedReq.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                  selectedReq.status === 'Rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                  'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {selectedReq.status}
                </span>
              </div>
              <p className="text-slate-500 flex items-center gap-2">
                <PackageCheck size={16} /> Request ID: {selectedReq.id}
              </p>
            </div>
            {selectedReq.urgency === 'P0' && selectedReq.status === 'Pending' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200 shadow-sm">
                <AlertTriangle size={20} className="animate-pulse" />
                <span className="font-semibold text-sm">Action Required Immediately</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-white/80 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Syringe size={18} /></div>
                <span className="font-medium text-sm">Requested Medicine</span>
              </div>
              <p className="text-xl font-bold text-slate-900 mt-2">{selectedReq.medicine}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-500">Quantity Required</span>
                <span className="font-semibold text-lg text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{selectedReq.quantity} units</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/80 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Building size={18} /></div>
                <span className="font-medium text-sm">Requesting Center</span>
              </div>
              <p className="text-xl font-bold text-slate-900 mt-2">{selectedReq.source}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-500">Submitted On</span>
                <div className="flex items-center gap-2 font-medium text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
                  <Calendar size={14} className="text-slate-500" />
                  <span>{formatDisplayDate(selectedReq.submittedAt)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 mb-8 flex gap-4">
            <div className="mt-1 text-slate-400"><Info size={24} /></div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Inventory Check (Simulated)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Current stock for <strong>{selectedReq.medicine}</strong> at the block warehouse is sufficient to fulfill this request. Approving will automatically deduct the required quantity from the central inventory and dispatch it to the requesting center.
              </p>
            </div>
          </div>

          {selectedReq.status === 'Pending' && !isRejecting && (
            <div className="flex gap-4 pt-4 border-t border-slate-200/60 mt-4">
              <button 
                onClick={handleApprove}
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm button-press"
              >
                <CheckCircle size={20} />
                Approve & Allocate Stock
              </button>
              <button 
                onClick={() => setIsRejecting(true)}
                className="flex-1 py-3 px-4 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 button-press"
              >
                <XCircle size={20} />
                Reject Request...
              </button>
            </div>
          )}

          {isRejecting && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-5 rounded-xl border border-red-200 bg-red-50/50">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <MessageSquare size={18} /> Reason for Rejection
              </h4>
              <textarea 
                className="w-full p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-white"
                rows={3}
                placeholder="Please provide a reason to notify the LAC..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  onClick={() => setIsRejecting(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRejectConfirm}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <XCircle size={16} /> Confirm Rejection
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl mx-auto relative">
      {/* Toast Notification for list view */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 border ${
              toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-semibold text-green-700 mb-1 uppercase tracking-wider">BVO Web Portal</p>
          <h2 className="text-3xl font-bold text-slate-900">Medicine Requisition Approval Queue</h2>
          <p className="text-slate-600 mt-2 text-lg">Review and manage incoming medicine requests from LACs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Requests</p>
          <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-sm border-l-4 border-amber-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Approval</p>
          <p className="text-3xl font-bold text-slate-800">{stats.pending}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-sm border-l-4 border-red-500">
          <p className="text-sm font-medium text-slate-500 mb-1">P0 Urgent Requests</p>
          <p className="text-3xl font-bold text-red-600 flex items-center gap-2">
            {stats.urgent}
            {stats.urgent > 0 && <AlertTriangle size={20} className="animate-pulse" />}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-sm border-l-4 border-green-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Approved Today</p>
          <p className="text-3xl font-bold text-slate-800">{stats.approved}</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 bg-white/50">
        <div className="p-4 border-b border-slate-200/60 bg-white/40 flex gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-slate-400" />
            <div className="flex gap-2">
              {['All', 'P0', 'P1', 'P2', 'P3'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === f 
                      ? f === 'P0' ? 'bg-red-100 text-red-700' : 'bg-slate-800 text-white' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {f === 'All' ? 'All Priorities' : f}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, medicine, source..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredRequisitions.length > 0 ? (
            filteredRequisitions.map((req) => (
              <div 
                key={req.id} 
                onClick={() => setSelectedReq(req)}
                className={`p-4 hover:bg-white transition-colors cursor-pointer group flex items-center justify-between
                  ${req.urgency === 'P0' && req.status === 'Pending' ? 'bg-red-50/50 hover:bg-red-50' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border
                    ${req.urgency === 'P0' ? 'bg-red-100 border-red-200 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-600'}
                  `}>
                    <PackageCheck size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900 text-lg group-hover:text-green-700 transition-colors">
                        {req.medicine}
                      </p>
                      {req.urgency === 'P0' && req.status === 'Pending' && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
                          <AlertTriangle size={12} /> Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Building size={14} /> {req.source}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {formatDisplayDate(req.submittedAt)}</span>
                      <span className="text-slate-400">ID: {req.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Quantity</p>
                    <p className="font-semibold text-slate-900">{req.quantity} units</p>
                  </div>
                  <div className="w-24 text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-500">
              <PackageCheck size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium text-slate-900 mb-1">No requisitions found</p>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200/70 bg-slate-50">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Semen Dose Allocation</p>
            <h3 className="text-xl font-bold text-slate-900">Allocate to LAC / AIT</h3>
          </div>
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search allocations by recipient, block, district or status..."
              value={allocationSearch}
              onChange={(e) => setAllocationSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-sm border border-slate-200/70 p-5 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h4 className="text-lg font-semibold text-slate-900 flex-1">Allocate Semen Dose</h4>
            <span className="text-sm text-slate-500">Assign doses directly to a LAC or AIT.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAllocationRecipientType('LAC');
                  setAllocationRecipientName(allocationLacRecipients[0]);
                }}
                className={`flex-1 py-2 rounded-xl border font-medium transition ${allocationRecipientType === 'LAC' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
              >
                LAC
              </button>
              <button
                type="button"
                onClick={() => {
                  setAllocationRecipientType('AIT');
                  setAllocationRecipientName(allocationAitRecipients[0]);
                }}
                className={`flex-1 py-2 rounded-xl border font-medium transition ${allocationRecipientType === 'AIT' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
              >
                AIT
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Recipient</label>
              <select
                value={allocationRecipientName}
                onChange={(e) => setAllocationRecipientName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                {allocationRecipients.map((recipient) => (
                  <option key={recipient} value={recipient}>{recipient}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">District</label>
              <select
                value={allocationDistrict}
                onChange={(e) => setAllocationDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                {allocationDistricts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Block</label>
              <select
                value={allocationBlock}
                onChange={(e) => setAllocationBlock(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                {allocationBlocks.map((block) => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Semen Type</label>
              <select
                value={allocationSemenType}
                onChange={(e) => setAllocationSemenType(e.target.value as 'Normal' | 'Sex Sorted')}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                <option value="Normal">Normal</option>
                <option value="Sex Sorted">Sex Sorted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
              <input
                type="number"
                min={1}
                value={allocationQuantity}
                onChange={(e) => setAllocationQuantity(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAllocateDose}
                className="w-full py-3 rounded-2xl bg-green-600 text-white font-semibold shadow-sm hover:bg-green-700 transition-colors"
              >
                Allocate Dose
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold">Allocation ID</th>
                <th className="py-3 px-4 font-semibold">Recipient</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Block</th>
                <th className="py-3 px-4 font-semibold">District</th>
                <th className="py-3 px-4 font-semibold">Semen Type</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Allocated At</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllocations.map((record) => (
                <tr key={record.id} className="border-b border-slate-100 hover:bg-white transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-900">{record.id}</td>
                  <td className="py-3 px-4 text-slate-900">{record.recipientName}</td>
                  <td className="py-3 px-4 text-slate-700">{record.recipientType}</td>
                  <td className="py-3 px-4 text-slate-900">{record.block}</td>
                  <td className="py-3 px-4 text-slate-700">{record.district}</td>
                  <td className="py-3 px-4 text-slate-700">{record.semenType}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{record.quantity}</td>
                  <td className="py-3 px-4 text-slate-600">{record.allocatedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      record.status === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                      record.status === 'In Transit' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}