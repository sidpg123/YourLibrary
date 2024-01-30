/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: { 'cats': 'url(D:\Coading\LibraryProject\client\src\assets\kitlib.png)'} 
    },
  },
  plugins: [],
}