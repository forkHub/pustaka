import { buildingTypeConst, type buildingType } from "../building/buildingData";
import { BuildingManager } from "../building/BuildingManager";
import { gameData } from "../Data";
import { UIBase } from "./base/UIBase";
import { UIButton } from "./base/UIButton";
import { h1 } from "./base/UIH1";
import { uiConfirmBuild } from "./UIConfirmBuild";
import { div } from "./UIDiv";

class UISelectBuildingToBuild extends UIBase {
    private wellBtn = new UIButton("well");
    private foresterBtn = new UIButton("forester");
    private woodCutterBtn = new UIButton("wood cutter");

    constructor() {
        super();
        this._el = document.createElement('dialog');
        this.appendChild(
            div()
                .appendChild(h1("Select building to build"))
                .appendChild(this.wellBtn)
                .appendChild(this.foresterBtn)
                .appendChild(this.woodCutterBtn)
                .addClass('disp-flex', "pd", "flex-dir-col", "flex-gap")
        )

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