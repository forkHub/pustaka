"use strict";
var Basik;
(function (Basik) {
    class Transform {
        static get lastX() {
            return Basik.Tf._lastX;
        }
        static get lastY() {
            return Basik.Tf._lastY;
        }
        // static equal(n1: number, n2: number, toleransi: number = 1): boolean {
        // 	if (Math.abs(n1 - n2) <= toleransi) return true;
        // 	return false;
        // }
        static quadDeg2(x, y, deg) {
            if (x == 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x > 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x < 0) {
                if (y == 0) {
                    return 180;
                }
                else if (y > 0) {
                    return 180 - Math.abs(deg);
                }
                else if (y < 0) {
                    return 180 + Math.abs(deg);
                }
            }
            throw Error();
        }
        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static sudut(x, y) {
            let l;
            let sin;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            sin = y / l;
            sin = Math.asin(sin);
            sin *= Basik.Tf.RAD2DEG;
            sin = Basik.Tf.quadDeg2(x, y, sin);
            sin = Basik.Tf.normalizeDeg(sin);
            return sin;
        }
        static normalizeDeg(deg) {
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            return deg;
        }
        static degDist(angleS = 0, angleT, min = true) {
            if (min) {
                return Transform.degDistMin(angleS, angleT);
            }
            else {
                return Transform.degDistMax(angleS, angleT);
            }
        }
        static degDistMax(angleS = 0, angleT) {
            angleS = Basik.Tf.normalizeDeg(angleS);
            angleT = Basik.Tf.normalizeDeg(angleT);
            let deg = Basik.Tf.degDistMin(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        static degDistMin(angleS = 0, angleT) {
            angleS = Basik.Tf.normalizeDeg(angleS);
            angleT = Basik.Tf.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        // static jarak(x: number, y: number, xt: number, yt: number): number {
        // 	let pjx: number = xt - x;
        // 	let pjy: number = yt - y;
        // 	return Math.sqrt(pjx * pjx + pjy * pjy);
        // }
        static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= Basik.Tf.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            Basik.Tf._lastX = x1 + xt;
            Basik.Tf._lastY = y1 + yt;
        }
    }
    Transform.RAD2DEG = 180.0 / Math.PI;
    Transform.DEG2RAD = Math.PI / 180.0;
    Transform._lastX = 0;
    Transform._lastY = 0;
    Basik.Transform = Transform;
    Basik.Tf = Transform;
})(Basik || (Basik = {}));
