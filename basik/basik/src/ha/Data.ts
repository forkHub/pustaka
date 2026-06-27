namespace Basik {
	class Data {
		private _soundEvent: HTMLAudioElement;
		private _init: boolean = false;

		public get init(): boolean {
			return this._init;
		}
		public set init(value: boolean) {
			this._init = value;
		}

		public get soundEvent(): HTMLAudioElement {
			return this._soundEvent;
		}
		public set soundEvent(value: HTMLAudioElement) {
			this._soundEvent = value;
		}

	}


	export const data: Data = new Data();
}