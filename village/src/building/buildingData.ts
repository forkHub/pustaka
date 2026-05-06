import { gameData } from "../Data";
import { id } from "../Id";

export const buildingTypeConst = {
    FORESTER: 'FORESTER',
    WELL: 'WELL',
    WOOD_CUTTER: 'WOOD CUTTER'
} as const;

export type buildingType = typeof buildingTypeConst[keyof typeof buildingTypeConst];

export const buildingState = {
    PLAN: 'plan',
    BUILD: 'build',
    PRODUCE: 'produce'
}
export type buildingState = typeof buildingState[keyof typeof buildingState];

export class BuildingData {
    protected _type: buildingType = buildingTypeConst.FORESTER;
    protected _img: Basik.GbrObj;
    protected _width: number = 1;
    protected _height: number = 1;
    protected _state: buildingState = buildingState.PLAN;
    protected _id: number;
    protected _gridX: number = 0;
    protected _gridY: number = 0;
    protected _offsetY: number = 2;
    protected _offsetX: number = 2;
    protected _isPosisionSet: boolean = false;

    public get isPosisionSet(): boolean {
        return this._isPosisionSet;
    }
    public set isPosisionSet(value: boolean) {
        this._isPosisionSet = value;
    }

    constructor(url: string, ty: buildingType) {
        this._type = ty;
        this._img = muatGambar(url);
        this._id = id.nextid;
    }

    public get offsetY(): number {
        return this._offsetY;
    }
    public set offsetY(value: number) {
        this._offsetY = value;
    }

    public get gridY(): number {
        return this._gridY;
    }
    public set gridY(value: number) {
        this._gridY = value;
        this.img.y = value * gameData.GRID_WIDTH;
        this.isPosisionSet = true;
    }

    public get gridX(): number {
        return this._gridX;
    }
    public set gridX(value: number) {
        this._gridX = value;
        this.img.x = value * gameData.GRID_WIDTH;
        this.isPosisionSet = true;
    }

    public get id(): number {
        return this._id;
    }

    public get state(): buildingState {
        return this._state;
    }
    public set state(value: buildingState) {
        this._state = value;
    }
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    public get type(): buildingType {
        return this._type;
    }

    public get img(): Basik.GbrObj {
        return this._img;
    }

    public get offsetX(): number {
        return this._offsetX;
    }
    public set offsetX(value: number) {
        this._offsetX = value;
    }
}