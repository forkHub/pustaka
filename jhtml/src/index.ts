namespace jhtml {
    export interface kv {
        key: string
        value: string
    }

    export interface IJhtml {
        tag: string
        text?: string

        type?: string,
        readonly?: string,
        checked?: string,

        child?: IJhtml[]
        klik?: (obj: IJhtml, evt: Event) => void;
        submit?: (obj: IJhtml, evt: Event) => void;
    }

    export function br(): IJhtml {
        return {
            tag: 'br'
        }
    }
}

namespace jhtml {
    var idNext: number = 0;

    function getId(): string {
        idNext++;
        return "j" + idNext;
    }

    function renderAr(obj: IJhtml[], cont: HTMLElement) {
        obj.forEach((item: IJhtml) => {
            render(item, cont);
        })
    }

    export function render(obj: IJhtml, cont: HTMLElement) {
        let el = document.createElement(obj.tag);
        el.setAttribute("jid", getId());
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
            renderAr(obj.child, cont);
        }
    }

    export function query(obj: IJhtml): void {
        obj;//TODO: butuh obj parser
    }
}

window.onload = () => {
    let form: jhtml.IJhtml = {
        tag: 'form', child: [
            {
                tag: 'div', child: [
                    { tag: 'label', text: 'Login:' },
                    { tag: 'br' },
                    { tag: 'input', type: 'text' },
                ]
            },
            {
                tag: 'div', child: [
                    { tag: 'input', type: 'submit' }
                ]
            }
        ]
    }

    jhtml.render(form, document.body);
}
