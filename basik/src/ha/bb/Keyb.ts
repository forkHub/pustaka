///<reference path="./Route.ts"/>

/**
 * Check if a key is being pressed
 * @param key 
 * @returns {boolean}
 */
function KeyboardIsDown(key: string): boolean {
	return Basik.Keyboard.IsDown(key);
}