document.addEventListener('DOMContentLoaded', () => {
	//Test
	function populateCarouselCount () {
		//Take count of images from dom and dynamically generate dot indicators on carousel
		var carouselCount = Array.from(document.querySelectorAll('.carousel-inner .item'));
		var carouselIndicators = document.querySelector('.carousel-indicators');
		carouselCount.map((_,i) => {
			var li = document.createElement('li');
			li.dataset.target = ('#carousel-example-generic');
			li.setAttribute('data-slide-to', i);
			if (i == 0) li.classList = ('active');
			carouselIndicators.appendChild(li);
		});
	}

	


	function init () {
		populateCarouselCount();
		
		}

	init();
}); //DOMContentLoaded