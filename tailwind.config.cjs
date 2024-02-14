module.exports = {
	darkMode: "class",
	content: [
		"./views/**/*{.go.html,.html,.templ}",
		"./routes/**/*.go",
		"./node_modules/preline/dist/*.js",
		"./templ/**/*{.go.html,.html,.templ}"
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
