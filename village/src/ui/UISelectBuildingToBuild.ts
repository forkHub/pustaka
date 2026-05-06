import { buildingTypeConst, type buildingType } from "../building/buildingData";
import { BuildingManager } from "../building/BuildingManager";
import { gameData } from "../Data";
import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { uiConfirmBuild } from "./UIConfirmBuild";

class UISelectBuildingToBuild extends UIBase {
    private wellBtn = new UIButton("well");
    private foresterBtn = new UIButton("forester");
    private woodCutterBtn = new UIButton("wood cutter");

    constructor() {
        super();
        this._el = document.createElement('dialog');
        this.appendChild(this.wellBtn);
        this.appendChild(this.foresterBtn);
        this.appendChild(this.woodCutterBtn);
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
    }

    setBuilding(type:buildingType) {
        gameData.buildingRef = BuildingManager.buildByType(type);
        this.close();
        uiConfirmBuild.appendToDocument();
    }

    debug() {
        this.setBuilding(buildingTypeConst.WELL);
    }

}

export const uiSelectBuildingToBuild = new UISelectBuildingToBuild();