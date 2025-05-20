///<reference path="./Route.ts"/>

const S = Basik.Sn;
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

function PlaySound(s: Basik.IAudio): void {
	s.sound.play();
}

function SoundLoaded(s: Basik.IAudio): boolean {
	return s.loaded;
}
