import { createContext, useContext, useState, ReactNode } from 'react';

export interface District {
  id: string;
  name: string;
}

export const ALL_DISTRICTS: District[] = [
  { id: 'all',  name: 'All Districts' },
  { id: 'KHD', name: 'Khordha' },
  { id: 'CTK', name: 'Cuttack' },
  { id: 'PRI', name: 'Puri' },
  { id: 'BLS', name: 'Balasore' },
  { id: 'BDK', name: 'Bhadrak' },
  { id: 'JJP', name: 'Jajapur' },
  { id: 'KNJ', name: 'Kendrapara' },
  { id: 'JGS', name: 'Jagatsinghpur' },
  { id: 'GNJ', name: 'Ganjam' },
  { id: 'GJP', name: 'Gajapati' },
  { id: 'KLH', name: 'Kalahandi' },
  { id: 'NWR', name: 'Nuapada' },
  { id: 'BRG', name: 'Bargarh' },
  { id: 'SBP', name: 'Sambalpur' },
  { id: 'DWR', name: 'Deogarh' },
  { id: 'SND', name: 'Sundargarh' },
  { id: 'KBJ', name: 'Keonjhar' },
  { id: 'MYB', name: 'Mayurbhanj' },
  { id: 'ANL', name: 'Angul' },
  { id: 'DBG', name: 'Dhenkanal' },
  { id: 'BLP', name: 'Bolangir' },
  { id: 'SBR', name: 'Subarnapur' },
  { id: 'KPT', name: 'Kandhamal' },
  { id: 'BPT', name: 'Boudh' },
  { id: 'NBS', name: 'Nayagarh' },
  { id: 'KPR', name: 'Koraput' },
  { id: 'NWG', name: 'Nabarangpur' },
  { id: 'RYG', name: 'Rayagada' },
  { id: 'MLK', name: 'Malkangiri' },
  { id: 'JHR', name: 'Jharsuguda' },
];

interface DistrictContextType {
  selectedDistrict: District;
  setSelectedDistrict: (d: District) => void;
}

const DistrictContext = createContext<DistrictContextType | null>(null);

export function DistrictProvider({ children }: { children: ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState<District>(ALL_DISTRICTS[0]);
  return (
    <DistrictContext.Provider value={{ selectedDistrict, setSelectedDistrict }}>
      {children}
    </DistrictContext.Provider>
  );
}

export function useDistrict() {
  const ctx = useContext(DistrictContext);
  if (!ctx) throw new Error('useDistrict must be used within DistrictProvider');
  return ctx;
}
