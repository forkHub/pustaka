namespace ha.be {
    class Config {
        private _supportGl: boolean = false;

        public get supportGl(): boolean {
            return this._supportGl;
        }
        public set supportGl(value: boolean) {
            this._supportGl = value;
        }
    }

    export var config: Config = new Config();
}
