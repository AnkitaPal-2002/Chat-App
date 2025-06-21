/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {},
	},
	plugins: [
	  require("tailwindcss-animate"),
	],
	daisyui: {
	  themes: ["light", "dark", "retro"], // You can test with retro
	},
};
  