export const PALETTE_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
];

// This is the common identifier for all teachers, as requested.
// In a real application, this should be handled by a secure backend authentication system.
export const SHARED_PASSWORD = 'soutien';

export const CALENDAR_STRUCTURE = [
    { month: 'Septembre', weeks: [36, 37, 38, 39] },
    { month: 'Octobre', weeks: [40, 41, 42, 43, 44] },
    { month: 'Novembre', weeks: [45, 46, 47, 48] },
    { month: 'Décembre', weeks: [49, 50, 51, 52] },
    { month: 'Janvier', weeks: [1, 2, 3, 4, 5] },
    { month: 'Février', weeks: [6, 7, 8, 9] },
    { month: 'Mars', weeks: [10, 11, 12, 13] },
    { month: 'Avril', weeks: [14, 15, 16, 17, 18] },
    { month: 'Mai', weeks: [19, 20, 21, 22] },
    { month: 'Juin', weeks: [23, 24, 25, 26] },
    { month: 'Juillet', weeks: [27, 28, 29, 30, 31] },
    { month: 'Août', weeks: [32, 33, 34, 35] },
];

// --- BASEROW CONFIGURATION ---
// Replace the placeholder values with your actual Baserow credentials.
export const BASEROW_API_KEY = '7nOTtTnebOvuTmO2tL7cjmMZTfgKC2vn'; // Replace with your Baserow API Key

export const BASEROW_TABLE_IDS = {
    MODULES: '724013', // Replace with your "Modules" table ID
    CALENDAR_STATE: '724014', // Replace with your "CalendarState" table ID
};
