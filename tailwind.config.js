export default {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        gray: {
          light: '#F9FAFB',
          border: '#E5E7EB',
          dark: '#6B7280',
        },
        danger: {
          DEFAULT: '#DC2626',
        },
        success: {
          DEFAULT: '#16A34A',
        },
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
