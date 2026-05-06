export class Scalar<T extends number | string> {
    private static id:number=0;

    private _value: T;
    private listener: {id:number, f:(oldValue: T, newValue: T)=>void}[] = [];

    constructor(v: T) {
        this._value = v;
    }

    addListener(f:() => void):number {
        Scalar.id++;
        this.listener.push({
            id: Scalar.id,
            f: f
        });
        return Scalar.id;
    }

    removeListener(id:number):void {
        for (let i = 0; i < this.listener.length; i++) {
            if (this.listener[i].id == id) {
                this.listener.splice(i, 1);
                return;
            }
        }
    }

    clearListener() {
        this.listener=[];
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T) {
        let oldValue = this._value;
        this._value = value;

        this.listener.forEach((item) => {
            item.f(oldValue, value);
        });
    }
}