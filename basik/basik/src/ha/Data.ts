namespace Basik {
	//TODO: semua state dan data taruh di sini
	class Data {
		private _soundEvent: HTMLAudioElement;

		public get soundEvent(): HTMLAudioElement {
			return this._soundEvent;
		}
		public set soundEvent(value: HTMLAudioElement) {
			this._soundEvent = value;
		}

	}


	let _data: Data = new Data();
	export function data(): Data {
		return _data;
	}
}