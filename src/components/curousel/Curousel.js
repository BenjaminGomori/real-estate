import ApartmentCard from './Card.js';

//this carousel has two buttons and and a Slide
export default class Curousel {
	constructor(
		hook,
		neighborhoodNumber,
		additonalClasses,
		cardsData, // parallel array
		cardsEvents, //parallel array
		modalInstance
	) {
		this.hook = hook;
		this.element = null; //curousel
		this.additonalClasses = additonalClasses;
		this.neighborhoodNumber = neighborhoodNumber; //starts as index at 0
		this.cardsData = cardsData;
		this.cardsEvents = cardsEvents;
		this.modalInstance = modalInstance;
		this.slideWrapper = null;
		this.slide = null;
		this.btnLeft = null;
		this.btnSvgLeft = null;
		this.btnRight = null;
		this.btnSvgRight = null;
		this.slideShiftCounter = 0;
		this.render();
	}

	render() {
		this.initializeElement();
		this.appendBtnLeft();
		this.appendSlide();
		this.appendBtnRight();
		this.hook.insertAdjacentElement('beforeend', this.element);
	}

	appendBtnLeft() {
		this.btnLeft = document.createElement('div');
		this.btnLeft.classList.add('carousel__btn-left-container--tall');
		this.btnLeft.dataset.neighborhoodNumber = this.neighborhoodNumber;

		let templateBtnLeft = document.querySelector('#tmpl-btn-left');
		let svgElement = templateBtnLeft.content.querySelector('svg');
		let btnLeftInstance = svgElement.cloneNode(true);

		btnLeftInstance.dataset.neighborhoodNumber = this.neighborhoodNumber;
		btnLeftInstance.addEventListener('click', this.onBtnLeft);
		btnLeftInstance.classList.add('disabled-svg');
		btnLeftInstance.querySelector('.polyline').style.visibility = 'hidden';
		btnLeftInstance.querySelector('.line').style.visibility = 'visible';

		this.btnLeft.insertAdjacentElement('beforeend', btnLeftInstance);
		this.btnSvgLeft = this.btnLeft.querySelector('.svg-btn-left');
		this.element.insertAdjacentElement('beforeend', this.btnLeft);
	}

	appendBtnRight() {
		this.btnRight = document.createElement('div');
		this.btnRight.classList.add('carousel__btn-right-container--tall');
		this.btnRight.dataset.neighborhoodNumber = this.neighborhoodNumber;

		let templateBtnRight = document.querySelector('#tmpl-btn-right');
		let svgElement = templateBtnRight.content.querySelector('svg');
		let btnRightInstance = svgElement.cloneNode(true);

		btnRightInstance.dataset.neighborhoodNumber = this.neighborhoodNumber;
		btnRightInstance.addEventListener('click', this.onBtnRight);
		btnRightInstance.querySelector('.polyline').style.visibility = 'visible';
		btnRightInstance.querySelector('.line').style.visibility = 'hidden';

		this.btnRight.insertAdjacentElement('beforeend', btnRightInstance);
		this.btnSvgRight = this.btnRight.querySelector('.svg-btn-right');
		this.element.insertAdjacentElement('beforeend', this.btnRight);
	}

	appendSlide() {
		this.slideWrapper = document.createElement('div');
		this.slide = document.createElement('div');
		this.slideWrapper.classList.add('wrapper__carousel__slide');
		this.slide.classList.add('carousel__slide');

		this.slideWrapper.insertAdjacentElement('beforeend', this.slide);
		this.element.insertAdjacentElement('beforeend', this.slideWrapper);

		let hook = this.slide;

		for (let i = 0; i < this.cardsData.length; i++) {
			let cardData = this.cardsData[i];
			let addEvent = this.modalInstance.openModal.bind(
				this.modalInstance,
				this.cardsEvents[i]
			);
			new ApartmentCard(hook, cardData, addEvent);
		}
	}

	initializeElement() {
		this.element = document.createElement('div');
		this.element.classList.add('carousel');

		for (const cls of this.additonalClasses) {
			this.element.classList.add('' + cls);
		}
	}

	onBtnLeft = (event) => {
		this.slideShiftCounter += 1;
		this.slide.style.transform = `translateX(${
			(+this.slide.firstElementChild.firstElementChild.offsetWidth + 20) *
			this.slideShiftCounter
		}px `;

		this.adjustCarouselBtnLeft();
		this.adjustCarouselBtnRight('Left');

		event.stopPropagation();
	};

	onBtnRight = (event) => {
		this.slideShiftCounter -= 1;

		this.slide.style.transform = `translateX(${
			(+this.slide.firstElementChild.firstElementChild.offsetWidth + 20) *
			this.slideShiftCounter
		}px `;

		this.adjustCarouselBtnLeft();
		this.adjustCarouselBtnRight('Right');

		event.stopPropagation();
	};

	adjustCarouselBtnLeft = () => {
		//if slide is not shiftet to the left disable left btn
		if (this.slideShiftCounter >= 0) {
			this.btnSvgLeft.classList.add('disabled');
			this.btnSvgLeft.classList.add('disabled-svg');

			this.btnLeft.querySelector('.polyline').style.visibility = 'hidden';
			this.btnLeft.querySelector('.line').style.visibility = 'visible';
		} else {
			this.btnSvgLeft.classList.remove('disabled');
			this.btnSvgLeft.classList.remove('disabled-svg');

			this.btnLeft.querySelector('.polyline').style.visibility = 'visible';
			this.btnLeft.querySelector('.line').style.visibility = 'hidden';
		}
	};

	adjustCarouselBtnRight = (btnClicked) => {
		const btnCrslWidth = this.btnRight.offsetWidth;
		let scroledDirection = 0;

		if (!btnClicked) scroledDirection = 0;
		if (btnClicked === 'Right') scroledDirection = -1;
		else if (btnClicked === 'Left') scroledDirection = 1;

		let adjusterForScrolToIncludeLastScroll =
			scroledDirection * (this.slide.firstElementChild.offsetWidth + 20);

		if (
			this.element.offsetWidth - 2 * btnCrslWidth <
			this.slideWrapper.scrollWidth + adjusterForScrolToIncludeLastScroll
		) {
			this.btnSvgRight.classList.remove('disabled');
			this.btnSvgRight.classList.remove('disabled-svg');
			this.btnRight.querySelector('.polyline').style.visibility = 'visible';
			this.btnRight.querySelector('.line').style.visibility = 'hidden';
		} else {
			this.btnSvgRight.classList.add('disabled');
			this.btnSvgRight.classList.add('disabled-svg');
			this.btnRight.querySelector('.polyline').style.visibility = 'hidden';
			this.btnRight.querySelector('.line').style.visibility = 'visible';
		}
	};

	unshiftSlide = () => {
		this.slideShiftCounter = 0;
		this.slide.style.transform = 'translateX(0)';
	};
}
