import { Building, buildingState } from "../Building";
import { gameData } from "../Data";
import { UIBase } from "./IUI";

class UIConfirmBuild extends UIBase {
	okBtn: UIButton = new UIButton("Ok");
	cancelBtn: UIButton = new UIButton("Cancel");

	constructor() {
		super();
		this._el = document.createElement('div');
		this._el.classList.add('pd', 'bottom-0', 'left-0', 'pos-fixed');
		this.appendChild(this.okBtn);
		this.appendChild(this.cancelBtn);

		this.okBtn.el.addEventListener('click', () => {
			console.log("ok button click, building to build " + gameData.buildingToBuild);
			if (gameData.buildingToBuild <= 0) return;

			let b = Building.getById(gameData.buildingToBuild);
			if (!b) throw Error('invalid building');
			b.state = buildingState.PRODUCE;
			gameData.buildingToBuild = 0;
			// if (this.parent) this.parent.
			// document.body.removeChild(this.el);
			this.parent = null;
		});

		this.cancelBtn.el.addEventListener("click", () => {
			console.log("cancel button click");

			let b = Building.getById(gameData.buildingToBuild);
			if (!b) throw Error('invalid building');
			//TODO: remove building
			gameData.buildingToBuild = 0;
			this.parent = null;
		})
	}


}

class UIButton extends UIBase {
	constructor(label: string = '') {
		super();
		this._el = document.createElement('button');
		this._el.innerText = label;
	}
}
export const uiConfirmBuild: UIConfirmBuild = new UIConfirmBuild;