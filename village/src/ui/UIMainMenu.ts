import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { h1 } from "./base/UIH1";
import { uiMenu } from "./UIMenu";

class UIMainMenu extends UIBase {
	enterBtn = new UIButton("START");

	constructor() {
		super();
		this._el = document.createElement('dialog');
		this.addClass('bg-color-01', 'border-03', 'text-align-center', 'serif', 'bold')

		this.appendChild(h1("THE VILLAGE ONLINE").addClass('serif'));
		this.appendChild(this.enterBtn);

		this.enterBtn.el.addEventListener("click", () => {
			this.enterClick();
		});
		this.enterBtn.addClass('bevel-btn');
		this.appendToDocument();
	}

	enterClick() {
		this.parent = null;
		uiMenu.appendToDocument();
	}
}

export const uiMainMenu = new UIMainMenu();