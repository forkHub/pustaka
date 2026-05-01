import { UIBase } from "./UIBase";

export class UIMeter extends UIBase {
    private _value: number = 0;
    private _min: number = 0;
    private _max: number = 100;

    public get min(): number {
        return this._min;
    }
    public set min(value: number) {
        this._min = value;
        (this._el as HTMLMeterElement).min = this.min;
    }
    public get max(): number {
        return this._max;
    }
    public set max(value: number) {
        this._max = value;
        (this._el as HTMLMeterElement).max = value;

    }
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value;
        (this._el as HTMLMeterElement).value = value;
    }

    constructor() {
        super();
        this._el = document.createElement('meter');
        this.el.classList.add('disp-block');
    }
}