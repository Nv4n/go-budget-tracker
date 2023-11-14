module.exports = {
	darkMode: ["class"],
	content: ["./templates/**/*.html", "node_modules/preline/dist/*.js"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("preline/plugin")],
};
