import { UIBase } from "./UIBase";

export class UIImage extends UIBase {
    private _src: string = '';

    public get src(): string {
        return this._src;
    }
    public set src(value: string) {
        this._src = value;
        (this._el as HTMLImageElement).src = value;
    }

    constructor(src:string) {
        super('img');
        (this._el as HTMLImageElement).src = src;
        this.src = src;
    }
}