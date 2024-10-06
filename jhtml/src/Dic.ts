namespace jhtml {

    export class Dic {
        private _k: string = '';
        public get k(): string {
            return this._k;
        }
        public set k(value: string) {
            this._k = value;
        }
        private _v: string = '';
        public get v(): string {
            return this._v;
        }
        public set v(value: string) {
            this._v = value;
        }

        constructor(k: string, v: string) {
            this._k = k;
            this._v = v;
        }
    }

}