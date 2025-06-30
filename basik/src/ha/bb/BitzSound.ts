///<reference path="./Route.ts"/>

const S = Basik.Sn;

/**
 * Load sound
 * @param url {string} the url
 * @returns {Basik.Sound} 
 */
function LoadSound(url: string): HTMLAudioElement {
	let sound: HTMLAudioElement = document.createElement("audio");

	sound.onload = () => {
		Basik.Sound.lastSound = sound;
		Basik.Event.dispatchEvent(Basik.Evt.SOUND_LOADED);
		console.log("sound loaded");
	}

	sound.onended = () => {
		try {
			Basik.Sound.lastSound = sound;
			Basik.Event.dispatchEvent(Basik.Evt.SOUND_ENDED);
			console.log("sound ended");
		} catch (e) {

		}
	}
	sound.src = url;

	return sound;
}

/**
 * Play Sound
 * @param s {Basic.Sound}
 */
function PlaySound(s: HTMLAudioElement): void {
	s.play();
}

function LastSound() {
	return Basik.Sound.lastSound;
}
