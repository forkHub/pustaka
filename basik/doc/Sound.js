"use strict";
var Basik;
(function (Basik) {
    class Sound {
        constructor() {
            this._src = '';
            this._loaded = false;
        }
        static get lastSound() {
            return Sound._lastSound;
        }
        static set lastSound(value) {
            Sound._lastSound = value;
        }
        get playedCount() {
            return this._playedCount;
        }
        set playedCount(value) {
            this._playedCount = value;
        }
        get sound() {
            return this._sound;
        }
        set sound(value) {
            this._sound = value;
        }
        get loaded() {
            return this._loaded;
        }
        set loaded(value) {
            this._loaded = value;
        }
        get src() {
            return this._src;
        }
        set src(value) {
            this._src = value;
        }
    }
    Sound.list = [];
    Basik.Sound = Sound;
    Basik.Sn = Sound;
})(Basik || (Basik = {}));
