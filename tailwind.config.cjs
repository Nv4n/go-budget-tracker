module.exports = {
	darkMode: ["class"],
	content: [
		"./templates/**/*{.html,.templ}",
		"./node_modules/preline/dist/*.js",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/forms"),
		require("preline/plugin"),
	],
};
