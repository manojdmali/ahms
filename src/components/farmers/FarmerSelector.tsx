import { useState, useEffect } from 'react';
import { Search, User, MapPin, Phone } from 'lucide-react';
import { farmersData, Farmer } from '../../data/farmersData';

interface FarmerSelectorProps {
  onSelect: (farmer: Farmer) => void;
  selectedFarmerId?: string;
  placeholder?: string;
}

export function FarmerSelector({ onSelect, selectedFarmerId, placeholder = "Search farmer by name, ID, or phone" }: FarmerSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  // Use the imported farmers data
  const farmers = farmersData;

  useEffect(() => {
    if (selectedFarmerId) {
      const farmer = farmers.find(f => f.id === selectedFarmerId);
      if (farmer) {
        setSelectedFarmer(farmer);
        setSearchQuery(farmer.name);
      }
    }
  }, [selectedFarmerId]);

  const filteredFarmers = farmers.filter(farmer => {
    const query = searchQuery.toLowerCase();
    return (
      farmer.name.toLowerCase().includes(query) ||
      farmer.farmerId.toLowerCase().includes(query) ||
      farmer.contact.includes(query) ||
      farmer.address.village.toLowerCase().includes(query)
    );
  });

  const handleSelect = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setSearchQuery(farmer.name);
    setIsOpen(false);
    onSelect(farmer);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Dropdown */}
      {isOpen && searchQuery && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-2 max-h-80 overflow-y-auto bg-white/95 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl">
            {filteredFarmers.length > 0 ? (
              filteredFarmers.slice(0, 8).map((farmer) => (
                <button
                  key={farmer.id}
                  onClick={() => handleSelect(farmer)}
                  className="w-full px-4 py-3 hover:bg-green-50 transition-all text-left border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center flex-shrink-0">
                      <User className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-slate-900 font-medium">{farmer.name}</p>
                        <span className="text-xs text-slate-500 font-mono">{farmer.farmerId}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-odia mb-1">{farmer.nameOdia}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {farmer.address.village}, {farmer.address.block}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {farmer.contact}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-slate-500">
                <p className="text-sm">No farmers found</p>
                <p className="text-xs mt-1">Try searching by name, ID, or phone number</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Selected Farmer Display */}
      {selectedFarmer && !isOpen && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center flex-shrink-0">
              <User className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-slate-900 font-medium">{selectedFarmer.name}</p>
                <span className="text-xs text-slate-500 font-mono">{selectedFarmer.farmerId}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {selectedFarmer.address.village}, {selectedFarmer.address.block}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} />
                  {selectedFarmer.contact}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Total Livestock: {selectedFarmer.totalLivestock} animals
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}