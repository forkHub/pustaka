import type { UIBase } from "./UIBase";

export class UIManager {
    protected static list:UIBase[] = []; 

    static add(ui:UIBase):void {
        UIManager.list.push(ui);
    }
    
    static getById(id:number):UIBase|null {
        let ui = UIManager.list.filter(item => item.id == id);
        return ui.length>0?ui[0]:null;
    }

    static getByType<T>(classRef:new (...args: any[]) => T):T[] {
        return UIManager.list.filter(item => item instanceof classRef) as T[];
    }

    static getFree<T extends UIBase>(classRef: new (...args: any[]) => T): T[] {
        return UIManager.getByType(classRef).filter(item => item.parent == null) as T[];
    }

    static removeById(id:number):void {
        let ui = UIManager.getById(id);
        if (ui) ui.remove();
        UIManager.list = UIManager.list.filter(item => item.id !== id);
    }

	static render() {
		UIManager.list.forEach((ui) => {
			ui.render();
		});
	}    
}