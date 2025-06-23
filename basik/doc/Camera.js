"use strict";
var Basik;
(function (Basik) {
    class Camera {
        static get x() {
            return Camera._x;
        }
        static set x(value) {
            Camera._x = value;
        }
        static get y() {
            return Camera._y;
        }
        static set y(value) {
            Camera._y = value;
        }
        static get img() {
            return Camera._img;
        }
        static set img(value) {
            Camera._img = value;
        }
        static init() {
            function update() {
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
        }
    }
    Camera._x = 0;
    Camera._y = 0;
    Basik.Camera = Camera;
})(Basik || (Basik = {}));
