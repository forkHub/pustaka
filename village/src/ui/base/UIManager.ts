import type { UIBase } from "./UIBase";

export class UIManager {
    protected static _list:UIBase[] = []; 

    static add(ui:UIBase):void {
        UIManager._list.push(ui);
    }

    static getByParentId(parentId:number):UIBase[] {
        return UIManager._list.filter(item => {
            return item.parent?.id == parentId;
        })
    }
    
    static getById(id:number):UIBase|null {
        for (const item of UIManager._list) {
            if (item.id == id) return item;
        }
        return null;
    }

    static getByType<T>(classRef:new (...args: any[]) => T):T[] {        
        return UIManager._list.filter(item => item instanceof classRef) as T[];
    }

    static get list():UIBase[] {
        return UIManager._list.slice();
    }

    static getFree<T extends UIBase>(classRef: new (...args: any[]) => T): T[] {
        return UIManager.getByType(classRef).filter(item => item.parent == null) as T[];
    }

    // static removeById(id:number):void {
    //     let ui = UIManager.getById(id);
    //     if (ui) ui.remove();
    //     UIManager._list = UIManager._list.filter(item => item.id !== id);
    // }

	static render() {
		UIManager._list.forEach((ui) => {
			ui.render();
		});
	}    
}