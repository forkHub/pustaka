namespace Basik {
	class Data {
		private _soundEvent: HTMLAudioElement;

		public get soundEvent(): HTMLAudioElement {
			return this._soundEvent;
		}
		public set soundEvent(value: HTMLAudioElement) {
			this._soundEvent = value;
		}

	}


	export const data: Data = new Data();
}