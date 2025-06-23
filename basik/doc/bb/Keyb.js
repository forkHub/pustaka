"use strict";
///<reference path="./Route.ts"/>
/**
 * Check if a key is being pressed
 * @param key key to check, empty for any key
 * @returns {boolean}
 */
function KeyboardIsDown(key = '') {
    return Basik.Keyboard.IsDown(key);
}
/**
 * Return the last key for KeyboardEvent
 * @returns {string}
 */
function LastKey() {
    return Basik.Keyboard.lastKey;
}
