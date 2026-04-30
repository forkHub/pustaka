import { UIBase } from "./UIBase";

export class UIButton extends UIBase {
    constructor(label:string) {
        super();
        let btn = document.createElement('button');
        btn.innerText = label;
        this._el = btn;
    }
}