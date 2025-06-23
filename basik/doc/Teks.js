"use strict";
var Basik;
(function (Basik) {
    class Teks {
        static get size() {
            return Teks._size;
        }
        static set size(value) {
            Teks._size = value;
        }
        static Goto(x, y) {
            Teks._x = x;
            Teks._y = y;
        }
        static Name(name = 'cursive') {
            Teks._name = name;
        }
        static Size(n = 12) {
            Teks.size = n;
        }
        static WriteLn(teks) {
            Basik.G.Canvas().getContext('2d').font = Teks.size + 'px ' + Teks._name;
            Basik.G.Canvas().getContext('2d').fillText(teks, Teks._x, Teks._y);
            Basik.G.Canvas().getContext('2d').strokeText(teks, Teks._x, Teks._y);
            Teks._y += Teks.size + 2; // Move down for the next line
        }
        static Write(teks) {
            Basik.G.Canvas().getContext('2d').font = Teks.size + 'px ' + Teks._name;
            Basik.G.Canvas().getContext('2d').fillText(teks, Teks._x, Teks._y);
            Basik.G.Canvas().getContext('2d').strokeText(teks, Teks._x, Teks._y);
        }
    }
    Teks._name = 'Arial';
    Teks._size = 12;
    Teks._x = 120;
    Teks._y = 10;
    Basik.Teks = Teks;
    Basik.Tk = Teks;
})(Basik || (Basik = {}));
