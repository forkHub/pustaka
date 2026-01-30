class PolledChar {
    private _char: string;
    private _idx: number;

    public get char(): string {
        return this._char;
    }
    public set char(value: string) {
        this._char = value;
    }
    public get idx(): number {
        return this._idx;
    }
    public set idx(value: number) {
        this._idx = value;
    }
}

class Pattern {
    private _pattern: string = '';
    private _idx: number = 0;
    private _len: number = 2;
    private readonly polledChar: PolledChar[] = [];

    constructor(len: number = 2) {
        this._len = len;
    }

    public get len(): number {
        return this._len;
    }
    public set len(value: number) {
        this._len = value;
    }

    private cleanUp(): void {
        if (this.polledChar.length == 0) return;

        while (true) {
            let p = this.polledChar[0];
            if (p.idx < this._idx) {
                this.polledChar.shift();
            } else {
                break;
            }
        }

        if (this.polledChar.length > this._pattern.length) {
            debugger;
            throw Error("");
        }

    }

    private getString(): string {
        let str: string = '';
        this.polledChar.forEach((item) => {
            str += item.char;
        })

        return str;
    }

    push(p: PolledChar): void {
        this.polledChar.push(p);

        //clean up
        this.cleanUp();

        if (this._pattern == this.getString()) {
            //consume
            while (this.polledChar.length > 0) this.polledChar.pop();

            this._idx += this._pattern.length;
        }
        else {

        }
    }

    public get idx(): number {
        return this._idx;
    }
    public set idx(value: number) {
        this._idx = value;
    }

    public get pattern(): string {
        return this._pattern;
    }
    public set pattern(value: string) {
        this._pattern = value;
    }
}

class MPattern {
    readonly ls: Pattern[] = [];
    private char = '';

    poll(p: PolledChar): void {
        console.log("poll: " + p.char);

        this.char += p.char;
        console.log("this char " + this.char);

        if (this.getPatternSama(this.char)) {
            console.log("sudah ada");
        }
        else {
            console.log("gak sama");
            if (this.char.length == 1) {
                console.log("len 1, push " + this.char);
                let p = new Pattern(this.char.length);
                p.pattern = this.char;
                this.ls.push(p);
            }
            else {
                if (this.checkSebelum(this.char.slice(0, this.char.length - 1))) {
                    let p = new Pattern(this.char.length);
                    p.pattern = this.char;
                    this.ls.push(p);
                }
                else {

                }

                console.log("shift");
                this.char = this.char.slice(1);

                // console.log("pattern baru: " + this.char);
                // let p = new Pattern(this.char.length);
                // p.pattern = this.char;
                // this.ls.push(p);
            }
        }
    }

    checkSebelum(char: string): boolean {
        return this.getPatternSama(char) != null;
    }

    getPatternSama(char: string): Pattern {
        let res: Pattern;

        this.ls.forEach((item) => {
            if (item.pattern == char) {
                res = item;
            }
        })

        return res;
    }

    getPatternByLen(n: number = 2): Pattern[] {
        let res: Pattern[] = [];

        this.ls.forEach((item) => {
            if (item.len == n) {
                res.push(item);
            }
        })

        return res;
    }
}