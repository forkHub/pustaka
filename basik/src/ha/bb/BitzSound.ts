///<reference path="./Route.ts"/>

const S = Basik.Sn;

/**
 * Load sound
 * @param url {string} the url
 * @returns {Basik.Sound} 
 */
function LoadSound(url: string): Basik.Sound {
	let sound: HTMLAudioElement = document.createElement("audio");

	let s = new S();
	s.src = url;
	s.loaded = false;
	s.sound = sound;

	sound.onload = () => {
		s.loaded = true;
	}

	sound.onended = () => {
		s.playedCount++;
		try {
			(window as any).SoundEnded(s);
		} catch (e) { }
	}
	sound.src = url;

	S.list.push(s);
	return s;
}

/**
 * Play Sound
 * @param s {Basic.Sound}
 */
function PlaySound(s: Basik.Sound): void {
	s.sound.play();
}

/**
 * Check if a sound has been loaded
 * @param s {Basik.Sound} the sound object
 * @returns {boolean}
 */
function SoundLoaded(s: Basik.Sound): boolean {
	return s.loaded;
}
