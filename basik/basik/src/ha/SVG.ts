namespace Basik {
    export class Pena {
        diangkat() {
            tutupPath();
        }

        ditekan(x:number, y:number) {
            bukaPath(x, y);
        }

        kanan(x:number) {
            garis(x, 0);
        }

        atas(x:number) {
            garis(0, x);
        }

        kiri(x:number) {
            garis(-x, 0);
        }

        bawah(x:number) {
            garis(0, x);
        }

        diag(x:number, y:number) {
            garis(x, y);
        }

        polar(jarak:number, sudut:number) {
            jarak;
            sudut;
            //TODO:
        }

        // kurva(cx:number, cy:number, x:number, y:number) {
        //     kurvaKe(cx, cy, x, y);
        // }

        kurva(): PenaData.Kurva2 {
            return new PenaData.Kurva2();
        }
    }

    namespace PenaData {
        export class Kurva2 {
            constructor() {
            }

            kanan(x:number):Kurva3 {
                return new Kurva3(x, 0);
            }

            bawah(x:number):Kurva3 {
                return new Kurva3(0, x);
            }

            //kiri, atas, bawah, diag
        }

        export class Kurva3 {
            private cx:number=0;
            private cy:number=0;

            constructor(cx:number, cy:number) {
                this.cx = cx;
                this.cy = cy;
            }

            kanan(x:number) {
                kurvaKe(this.cx, this.cy, x, this.cy);
            }

            bawah(y:number) {
                kurvaKe(this.cx, this.cy, this.cx, y);
            }

            diag(x:number, y:number) {
                kurvaKe(this.cx, this.cy, x, y);
            }

            kiri(x:number) {
                kurvaKe(this.cx, this.cy, -x, this.cy);
            }

            atas(y:number) {
                kurvaKe(this.cx, this.cy, this.cx, -y);
            }

        }
    }
}