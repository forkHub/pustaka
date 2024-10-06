namespace jhtml {

    export class FormBuilder extends Builder {
        constructor(b: Builder[]) {
            super(b);
            this.tag("form");
        }
    }

    export class LabelBuilder extends Builder {
        private _for: string = '';
        constructor(b: Builder[]) {
            super(b);
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

        constructor(b: Builder[]) {
            super(b);
            this._type;
            this.tag("input");
        }

        type(s: string): Builder {
            this._type = s;
            return this;
        }
    }

    //TODO: depecrated
    export class SpanBuilder extends Builder {
        constructor(b: Builder[]) {
            super(b);
            this.tag("span");
        }
    }

}

