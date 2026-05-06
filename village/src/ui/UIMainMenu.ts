import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { UIH1 } from "./base/UIH1";
import { uiMenu } from "./UIMenu";

class UIMainMenu extends UIBase {
    enterBtn = new UIButton("START");

    constructor() {
        super();
        this._el = document.createElement('dialog');

        this.appendChild(new UIH1("THE VILLAGE"));
        this.appendChild(this.enterBtn);
        
        this.enterBtn.el.addEventListener("click", () => {
            this.enterClick();
        });
        this.appendToDocument();
    }

    enterClick() {
        this.parent = null;
        uiMenu.appendToDocument();
    }
}

export const uiMainMenu = new UIMainMenu();