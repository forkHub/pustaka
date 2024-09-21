namespace jhtml {

    export class Dic {
        private _k: string = '';
        public get k(): string {
            return this._k;
        }
        public set k(value: string) {
            this._k = value;
        }
        private _v: string = '';
        public get v(): string {
            return this._v;
        }
        public set v(value: string) {
            this._v = value;
        }

        constructor(k: string, v: string) {
            this._k = k;
            this._v = v;
        }
    }

    export class Builder {
        private _child: Builder[] = [];
        private _class: string = '';
        private _tag: string = '';
        private _content: string = '';
        private _id: string = '';
        private attrS: Dic[] = [];

        json(): IJhtml {
            this._tag;
            this._class
            this._content;
            this._id;

            return null;
        }

        attr(k: string, v: string): Builder {
            this.attrS.push(new Dic(k, v));
            return this;
        }

        id(s: string): Builder {
            this._id = s;
            return this;
        }

        content(s: string): Builder {
            this._content = s;
            return this;
        }

        tag(s: string): void {
            this._tag = s;
        }

        class(c: string): Builder {
            this._class = c;
            return this;
        }

        protected buildChild(): IJhtml[] {
            let h: IJhtml[];
            this._child.forEach((item) => {
                h.push(item.json());
            })
            return h;
        }

        protected c(c: Builder): Builder {
            this._child.push(c);
            return this;
        }

        childs(C: Builder[]): Builder {
            C.forEach((item) => {
                this.c(item);
            })
            return this;
        }
    }

    export class DivBuilder extends Builder {
        constructor() {
            super();
            this.tag("div");
        }
    }

    export class FormBuilder extends Builder {
        constructor() {
            super();
            this.tag("form");
        }
    }

    export class LabelBuilder extends Builder {
        private _for: string = '';
        constructor() {
            super();
            this.tag("label");
        }

        forId(s: string): Builder {
            this._for = s;
            this._for;
            return this;
        }
    }

    export class InputBuilder extends Builder {
        private _type: string = '';

        constructor() {
            super();
            this._type;
            this.tag("input");
        }

        type(s: string): Builder {
            this._type = s;
            return this;
        }
    }

}

namespace jhtml {
    export interface kv {
        key: string
        value: string
    }

    export interface IJhtml {
        tag: string
        text?: string
        class?: string

        type?: string,
        readonly?: string,
        checked?: string,
        content?: string

        child?: IJhtml[]
        klik?: (obj: IJhtml, evt: Event) => void;
        submit?: (obj: IJhtml, evt: Event) => void;
    }

    export class Jhtml {
        private idNext: number = 0;
        private _json: jhtml.IJhtml

        public get json(): jhtml.IJhtml {
            return this._json
        }
        public set json(value: jhtml.IJhtml) {
            this._json = value
        }

        constructor(j: jhtml.IJhtml) {
            this.json = j;
        }

        private getId(): string {
            this.idNext++;
            return "j" + this.idNext;
        }

        renderAr(obj: jhtml.IJhtml[], cont: HTMLElement) {
            obj.forEach((item: jhtml.IJhtml) => {
                this.render(item, cont);
            })
        }

        render(obj: jhtml.IJhtml, cont: HTMLElement) {
            let el = document.createElement(obj.tag);
            el.setAttribute("jid", this.getId());
            cont.appendChild(el);

            //form
            if (obj.type) el.setAttribute('type', obj.type);
            if (obj.readonly) el.setAttribute('readonly', obj.readonly);
            if (obj.type) el.setAttribute('type', obj.type);
            if (obj.checked) el.setAttribute('checked', obj.checked)

            //event
            if (obj.klik) {
                el.onclick = (e) => {
                    obj.klik(obj, e);
                }
            }

            if (obj.submit) {
                el.onsubmit = (e) => {
                    obj.submit(obj, e);
                }
            }

            if (obj.child) {
                this.renderAr(obj.child, cont);
            }
        }

        query(obj: jhtml.IJhtml): void {
            obj;//TODO: butuh obj parser
        }
    }

}

