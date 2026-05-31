/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

$(document).ready(function() {
	pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs';

	var pageNum = 1;
	pdfjsLib.getDocument('pepper_cv.pdf')
		.promise
		.then(pdf => {
			for (let i=1; i<5; i++) {
				pdf.getPage(i).then(page => {
					let outputScale = window.devicePixelRatio || 1;
					let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
					var desiredWidth = Math.min(1000, $(window).width());
					var viewport = page.getViewport({ scale: 1, });
					var scale = desiredWidth / viewport.width;
					viewport = page.getViewport({ scale: scale, });

					let canvas = document.getElementById('canvas' + pageNum);
					pageNum++;
					let context = canvas.getContext('2d');

					canvas.width = Math.floor(viewport.width * outputScale);
					canvas.height = Math.floor(viewport.height * outputScale);
					canvas.style.width = Math.floor(viewport.width) + 'px';
					canvas.style.height =  Math.floor(viewport.height) + 'px';

					let renderContext = {
						canvasContext: context,
						transform,
						viewport,
					};

					page.render(renderContext);
				});
			}
		})
		.catch(console.error);
});
