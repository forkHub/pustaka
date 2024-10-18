namespace ha.be {

    //Sprite Object
    export class SprObj implements ISpr {
        private static _ctrDraw: number = 0;

        //TODO: pindahin ke Image
        private _x: number = 0;
        private _y: number = 0;
        private _url: string;

        private _buff: IGbr;
        private _dragged: boolean = false;
        private _down: boolean = false;
        private _hit: number = 0;
        private _dragStartY: number = 0;
        private _dragStartX: number = 0;
        private _dragable: boolean = false;
        private _tipeDrag: number;
        private _sudutTekanAwal: number;
        private _sudutAwal: number;
        private _inputId: number;

        constructor(buffer: IGbr, dragable: boolean = false) {
            this.buff = buffer;
            this.dragable = dragable;
        }

        public get drgStartX(): number {
            return this._dragStartX;
        }
        public set drgStartX(value: number) {
            this._dragStartX = value;
        }
        public get drgStartY(): number {
            return this._dragStartY;
        }
        public set drgStartY(value: number) {
            this._dragStartY = value;
        }

        public get dragged(): boolean {
            return this._dragged;
        }
        public set dragged(value: boolean) {
            this._dragged = value;
        }
        public get buff(): IGbr {
            return this._buff;
        }
        public set buff(value: IGbr) {
            this._buff = value;
        }
        public get x(): number {
            return this._x;
        }
        public set x(value: number) {
            this._x = value;
        }
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            this._y = value;
        }

        public get jmlHit(): number {
            return this._hit;
        }
        public set jmlHit(value: number) {
            this._hit = value;
        }
        public get down(): boolean {
            return this._down;
        }
        public set down(value: boolean) {
            this._down = value;
        }
        public get dragable(): boolean {
            return this._dragable;
        }
        public set dragable(value: boolean) {
            this._dragable = value;
        }
        public get sudutAwal(): number {
            return this._sudutAwal;
        }
        public set sudutAwal(value: number) {
            this._sudutAwal = value;
        }

        public get sudutTekanAwal(): number {
            return this._sudutTekanAwal;
        }
        public set sudutTekanAwal(value: number) {
            this._sudutTekanAwal = value;
        }

        public get tipeDrag(): number {
            return this._tipeDrag;
        }

        public set tipeDrag(value: number) {
            this._tipeDrag = value;
            if (value > 0) {
                this._dragable = true;
            }
            else {
                this._dragable = false;
            }
        }

        public get url(): string {
            return this._url;
        }
        public set url(value: string) {
            this._url = value;
        }
        public static get ctrDraw(): number {
            return SprObj._ctrDraw;
        }
        public static set ctrDraw(value: number) {
            SprObj._ctrDraw = value;
        }

        public get inputId(): number {
            return this._inputId;
        }
        public set inputId(value: number) {
            this._inputId = value;
        }


    }
}