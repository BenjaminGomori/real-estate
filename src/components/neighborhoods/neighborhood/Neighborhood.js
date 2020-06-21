import Curousel from '../../curousel/Curousel.js';

export default class Neighborhood {
	constructor(hook, name, apartmentsData, neighborhoodNumber, modalInstance) {
		this.hook = hook;
		this.element = null;
		this.name = name;
		this.apartmentsData = apartmentsData;
		this.neighborhoodNumber = neighborhoodNumber;
		this.modalInstance = modalInstance;
		this.curousel = null;
		this.render();
	}

	render() {
		let paddingWrapper = document.createElement('div');
		let neighborhood = document.createElement('div');
		let neighborhoodName = document.createElement('h2');

		paddingWrapper.classList.add('padding-wrapper');
		neighborhood.classList.add('neighborhood');
		neighborhoodName.classList.add('neighborhood__name');
		neighborhoodName.innerHTML =
			this.name.charAt(0).toUpperCase() + this.name.slice(1);

		paddingWrapper.insertAdjacentElement('beforeend', neighborhood);
		neighborhood.insertAdjacentElement('beforeend', neighborhoodName);

		let curouselCardsData = [];
		let curouselCardsEvents = [];
		for (let i = 0; i < this.apartmentsData.length; i++) {
			//preparing data for cursouel cards
			let cardData = {
				img: this.apartmentsData[i].mainImage,
				properties: [
					'$ ' + this.apartmentsData[i].price,
					this.apartmentsData[i].room + ' bedrooms',
				],
				discreptionAttributes: this.apartmentsData[i].attributes,
			};
			curouselCardsEvents.push(this.apartmentsData[i]);
			curouselCardsData.push(cardData);
		}

		let curouselHook = neighborhood;
		let curousel = new Curousel(
			curouselHook,
			this.neighborhoodNumber,
			['neighborhood__carousel'],
			curouselCardsData,
			curouselCardsEvents,
			this.modalInstance
		);
		this.curousel = curousel;
		this.element = paddingWrapper;
		this.hook.insertAdjacentElement('beforeend', this.element);
	}

	hideOrShowCrslBtns = () => {
		//if slide display is flex box with wrap (not as corousel)
		if (this.curousel.slide.classList.contains('carousel__slide__wrap')) {
			this.dispalyAsWrappedFlexBox();
			return;
		}
		//if small screen amd display is block (not as corousel)
		if (
			window.getComputedStyle(this.curousel.slide, null).display + '' ===
			'block'
		) {
			this.dispalyAsBlocks();
			return;
		}

		this.dispalyAsCarousel();
	};

	dispalyAsBlocks = () => {
		this.curousel.btnLeft.style.display = 'none';
		this.curousel.btnRight.style.display = 'none';

		this.curousel.btnLeft.querySelector('.polyline').style.visibility =
			'hidden';
		this.curousel.btnLeft.querySelector('.line').style.visibility = 'hidden';
		this.curousel.btnRight.querySelector('.polyline').style.visibility =
			'hidden';
		this.curousel.btnRight.querySelector('.line').style.visibility = 'hidden';

		this.curousel.slideShiftCounter = 0;
		this.curousel.slide.style.transform = 'translateX(0px)';
	};

	dispalyAsWrappedFlexBox = () => {
		this.curousel.btnLeft.style.display = 'none';
		this.curousel.btnRight.style.display = 'none';

		//removes margin from nighborhood h2 tag (nighborhood's name)
		this.curousel.element.previousElementSibling.classList.add(
			'no-margin-left'
		);

		this.curousel.btnLeft.querySelector('.polyline').style.visibility =
			'hidden';
		this.curousel.btnLeft.querySelector('.line').style.visibility = 'hidden';
		this.curousel.btnRight.querySelector('.polyline').style.visibility =
			'hidden';
		this.curousel.btnRight.querySelector('.line').style.visibility = 'hidden';

		this.curousel.slideShiftCounter = 0;
		this.curousel.slide.style.transform = 'translateX(0px)';
	};

	dispalyAsCarousel = () => {
		this.curousel.btnLeft.style.display = 'grid';
		this.curousel.btnRight.style.display = 'grid';

		this.adjustNeighborhoodTitle();

		this.curousel.adjustCarouselBtnLeft();

		this.curousel.adjustCarouselBtnRight();
	};

	adjustNeighborhoodTitle = () => {
		this.curousel.element.previousElementSibling.classList.remove(
			'no-margin-left'
		);
	};

	unshiftCrsl() {
		this.curousel.unshiftSlide();
	}
}
