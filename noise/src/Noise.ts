namespace Basik.Noise {

    export class Noises {
        readonly list: Noise[];
        private firstFrec: number = 10;
        private firstMaxValue: number = 255;
        private _customQ: (n: number) => number;

        public set customQ(value: (n: number) => number) {
            this._customQ = value;
            this.list.forEach((item) => {
                item.customQ = value;
            })
        }

        frec(n: number): number {
            return n * .5;
        }

        max(n: number): number {
            return n * .5;
        }

        constructor(n: number, frec: number, maxValue: number) {
            this.firstFrec = frec;
            this.firstMaxValue = maxValue;

            for (let i = 0; i < n; i++) {
                let n = new Noise();
                if (this._customQ) {
                    n.customQ = this._customQ;
                }

                if (i == 0) {
                    n.frec = this.firstFrec;
                    n.maxValue = this.firstMaxValue;
                } else {
                    n.frec = this.frec(this.list[i - 1].frec);
                    n.maxValue = this.max(this.list[i - 1].maxValue);
                }
            }
        }

    }

    export class Noise {
        private _frec: number = 10;
        private _maxValue: number = 100;
        private _customQ: (n: number) => number;

        public set customQ(value: (n: number) => number) {
            this._customQ = value;
        }

        readonly list: number[] = [];

        public get frec(): number {
            return this._frec;
        }
        public set frec(value: number) {
            this._frec = value;
        }

        public get maxValue(): number {
            return this._maxValue;
        }
        public set maxValue(value: number) {
            this._maxValue = value;
        }

        q(x: number): number {
            //f(x) = 6.0000 x ^ 5 − 15.0000 x ^ 4 + 10.0000x ^ 3
            return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
        }

        lerp(x1: number, x2: number, xn: number): number {
            if (xn < 0) xn = 0;
            if (xn > x2) xn = 1;
            let q = this._customQ ? this._customQ : this.q;
            return x1 + q(xn) * (x2 - x1);
        }

        get(idx: number): number {
            let prevIdx: number = 0;
            let nextIdx: number = 0;

            prevIdx = Math.floor(idx / this._frec);
            nextIdx = Math.ceil(idx / this._frec);

            while (this.list.length < nextIdx + 1) {
                this.list.push(Math.floor(Math.random() * this._maxValue));
            }

            let idx2 = (idx % this._frec) / this._frec;
            let h = this.lerp(this.list[prevIdx], this.list[nextIdx], idx2);

            return h;
        }
    }
}

window.onload = () => {
    let n = new Basik.Noise.Noise();
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.strokeStyle = ctx.fillStyle;

    ctx.beginPath();
    for (let i = 0; i < 320; i++) {
        ctx.lineTo(i, n.get(i));
    }
    ctx.stroke();

    for (let row = 0; row < 5; row++) {
        console.group()
        for (let col = 0; col < 5; col++) {
            let v = n.get(row + col);
            v = Math.floor((v / 255) * 255);
            // console.log(v);
            ctx.fillStyle = `rgba(${v},${v},${v},1)`;
            ctx.fillRect(col, row, 1, 1);
            console.group();
            console.log(row + col);
            console.groupEnd();
        }
        console.groupEnd();
    }
}
