// Import htmx
import htmx from "htmx.org";

// Extend the Window interface
declare global {
	interface Window {
		htmx: typeof htmx;
	}
}

// Assign htmx to the window object
window.htmx = htmx;
