import { buildingState } from "../building/Building";
import { BuildingManager } from "../building/BuildingManager";
import { gameData } from "../Data";
import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";

class UIConfirmBuild extends UIBase {
	okBtn: UIButton = new UIButton("Ok");
	cancelBtn: UIButton = new UIButton("Cancel");

	constructor() {
		super();
		this._el = document.createElement('div');
		this._el.classList.add('pd', 'bottom-0', 'left-0', 'pos-fixed');
		this._el.style.zIndex = '1000';
		this.okBtn.parent = this;
		this.cancelBtn.parent = this;

		this.okBtn.el.addEventListener('click', () => {
			this.confirm();
		});

		this.cancelBtn.el.addEventListener("click", () => {
			console.log("cancel button click");

			let b = BuildingManager.getById(gameData.buildingToBuild);
			if (!b) throw Error('invalid building');
			gameData.buildingToBuild = 0;
			this.parent = null;
		})
	}

	confirm() {
			// console.log("ok button click, building to build " + gameData.buildingToBuild);
			if (gameData.buildingToBuild <= 0) return;

			let b = BuildingManager.getById(gameData.buildingToBuild);
			if (!b) throw Error('invalid building');
			b.state = buildingState.PRODUCE;
			gameData.buildingToBuild = 0;
			// if (this.parent) this.parent.
			// document.body.removeChild(this.el);
			this.parent = null;
	}


}

export const uiConfirmBuild: UIConfirmBuild = new UIConfirmBuild;