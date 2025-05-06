///<reference path="./Route.ts"/>

const S = Basik.Sn;
function LoadSound(url: string): void {
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
	}
	sound.src = url;

	S.list.push(s);

}

function PlaySound(s: IAudio): void {
	s.sound.play();
}

function SoundEnded(s: IAudio): boolean {
	let h = s.playedCount;
	s.playedCount = 0;
	return (h > 0);
}

function SoundLoaded(s: IAudio): boolean {
	return s.loaded;
}
