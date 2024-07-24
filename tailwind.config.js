/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back-image': "url('/back_img.jpg')",
        'back-image1': "url('/back_img1.png')",
        'back-image2': "url('/back_image.jpg')",
        'back-image3': "url('/back_img3.jpg')",
        'foot-image': "url('/foot_img.jpg')",
      },
      spacing: {
        '128': '32rem',
      },
      colors:{
        'my-black': '#101820',
        'my-golden': '#FEE715',
        'my-light-dark': '#2E2E38',
        'my-white': '#F9F6EE',
        'my-back': '#F5F5F5'
      },
    },
  },
  plugins: [],
}

