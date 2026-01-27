///<reference path="./Route.ts"/>

/**
 * Check if a key is being pressed
 * @param key key to check, empty for any key
 * @returns {boolean}
 */
function tombolDitahan(key: string = ''): boolean {
	return Basik.Keyboard.IsDown(key);
}

/**
 * Return the last key for KeyboardEvent
 * @returns {string}
 */
function tombolEvent(): string {
	return Basik.Keyboard.lastKey;
}
