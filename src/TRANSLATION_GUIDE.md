# Three-Language Translation Implementation Guide

## Overview
This guide shows how to implement English/Hindi/Odia translations across all modules.

## Implementation Pattern

### 1. Import the Language Hook
```tsx
import { useLanguage } from '../contexts/LanguageContext';
```

### 2. Use in Component
```tsx
export default function MyModule() {
  const { t } = useLanguage();
  
  // Rest of component
}
```

### 3. Replace Text with Translation Function
```tsx
// Before:
<h2>Farmers Management</h2>

// After:
<h2>{t('Farmers Management', 'किसान प्रबंधन', 'କୃଷକ ପରିଚାଳନା')}</h2>
```

## Common Translations Reference

### Actions
- Add: `t('Add', 'जोड़ें', 'ଯୋଡ଼ନ୍ତୁ')`
- Edit: `t('Edit', 'संपादित करें', 'ସମ୍ପାଦନ କରନ୍ତୁ')`
- Delete: `t('Delete', 'हटाएं', 'ବିଲୋପ କରନ୍ତୁ')`
- Save: `t('Save', 'सहेजें', 'ସଂରକ୍ଷଣ କରନ୍ତୁ')`
- Cancel: `t('Cancel', 'रद्द करें', 'ବାତିଲ୍ କରନ୍ତୁ')`
- Submit: `t('Submit', 'जमा करें', 'ଦାଖଲ କରନ୍ତୁ')`
- Search: `t('Search', 'खोजें', 'ଖୋଜନ୍ତୁ')`
- Filter: `t('Filter', 'फ़िल्टर', 'ଫିଲ୍ଟର୍')`
- Export: `t('Export', 'निर्यात', 'ରପ୍ତାନି')`
- Download: `t('Download', 'डाउनलोड', 'ଡାଉନଲୋଡ୍')`
- View: `t('View', 'देखें', 'ଦେଖନ୍ତୁ')`
- Close: `t('Close', 'बंद करें', 'ବନ୍ଦ କରନ୍ତୁ')`

### Common Labels
- Name: `t('Name', 'नाम', 'ନାମ')`
- Date: `t('Date', 'तारीख', 'ତାରିଖ')`
- Status: `t('Status', 'स्थिति', 'ସ୍ଥିତି')`
- Type: `t('Type', 'प्रकार', 'ପ୍ରକାର')`
- Details: `t('Details', 'विवरण', 'ବିସ୍ତୃତ')`
- Total: `t('Total', 'कुल', 'କୁଲ')`
- Active: `t('Active', 'सक्रिय', 'ସକ୍ରିୟ')`
- Pending: `t('Pending', 'लंबित', 'ବିଚାରାଧୀନ')`
- Completed: `t('Completed', 'पूर्ण', 'ସମ୍ପୂର୍ଣ୍ଣ')`

### Livestock Terms
- Cattle: `t('Cattle', 'गाय/बैल', 'ଗୋରୁ')`
- Buffalo: `t('Buffalo', 'भैंस', 'ମହିଷ')`
- Goat: `t('Goat', 'बकरी', 'ଛେଳି')`
- Sheep: `t('Sheep', 'भेड़', 'ମେଣ୍ଢା')`
- Poultry: `t('Poultry', 'मुर्गी', 'କୁକୁଡ଼ା')`
- Livestock: `t('Livestock', 'पशुधन', 'ପଶୁଧନ')`

### Farmers Terms
- Farmer: `t('Farmer', 'किसान', 'କୃଷକ')`
- Farmers: `t('Farmers', 'किसान', 'କୃଷକ')`
- Owner: `t('Owner', 'मालिक', 'ମାଲିକ')`
- Village: `t('Village', 'गाँव', 'ଗାଁ')`
- Block: `t('Block', 'ब्लॉक', 'ବ୍ଲକ')`
- District: `t('District', 'जिला', 'ଜିଲ୍ଲା')`

### Health Terms
- Health: `t('Health', 'स्वास्थ्य', 'ସ୍ୱାସ୍ଥ୍ୟ')`
- Vaccination: `t('Vaccination', 'टीकाकरण', 'ଟିକାକରଣ')`
- Treatment: `t('Treatment', 'उपचार', 'ଚିକିତ୍ସା')`
- Disease: `t('Disease', 'रोग', 'ରୋଗ')`
- Vaccine: `t('Vaccine', 'टीका', 'ଟୀକା')`

### Dairy Terms
- Milk: `t('Milk', 'दूध', 'କ୍ଷୀର')`
- Collection: `t('Collection', 'संग्रह', 'ସଂଗ୍ରହ')`
- Quantity: `t('Quantity', 'मात्रा', 'ପରିମାଣ')`
- Quality: `t('Quality', 'गुणवत्ता', 'ଗୁଣବତ୍ତା')`
- FAT: `t('FAT', 'वसा', 'ଚର୍ବି')`
- SNF: `t('SNF', 'SNF', 'SNF')`

### Insurance Terms
- Insurance: `t('Insurance', 'बीमा', 'ବୀମା')`
- Insured: `t('Insured', 'बीमाकृत', 'ବୀମାଭୁକ୍ତ')`
- Not Insured: `t('Not Insured', 'अबीमाकृत', 'ବୀମାଭୁକ୍ତ ନୁହେଁ')`
- Premium: `t('Premium', 'प्रीमियम', 'ପ୍ରିମିୟମ୍')`
- Claim: `t('Claim', 'दावा', 'ଦାବି')`

### Common Phrases
- "All": `t('All', 'सभी', 'ସମସ୍ତ')`
- "All Blocks": `t('All Blocks', 'सभी ब्लॉक', 'ସମସ୍ତ ବ୍ଲକ')`
- "All Status": `t('All Status', 'सभी स्थिति', 'ସମସ୍ତ ସ୍ଥିତି')`
- "Showing": `t('Showing', 'दिखा रहा है', 'ଦେଖାଯାଉଛି')`
- "of": `t('of', 'का', 'ର')`
- "Previous": `t('Previous', 'पिछला', 'ପୂର୍ବ')`
- "Next": `t('Next', 'अगला', 'ପରବର୍ତ୍ତୀ')`

## Module-Specific Translations

### Health & Vaccination
```tsx
- "Health & Vaccination Management": `t('Health & Vaccination Management', 'स्वास्थ्य और टीकाकरण प्रबंधन', 'ସ୍ୱାସ୍ଥ୍ୟ ଓ ଟିକାକରଣ ପରିଚାଳନା')`
- "Schedule Camp": `t('Schedule Camp', 'कैंप शेड्यूल करें', 'କ୍ୟାମ୍ପ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')`
- "Add Health Record": `t('Add Health Record', 'स्वास्थ्य रिकॉर्ड जोड़ें', 'ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଯୋଡ଼ନ୍ତୁ')`
```

### Breeding & AI
```tsx
- "Breeding & AI Services": `t('Breeding & AI Services', 'प्रजनन और AI सेवाएं', 'ପ୍ରଜନନ ଏବଂ AI ସେବା')`
- "Schedule AI Service": `t('Schedule AI Service', 'AI सेवा शेड्यूल करें', 'AI ସେବା ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ')`
- "Bull Directory": `t('Bull Directory', 'सांड निर्देशिका', 'ଷଣ୍ଢ ନିର୍ଦ୍ଦେଶିକା')`
```

### Dairy Collection
```tsx
- "Dairy Collection Management": `t('Dairy Collection Management', 'दुग्ध संग्रह प्रबंधन', 'ଦୁଗ୍ଧ ସଂଗ୍ରହ ପରିଚାଳନା')`
- "Add Collection Entry": `t('Add Collection Entry', 'संग्रह प्रविष्टि जोड़ें', 'ସଂଗ୍ରହ ଏଣ୍ଟ୍ରି ଯୋଡ଼ନ୍ତୁ')`
- "Morning Session": `t('Morning Session', 'सुबह का सत्र', 'ସକାଳ ଅଧିବେଶନ')`
- "Evening Session": `t('Evening Session', 'शाम का सत्र', 'ସନ୍ଧ୍ୟା ଅଧିବେଶନ')`
```

### Government Schemes
```tsx
- "Government Schemes": `t('Government Schemes', 'सरकारी योजनाएं', 'ସରକାରୀ ଯୋଜନା')`
- "Apply for Scheme": `t('Apply for Scheme', 'योजना के लिए आवेदन करें', 'ଯୋଜନା ପାଇଁ ଆବେଦନ କରନ୍ତୁ')`
- "Eligibility": `t('Eligibility', 'पात्रता', 'ଯୋଗ୍ୟତା')`
- "Benefits": `t('Benefits', 'लाभ', 'ଲାଭ')`
```

### Market
```tsx
- "Marketplace": `t('Marketplace', 'बाज़ार', 'ବଜାର')`
- "Buy": `t('Buy', 'खरीदें', 'କିଣନ୍ତୁ')`
- "Sell": `t('Sell', 'बेचें', 'ବିକ୍ରି କରନ୍ତୁ')`
- "Price": `t('Price', 'कीमत', 'ମୂଲ୍ୟ')`
```

### Training
```tsx
- "Training Programs": `t('Training Programs', 'प्रशिक्षण कार्यक्रम', 'ପ୍ରଶିକ୍ଷଣ କାର୍ଯ୍ୟକ୍ରମ')`
- "Register for Training": `t('Register for Training', 'प्रशिक्षण के लिए पंजीकरण करें', 'ପ୍ରଶିକ୍ଷଣ ପାଇଁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ')`
- "Upcoming": `t('Upcoming', 'आगामी', 'ଆଗାମୀ')`
```

### Reports & Analytics
```tsx
- "Reports & Analytics": `t('Reports & Analytics', 'रिपोर्ट और विश्लेषण', 'ରିପୋର୍ଟ ଏବଂ ବିଶ୍ଳେଷଣ')`
- "Generate Report": `t('Generate Report', 'रिपोर्ट जनरेट करें', 'ରିପୋର୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ')`
- "Analytics Dashboard": `t('Analytics Dashboard', 'विश्लेषण डैशबोर्ड', 'ବିଶ୍ଳେଷଣ ଡ୍ୟାସବୋର୍ଡ')`
```

### Settings
```tsx
- "Settings": `t('Settings', 'सेटिंग्स', 'ସେଟିଂସ୍')`
- "Profile": `t('Profile', 'प्रोफ़ाइल', 'ପ୍ରୋଫାଇଲ୍')`
- "Preferences": `t('Preferences', 'प्राथमिकताएं', 'ପସନ୍ଦ')`
- "Notifications": `t('Notifications', 'सूचनाएं', 'ବିଜ୍ଞପ୍ତି')`
- "Security": `t('Security', 'सुरक्षा', 'ସୁରକ୍ଷା')`
```

## Files Requiring Updates

### Pages (11 files)
- [x] FarmersManagement.tsx - DONE ✓
- [x] LivestockManagement.tsx - DONE ✓
- [ ] HealthVaccination.tsx
- [ ] BreedingAI.tsx
- [ ] DairyCollection.tsx
- [ ] GovernmentSchemes.tsx
- [ ] Insurance.tsx
- [ ] Market.tsx
- [ ] Training.tsx
- [ ] Reports.tsx
- [ ] Settings.tsx

### Components (~30-40 files)
Each page module has associated components that need updates following the same pattern.

## Quick Start for Each Module

1. Open the file
2. Add import: `import { useLanguage } from '../contexts/LanguageContext';`
3. Add hook usage: `const { t } = useLanguage();`
4. Find and replace all hardcoded text with `t()` calls
5. Test language switching

## Testing Checklist

- [ ] Header language dropdown switches all text
- [ ] Sidebar items change language
- [ ] Dashboard cards translate properly
- [ ] Forms show correct language
- [ ] Tables headers translate
- [ ] Buttons and labels update
- [ ] Error messages in correct language
- [ ] Tooltips and help text translate
