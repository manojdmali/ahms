import { useState } from 'react';
import { FlaskConical, Package, AlertTriangle, TrendingUp, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface SemenStock {
  id: string;
  bullBreed: string;
  bullId: string;
  batchNumber: string;
  quantity: number;
  source: string;
  expiryDate: Date;
  location: string;
  quality: 'Excellent' | 'Good' | 'Fair';
  status: 'available' | 'low-stock' | 'expired';
}

export function SemenInventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');

  const semenStocks: SemenStock[] = [
    {
      id: '1',
      bullBreed: 'Holstein Friesian',
      bullId: 'HF-2341',
      batchNumber: 'HF-2024-1234',
      quantity: 450,
      source: 'NDDB Sabarmati',
      expiryDate: new Date(2025, 11, 30),
      location: 'Cold Storage A',
      quality: 'Excellent',
      status: 'available'
    },
    {
      id: '2',
      bullBreed: 'Jersey',
      bullId: 'JR-1876',
      batchNumber: 'JR-2024-0987',
      quantity: 280,
      source: 'BAIF Foundation',
      expiryDate: new Date(2025, 10, 15),
      location: 'Cold Storage A',
      quality: 'Excellent',
      status: 'available'
    },
    {
      id: '3',
      bullBreed: 'Murrah Buffalo',
      bullId: 'MB-3421',
      batchNumber: 'MB-2024-5678',
      quantity: 85,
      source: 'Central Frozen Semen',
      expiryDate: new Date(2025, 9, 20),
      location: 'Cold Storage B',
      quality: 'Good',
      status: 'low-stock'
    },
    {
      id: '4',
      bullBreed: 'Sahiwal',
      bullId: 'SH-2109',
      batchNumber: 'SH-2024-3456',
      quantity: 320,
      source: 'State Cattle Farm',
      expiryDate: new Date(2026, 0, 10),
      location: 'Cold Storage B',
      quality: 'Excellent',
      status: 'available'
    },
    {
      id: '5',
      bullBreed: 'Gir',
      bullId: 'GR-1654',
      batchNumber: 'GR-2024-7890',
      quantity: 65,
      source: 'BAIF Foundation',
      expiryDate: new Date(2025, 8, 5),
      location: 'Cold Storage A',
      quality: 'Good',
      status: 'low-stock'
    },
    {
      id: '6',
      bullBreed: 'HF Cross',
      bullId: 'HFC-2987',
      batchNumber: 'HFC-2024-2468',
      quantity: 510,
      source: 'Odisha Livestock Dev',
      expiryDate: new Date(2026, 1, 28),
      location: 'Cold Storage A',
      quality: 'Excellent',
      status: 'available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'low-stock':
        return 'bg-amber-100 text-amber-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-blue-600';
      case 'Fair':
        return 'text-amber-600';
      default:
        return 'text-slate-600';
    }
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalStock = semenStocks.reduce((sum, stock) => sum + stock.quantity, 0);
  const lowStockCount = semenStocks.filter(s => s.status === 'low-stock').length;
  const uniqueBreeds = Array.from(new Set(semenStocks.map(s => s.bullBreed)));

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-800 mb-1">Semen Inventory</h3>
          <p className="text-sm text-slate-600 font-odia">ବୀଜ ଭଣ୍ଡାର</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all text-sm flex items-center gap-2">
          <Package size={16} />
          Add New Stock
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white/50 border border-white/30">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="text-purple-600" size={20} />
            <span className="text-sm text-slate-600">Total Doses</span>
          </div>
          <p className="text-slate-900 font-mono">{totalStock}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/50 border border-white/30">
          <div className="flex items-center gap-2 mb-2">
            <Package className="text-blue-600" size={20} />
            <span className="text-sm text-slate-600">Bull Breeds</span>
          </div>
          <p className="text-slate-900 font-mono">{uniqueBreeds.length}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/50 border border-white/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-amber-600" size={20} />
            <span className="text-sm text-slate-600">Low Stock</span>
          </div>
          <p className="text-slate-900 font-mono">{lowStockCount}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/50 border border-white/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-sm text-slate-600">This Month</span>
          </div>
          <p className="text-slate-900 font-mono">234 used</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by breed, batch number, or bull ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Breeds</option>
          {uniqueBreeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white/50 rounded-xl overflow-hidden border border-white/30">
        <table className="w-full">
          <thead className="bg-white/70 border-b border-white/30">
            <tr>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Bull Breed</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Bull ID</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Batch Number</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Quantity</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Source</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Expiry</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Quality</th>
              <th className="text-left px-4 py-3 text-sm text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {semenStocks.map((stock, index) => {
              const daysUntilExpiry = getDaysUntilExpiry(stock.expiryDate);
              const isExpiringSoon = daysUntilExpiry <= 60;

              return (
                <motion.tr
                  key={stock.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/20 hover:bg-white/30 transition-all"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">
                        {stock.bullBreed.substring(0, 2)}
                      </div>
                      <span className="text-sm text-slate-900">{stock.bullBreed}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-slate-700">{stock.bullId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-slate-700">{stock.batchNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-mono ${
                      stock.quantity < 100 ? 'text-red-600' : 'text-slate-900'
                    }`}>
                      {stock.quantity} doses
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600">{stock.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={`text-sm ${isExpiringSoon ? 'text-red-600' : 'text-slate-700'}`}>
                        {stock.expiryDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        {daysUntilExpiry} days left
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${getQualityColor(stock.quality)}`}>
                      {stock.quality}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(stock.status)}`}>
                      {stock.status === 'low-stock' ? 'Low Stock' : stock.status}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Low Stock Alerts */}
      {lowStockCount > 0 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">
              Low Stock Alert
            </p>
            <p className="text-sm text-amber-700">
              {lowStockCount} breed(s) have low stock levels. Consider reordering to maintain adequate inventory.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
