namespace Basik {
    export class Keyboard {
        public static init() {

            window.addEventListener("keydown", (e: KeyboardEvent) => {
                try {
                    (window as any).KeyDownEvent(e.key);
                }
                catch (e) { e; }
            })

            window.addEventListener("keyup", (e: KeyboardEvent) => {
                try {
                    (window as any).KeyUpEvent(e.key);
                }
                catch (e) { e; }
            })
        }
    }
}