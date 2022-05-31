const { windowManager } = require("node-window-manager");
 
const window = windowManager.getActiveWindow();
 
// Prints the currently focused window bounds.
console.log(window);

windowManager.requestAccessibility();

window.setBounds({ x: 0, y: 0 });