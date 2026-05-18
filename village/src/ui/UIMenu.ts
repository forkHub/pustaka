import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { uiSelectBuildingToBuild } from "./UISelectBuildingToBuild";

class UIMenu extends UIBase {
	private buildBtn: UIButton = new UIButton('build');

	constructor() {
		super();
		this.appendChild(this.buildBtn);
		this._el.classList.add('fixed-bottom', 'align-items-center', "justify-content-center", "padding-8", "disp-flex", "width-12");
		this.addClass('bg-color-01');

		this.buildBtn.el.addEventListener("click", () => {
			this.buildClick();
		});
		this.buildBtn.addClass('bevel-btn');
	}

	buildClick() {
		this.parent = null;
		uiSelectBuildingToBuild.open();
	}

	debug() {
		this.buildClick();
	}

}

export const uiMenu = new UIMenu();
