window.onload = () => {
	Graphics(500, 640);

	function update() {
		// Cls(0, 0, 0, 100);
		Cls(255, 255, 255, 100);
		Basik.Graphic.FillColor(0, 0, 0, 100);
		Basik.Teks.Font("Comic Sans MS");
		Basik.Teks.Rata("left");
		Basik.Teks.jarak = 64;

		Basik.Graphic.context.strokeStyle = "rgba(0,0,0,.5)";
		for (let i = 0; i < 100; i++) {
			let t = i * 64 + 17;
			Basik.Graphic.Garis(0, t, 1000, t);
			Basik.Graphic.Garis(0, t + 14, 1000, t + 14);
		}

		Basik.Graphic.context.strokeStyle = "";
		Basik.Teks.Goto(0, 30);
		Basik.Teks.WriteLn("Aku sayang adik");
		Basik.Teks.WriteLn("");
		Basik.Teks.WriteLn("Dia lebih kecil dariku");
		Basik.Teks.WriteLn("");
		Basik.Teks.WriteLn("Aku pinjami adik mainanku");
		Basik.Teks.WriteLn("");
		Basik.Teks.WriteLn("Aku beri adik kertas dan krayonku");
		Basik.Teks.WriteLn("");
		Basik.Teks.WriteLn("Aku ajari adik memakai sepatu");
		Basik.Teks.WriteLn("");



		window.requestAnimationFrame(update);
	}
	update();

}