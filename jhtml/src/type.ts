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
