export type Role = 'directorate' | 'cdvo' | 'sdvo' | 'bvo' | 'ait' | 'lac' | 'mvu' | 'farmer';

export interface MockUser {
  id: string;
  name: string;
  role: Role;
  roleLabel: string;
  designation: string;
  district?: string;
  password: string;
  homePath: string;
  interface: 'web' | 'mobile';
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar Panda',
    role: 'directorate',
    roleLabel: 'Directorate / DAH&VS',
    designation: 'Director, Animal Husbandry',
    password: 'dir123',
    homePath: 'semen-dashboard',
    interface: 'web',
  },
  {
    id: '2',
    name: 'Dr. Sanjay Mohanty',
    role: 'cdvo',
    roleLabel: 'CDVO',
    designation: 'Chief District Veterinary Officer',
    district: 'Khordha',
    password: 'cdvo123',
    homePath: 'cdvo-semen',
    interface: 'web',
  },
  {
    id: '3',
    name: 'Dr. Priya Nayak',
    role: 'sdvo',
    roleLabel: 'SDVO',
    designation: 'Sub-Divisional Veterinary Officer',
    district: 'Puri',
    password: 'sdvo123',
    homePath: 'sdvo-semen',
    interface: 'web',
  },
  {
    id: '4',
    name: 'Dr. Amit Behera',
    role: 'bvo',
    roleLabel: 'BVO',
    designation: 'Block Veterinary Officer',
    district: 'Cuttack',
    password: 'bvo123',
    homePath: 'bvo-medicine-queue',
    interface: 'web',
  },
  {
    id: '5',
    name: 'Suresh Pradhan',
    role: 'ait',
    roleLabel: 'AIT',
    designation: 'Artificial Insemination Technician',
    district: 'Bhubaneswar',
    password: 'ait123',
    homePath: 'breeding',
    interface: 'mobile',
  },
  {
    id: '6',
    name: 'Ramesh Das',
    role: 'lac',
    roleLabel: 'LAC / VD',
    designation: 'Livestock Aid Centre / Village Dispenser',
    district: 'Balasore',
    password: 'lac123',
    homePath: 'lac-medicine-home',
    interface: 'mobile',
  },
  {
    id: '7',
    name: 'Bikash Sahoo',
    role: 'mvu',
    roleLabel: 'MVU Field Team',
    designation: 'Mobile Veterinary Unit Field Staff',
    district: 'Sambalpur',
    password: 'mvu123',
    homePath: 'mvu-team-home',
    interface: 'mobile',
  },
  {
    id: '8',
    name: 'Gopal Jena',
    role: 'farmer',
    roleLabel: 'Farmer',
    designation: 'Livestock Farmer',
    district: 'Ganjam',
    password: 'farmer123',
    homePath: 'farmer-medicine-login',
    interface: 'mobile',
  },
];

export const ROLE_MENU_ACCESS: Record<Role, string[]> = {
  directorate: ['dashboard', 'semen-dashboard', 'semen-drilldown', 'semen-allocation', 'semen-redistribution', 'semen-requests', 'semen-reports', 'semen-forecasting', 'mvu-command', 'mvu-compliance', 'mvu-fleet', 'mvu-manpower', 'mvu-targets', 'livestock', 'health', 'breeding', 'farmers', 'dairy', 'schemes', 'insurance', 'training', 'reports', 'settings'],
  cdvo: ['cdvo-semen', 'cdvo-mvu', 'dashboard', 'livestock', 'health', 'breeding', 'farmers', 'dairy', 'reports', 'settings'],
  sdvo: ['sdvo-semen', 'dashboard', 'livestock', 'health', 'breeding', 'farmers', 'dairy', 'reports', 'settings'],
  bvo: ['bvo-medicine-queue', 'bvo-mvu-plan', 'bvo-mvu-inventory', 'bvo-mvu-assignment', 'dashboard', 'livestock', 'health', 'breeding', 'farmers', 'dairy', 'reports'],
  ait: ['breeding', 'livestock', 'farmers'],
  lac: ['lac-medicine-home', 'lac-medicine-log', 'lac-medicine-farmer', 'lac-medicine-barcode', 'lac-medicine-request', 'lac-medicine-inventory', 'lac-medicine-offline', 'health', 'livestock', 'farmers'],
  mvu: ['mvu-team-home', 'mvu-team-visit', 'mvu-team-daily', 'mvu-team-stock', 'health', 'livestock', 'farmers', 'dairy'],
  farmer: ['farmer-medicine-login', 'farmer-medicine-request', 'farmer-medicine-history', 'farmer-medicine-chatbot', 'farmers', 'livestock', 'health', 'schemes', 'insurance', 'training'],
};
