namespace Basik {

	export class Sound implements IAudio {
		static readonly list: IAudio[] = [];
		private static _lastSound: Sound;

		private _src: string = '';
		private _loaded: boolean = false;
		private _sound: HTMLAudioElement;
		private _playedCount: number;

		public static get lastSound(): Sound {
			return Sound._lastSound;
		}
		public static set lastSound(value: Sound) {
			Sound._lastSound = value;
		}

		public get playedCount(): number {
			return this._playedCount;
		}
		public set playedCount(value: number) {
			this._playedCount = value;
		}

		public get sound(): HTMLAudioElement {
			return this._sound;
		}
		public set sound(value: HTMLAudioElement) {
			this._sound = value;
		}

		public get loaded(): boolean {
			return this._loaded;
		}
		public set loaded(value: boolean) {
			this._loaded = value;
		}

		public get src(): string {
			return this._src;
		}
		public set src(value: string) {
			this._src = value;
		}

	}
	export const Sn = Sound;

}