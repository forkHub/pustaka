namespace Basik {
    export class Keyboard {
        private static _key: string;
        public static get key(): string {
            return Keyboard._key;
        }

        public static init() {

            window.addEventListener("keydown", (e: KeyboardEvent) => {
                Keyboard._key = e.key;

                let f = (window as any)["KeyDown"];
                if (typeof f == "function") f();
            })

            window.addEventListener("keyup", (e: KeyboardEvent) => {
                Keyboard._key = e.key;

                let f = (window as any)["KeyUp"];
                if (typeof f == "function") f();

            })
        }
    }
}