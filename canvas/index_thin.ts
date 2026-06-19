window.addEventListener("load", () => {
	let imgLoaded = false;
	let submitted = false;

	console.log("form", form);

	fileInput.addEventListener("change", (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		const img = new Image();
		img.onload = () => {
			console.log("img on load");
			imgLoaded = true;

			cont.innerHTML = '';
			canvasDoc = createCanvasDoc(img, 1);
			cont.appendChild(canvasDoc);
			handleSubmit();
		};

		img.src = URL.createObjectURL(file);
	});


	form.onsubmit = (e) => {
		e.preventDefault();
		console.log("form on submit");
		submitted = true;
		handleSubmit();
	}

	async function handleSubmit() {
		console.log('handle submit');

		if (!imgLoaded) {
			console.log("img not loaded yet")
			return;
		}

		if (!submitted) {
			console.log("not submitted");
			return;
		}

		let rgb = await canvasToTRgb(canvasDoc);
		let rgbM = await rgbToBinaryMatrix(rgb);
		let res = await zhangSuenThinning(rgbM);
		drawFromMatrix(res);
		// let resClr = await binaryToTRgb(res);
		// let canvas = await TRgbToCanvas(resClr);
		// cont.appendChild(canvas);

		imgLoaded = false;
		submitted = false;
	}

})