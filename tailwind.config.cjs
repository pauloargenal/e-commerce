const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    },
    colors: {
      // Existing colors
      white: '#FFFFFF',
      'black-100': '#151726',
      'black-90': '#364155',
      'black-80': '#4F596B',
      'black-70': '#687180',
      'black-60': '#818895',
      'black-50': '#9BA0AA',
      'black-40': '#B4B8BF',
      'black-30': '#CDD0D5',
      'black-10': '#E6E7EA',
      'black-5': '#F3F3F4',
      'green-100': '#03B660',
      'green-80': '#3DCB76',
      'green-70': '#55D287',
      'green-60': '#6DD898',
      'green-50': '#85DFA9',
      'green-40': '#9EE5BA',
      'green-30': '#B6ECCB',
      'green-20': '#CEF2DD',
      'green-10': '#E7F9EE',
      'green-5': '#F3FCF6',
      'cienna-100': '#E78854',
      'cienna-80': '#ECA076',
      'cienna-70': '#EEAC87',
      'cienna-60': '#F1B898',
      'cienna-50': '#F3C3A9',
      'cienna-40': '#F5CFBB',
      'cienna-30': '#F8DBCC',
      'cienna-20': '#FAE7DD',
      'cienna-10': '#FDF3EE',
      'cienna-5': '#FEF9F6',
      'blue-100': '#1266E0',
      'blue-80': '#4185E6',
      'blue-70': '#5994E9',
      'blue-60': '#71A3EC',
      'blue-50': '#88B2EF',
      'blue-40': '#A0C2F3',
      'blue-30': '#B8D1F6',
      'blue-20': '#D0E0F9',
      'blue-10': '#E7F0FC',
      'blue-5': '#F3F7FD',
      'citrine-100': '#E5D419',
      'citrine-80': '#F2E15D',
      'citrine-70': '#F4E472',
      'citrine-60': '#F5E886',
      'citrine-50': '#F7EC9A',
      'citrine-40': '#F9F0AE',
      'citrine-30': '#FAF4C2',
      'citrine-20': '#FCF7D7',
      'citrine-10': '#FDFBEB',
      'citrine-5': '#FEFDF5',
      'grey-1': '#F7F7FA',
      'red-60': '#E53E3E',
      hazel: '#8B8110',
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      // Tailwind slate colors for the new design
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617'
      },
      // Tailwind indigo colors for primary actions
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
        950: '#1e1b4b'
      },
      // Tailwind emerald colors for success states
      emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c22'
      },
      // Tailwind amber colors for warnings
      amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
        950: '#451a03'
      },
      // Tailwind rose colors for errors/likes
      rose: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
        950: '#4c0519'
      },
      // Tailwind purple colors
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
        950: '#3b0764'
      },
      // Tailwind pink colors
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
        950: '#500724'
      },
      // Basic colors
      black: '#000000',
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      }
    }
  },
  plugins: []
};

module.exports = config;
