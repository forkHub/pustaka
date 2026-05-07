// import { buildingState } from "../building/Building";
// import { BuildingManager } from "../building/BuildingManager";
// import { buildingState } from "../building/Building";
import { buildingState } from "../building/buildingData";
// import { BuildingManager } from "../building/BuildingManager";
import { gameData, storage } from "../Data";
import { p, UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { div } from "./UIDiv";
import { uiMenu } from "./UIMenu";

class UIConfirmBuild extends UIBase {
	okBtn: UIButton = new UIButton("Ok");
	cancelBtn: UIButton = new UIButton("Cancel");
	message:UIBase = p("");

	constructor() {
		super();
		this._el = document.createElement('div');
		this.addClass('pd', 'bottom-0', 'left-0', 'pos-fixed', '');
		this._el.style.zIndex = '1000';

		this.appendChild(p('Click where you want to put the building'));
		this.appendChild(this.message);
		this.appendChild(
			div(
				this.okBtn,
				this.cancelBtn
			).addClass("disp-flex")
		)

		this.okBtn.el.addEventListener('click', () => {
			this.confirm();
		});

		this.cancelBtn.el.addEventListener("click", () => {
			gameData.buildingRef = undefined;
			this.parent = null;
		})
	}

	appendToDocument(): void {
		super.appendToDocument();
		gameData.buildingRef?.message.addListener(() => {
			this.message.innerText(gameData.buildingRef?.message.value || "");
		})
	}

	confirm() {
		if (gameData.buildingRef) {
			gameData.buildingRef.state = buildingState.BUILD;
		}
		
		gameData.buildingRef?.message.clearListener();
		gameData.buildingRef = undefined;
		this.parent = null;
		uiMenu.appendToDocument();
		storage.save();
	}

	debug() {
		this.confirm();
	}

}

export const uiConfirmBuild: UIConfirmBuild = new UIConfirmBuild();