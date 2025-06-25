export const DOSAGE_FORM_OPTIONS = [ /* ... */ ];
export const AGE_GROUP_OPTIONS = [ /* ... */ ];
export const CATEGORY_OPTIONS = [ /* ... */ ];
export const USAGE_OPTIONS = Array.from({ length: 25 }, (_, i) => ({ value: `use${i + 1}`, label: `Usage ${i + 1}` }));
export const MANUFACTURER_OPTIONS = [ /* ... */ ];
export const STOCK_OPTIONS = [ /* ... */ ];
export const MAX_IMAGES = 4;
export const defaultPackaging = { type: 'Hộp', bigQty: '', bigUnit: 'vỉ', smallQty: '', smallUnit: 'viên' };