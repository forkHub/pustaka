"use strict";
///<reference path="./Route.ts"/>
const S = Basik.Sn;
/**
 * Load sound
 * @param url {string} the url
 * @returns {Basik.Sound}
 */
function LoadSound(url) {
    let sound = document.createElement("audio");
    let s = new S();
    s.src = url;
    s.loaded = false;
    s.sound = sound;
    sound.onload = () => {
        s.loaded = true;
    };
    sound.onended = () => {
        s.playedCount++;
        try {
            window.SoundEnded(s);
        }
        catch (e) { }
    };
    sound.src = url;
    S.list.push(s);
    return s;
}
/**
 * Play Sound
 * @param s {Basic.Sound}
 */
function PlaySound(s) {
    s.sound.play();
}
/**
 * Check if a sound has been loaded
 * @param s {Basik.Sound} the sound object
 * @returns {boolean}
 */
function SoundLoaded(s) {
    return s.loaded;
}
