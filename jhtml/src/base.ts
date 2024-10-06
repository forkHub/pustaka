namespace jhtml {

    export class Builder {
        private _child: Builder[] = [];
        private attrS: Dic[] = [];
        protected htmlEl: HTMLElement;

        static create(tag: string): Builder {
            return new Builder([]).tag(tag);
        }

        constructor(b: Builder[]) {
            this.append(b);
        }

        html(): HTMLElement {
            if (this.htmlEl) return this.htmlEl;

            this.attrS.forEach((item) => {
                this.htmlEl.setAttribute(item.k, item.v);
            });

            this._child.forEach((item) => {
                this.htmlEl.appendChild(item.html());
            })

            return this.htmlEl;
        }

        getAttr(k: string): Dic {
            for (let i = 0; i < this.attrS.length; i++) {
                if (this.attrS[i].k == k) return this.attrS[i];
            }

            return null;
        }

        setAttr(k: string, v: string): Builder {
            for (let i = 0; i < this.attrS.length; i++) {
                if (this.attrS[i].k == k) {
                    this.attrS[i].v = v;
                    return this;
                }
            }

            this.attrS.push(new Dic(k, v));
            return this;
        }

        id(s: string): Builder {
            this.setAttr("id", s);
            return this;
        }

        content(s: string): Builder {
            this.setAttr("content", s);
            return this;
        }

        tag(s: string): Builder {
            this.setAttr("tag", s);
            return this;
        }

        class(c: string): Builder {
            this.setAttr("class", c);
            return this;
        }

        protected child(c: Builder): Builder {
            this._child.push(c);
            return this;
        }

        prepend(c: Builder[]): Builder {
            c.forEach((item) => {
                this._child.unshift(item);
            });
            return this;
        }

        append(C: Builder[]): Builder {
            C.forEach((item) => {
                this.child(item);
            })
            return this;
        }
    }
}
