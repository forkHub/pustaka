import { buildingTypeConst, type buildingType } from "../building/buildingData";
import { BuildingManager } from "../building/BuildingManager";
import { gameData } from "../Data";
import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { h1 } from "./base/UIH1";
import { uiConfirmBuild } from "./UIConfirmBuild";
import { div } from "./base/UIDiv";
import { uiMenu } from "./UIMenu";

class UISelectBuildingToBuild extends UIBase {
	private wellBtn = new UIButton("well");
	private foresterBtn = new UIButton("forester");
	private woodCutterBtn = new UIButton("wood cutter");
	private sawmillBtn = new UIButton("sawmill");
	private closeBtn = new UIButton("close");

	constructor() {
		super();
		this._el = document.createElement('dialog');
		this.appendChild(
			div()
				.appendChild(h1("Select building to build"))
				.appendChild(this.wellBtn.addClass('bevel-btn'))
				.appendChild(this.foresterBtn.addClass('bevel-btn'))
				.appendChild(this.woodCutterBtn.addClass('bevel-btn'))
				.appendChild(this.sawmillBtn.addClass('bevel-btn'))
				.appendChild(this.closeBtn.addClass('bevel-btn'))
				.addClass('disp-flex', "pd", "flex-dir-col", "flex-gap", "bg-color-01")
		).addClass('bg-color-01');

		this.appendToDocument();

		this.wellBtn.el.addEventListener("click", () => {
			this.setBuilding(buildingTypeConst.WELL);
		})
		this.foresterBtn.el.addEventListener("click", () => {
			this.setBuilding(buildingTypeConst.FORESTER);
		})
		this.woodCutterBtn.el.addEventListener("click", () => {
			this.setBuilding(buildingTypeConst.WOOD_CUTTER);
		})
		this.sawmillBtn.el.addEventListener("click", () => {
			this.setBuilding(buildingTypeConst.SAW_MILL);
		})
		this.closeBtn.el.addEventListener("click", () => {
			this.close();
			uiMenu.appendToDocument();
		})
	}

	setBuilding(type: buildingType) {
		gameData.buildingRef = BuildingManager.buildByType(type);
		gameData.buildingCollide = false;
		this.close();
		uiConfirmBuild.appendToDocument();
	}

	debug() {
		this.setBuilding(buildingTypeConst.WELL);
	}

}

export const uiSelectBuildingToBuild = new UISelectBuildingToBuild();