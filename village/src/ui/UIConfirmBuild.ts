// import { buildingState } from "../building/Building";
// import { BuildingManager } from "../building/BuildingManager";
// import { buildingState } from "../building/Building";
import { buildingState } from "../building/buildingData";
import { BuildingManager } from "../building/BuildingManager";
// import { BuildingManager } from "../building/BuildingManager";
import { gameData, storage } from "../Data";
import { p, UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { div } from "./base/UIDiv";
import { uiMenu } from "./UIMenu";

class UIConfirmBuild extends UIBase {
	okBtn: UIButton = new UIButton("✔ Ok");
	cancelBtn: UIButton = new UIButton("❌ Cancel");
	message: UIBase = p("").addClass('bold');

	constructor() {
		super();
		this._el = document.createElement('div');
		this.addClass('padding-8', 'bottom-0', 'left-0', 'pos-fixed', 'right-0', 'bg-color-01', 'text-align-center');
		this._el.style.zIndex = '1000';

		this.message.addClass('red');

		this.appendChild(p('Click where you want to put the building').addClass('bold'));
		this.appendChild(this.message);
		this.appendChild(
			div(
				this.okBtn.addClass('bevel-btn'),
				this.cancelBtn.addClass('bevel-btn')
			).addClass("disp-flex", "justify-content-space-evenly", 'align-items-center', "bg-color-0")
		)

		this.okBtn.el.addEventListener('click', () => {
			this.confirm();
		});

		this.cancelBtn.el.addEventListener("click", () => {
			if (gameData.buildingRef) {
				BuildingManager.remove(gameData.buildingRef.id);
			}
			gameData.buildingRef = undefined;
			gameData.buildingCollide = false;
			this.parent = null;
			uiMenu.appendToDocument();
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
			if (gameData.buildingRef.isPosisionSet) {
				if (!gameData.buildingCollide) {
					gameData.buildingRef.state = buildingState.BUILD;
					gameData.buildingRef.message.clearListener();
					gameData.buildingRef = undefined;
					gameData.buildingCollide = false;
					this.parent = null;
					uiMenu.appendToDocument();
					storage.save();
				}
				else {
					console.log('building collide');
					alert('illegal building position');
				}
			}
			else {
				alert("You haven't set any posisiton for the building");
			}
		}

	}

	debug() {
		this.confirm();
	}

}

export const uiConfirmBuild: UIConfirmBuild = new UIConfirmBuild();