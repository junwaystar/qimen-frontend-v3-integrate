/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🌟 物理除錯關鍵：強迫編譯器吃進 dark: 開頭的所有暗黑霓虹衣服！
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./views/**/*.{js,ts,jsx,tsx,mdx}",      
    "./store/**/*.{js,ts,jsx,tsx,mdx}"       
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
