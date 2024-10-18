namespace B256 {
    var temp = '';
    var bin = '';
    var base = '';

    console.log("test");
    console.log("▒".codePointAt(0));
    console.log("Γ".codePointAt(0));

    console.group("tambah ");
    for (let i = 0; i <= 255; i++) {
        tambah(i);
    }
    console.groupEnd();

    console.log("temp:", temp);

    function tambah(i: number): void {
        if (i < 32) return;
        if (i == 127) return;
        console.log(String.fromCharCode(177));
        temp += String.fromCharCode(177);
    }

    export function toStr(s: string): string {
        bin = '';
        for (let i = 0; i < s.length; i++) {
            let code = s.charCodeAt(i);
            bin += code.toString(2);
            while (bin.length >= 8) {
                toBase();
            }
        }

        if (bin.length > 0) {
            toBase();
        }

        return base;
    }

    function toBase() {
        let check = '';
        let code = 0;

        //test 8
        check = bin.slice(0, 8);
        code = parseInt(check, 10);
        if (code <= temp.length) {
            base += temp.charAt(code);
            bin = bin.slice(8);
            return;
        }

        //test 7
        check = bin.slice(0, 7);
        code = parseInt(check, 10);
        base += temp.charAt(code);
        bin = bin.slice(7);
        return;
    }
}