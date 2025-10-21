module.exports = {
  // Tentukan path ke semua file yang menggunakan kelas Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Definisikan warna custom Anda di sini
      colors: {
        'primary-light': '#F5F3FF', // Warna latar belakang ungu muda
        'primary-dark': '#6D28D9',  // Warna ungu dashboard/sidebar
        'accent-purple': '#8B5CF6',
        'subtle-gray': '#E5E7EB',
      },
      // Definisikan gradient custom Anda di sini
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(180deg, #F5F3FF 0%, #E0CCFF 100%)',
      }
    },
  },
  plugins: [],
}
