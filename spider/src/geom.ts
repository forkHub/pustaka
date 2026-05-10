export type Pos = {
	x: number,
	y: number
}

class Geom {
	readonly deg2rad = Math.PI / 180;

	sudutNormal(x: number, y: number) {
		let θ = Math.atan2(y, x) * (180 / Math.PI); // hasil derajat
		if (θ < 0) θ += 360; // normalisasi ke 0–360
		return θ;
	}

}

export const geom = new Geom();