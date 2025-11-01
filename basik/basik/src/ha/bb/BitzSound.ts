///<reference path="./Route.ts"/>

const S = Basik.Sn;

//TODO: load dari nama file, url resolve otomatis
/**
 * Load sound
 * @param url {string} the url
 * @returns {Basik.Sound} 
 */
function muatSuara(url: string): HTMLAudioElement {
	let sound: HTMLAudioElement = document.createElement("audio");

	sound.onload = () => {
		Basik.Sound.lastSound = sound;
		// Basik.Event.dispatchEvent(Basik.Evt.SOUND_LOADED);
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
	sound.src = "asset/" + url;

	return sound;
}

/**
 * Play Sound
 * @param s {Basic.Sound}
 */
function mainkanSuara(s: HTMLAudioElement): void {
	s.play();
}

function suaraEvent() {
	return Basik.Sound.lastSound;
}
