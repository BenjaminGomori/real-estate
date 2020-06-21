import emptyNode from '../../utilities/emptyDomElement.js';
import Neighborhood from './neighborhood/Neighborhood.js';

export default class Neighborhoods {
	constructor(neighborhoodsData, modalInstance) {
		this.data = neighborhoodsData;
		this.element = document.querySelector('.neighborhoods-container');
		this.neighborhoodInstances = [];
		this.radioState = 'All';
		this.modalInstance = modalInstance;
		this.render();
	}

	render = (neighborhoods = this.data) => {
		let hook = this.element;
		emptyNode(this.element);
		let neighborhoodName = '';
		let neighborhoodApartments = null;
		let neighborhoodNumer = 0;

		for (let i = 0; i < neighborhoods.length; i++) {
			neighborhoodName = Object.keys(neighborhoods[i])[0];
			neighborhoodApartments = Object.values(neighborhoods[i])[0];
			neighborhoodNumer = i;

			let neighborhood = new Neighborhood(
				hook,
				neighborhoodName,
				neighborhoodApartments,
				neighborhoodNumer,
				this.modalInstance
			);

			this.neighborhoodInstances.push(neighborhood);
		}

		/* if 1 neighborhood -> display cards in wrapped flex box ,
		   eif 2+ 						-> display there cards as curousels */
		if (neighborhoods.length === 1) {
			this.dispalyAsWrappedFlex();
		} else {
			this.dispalyAsCurousels();
		}

		this.showHideInstancesCrslBtns();
	};

	reRender = (neighborhoodName) => {
		emptyNode(this.element);
		let neighborhood = null;

		if (neighborhoodName === 'All') {
			for (neighborhood of this.neighborhoodInstances) {
				//render all neighborhoods apartments(as curosels)
				this.element.insertAdjacentElement('beforeend', neighborhood.element);
				neighborhood.unshiftCrsl();
			}
			this.dispalyAsCurousels();
			this.showHideInstancesCrslBtns();
			return;
		}
		neighborhood = this.neighborhoodInstances.find(
			(n) => n.name === neighborhoodName
		);
		neighborhood.unshiftCrsl();

		//render one neighborhood only(as wrapping flex box)
		this.element.insertAdjacentElement('beforeend', neighborhood.element);
		this.dispalyAsWrappedFlex();
		this.showHideInstancesCrslBtns();
	};

	dispalyAsWrappedFlex = () => {
		for (let neighborhood of this.neighborhoodInstances) {
			neighborhood.curousel.slide.classList.add('carousel__slide__wrap');
			neighborhood.curousel.slide.classList.remove('carousel__slide');
		}
	};

	dispalyAsCurousels = () => {
		for (let neighborhood of this.neighborhoodInstances) {
			neighborhood.curousel.slide.classList.add('carousel__slide');
			neighborhood.curousel.slide.classList.remove('carousel__slide__wrap');
		}
	};

	showHideInstancesCrslBtns = () => {
		for (let neighborhood of this.neighborhoodInstances) {
			neighborhood.hideOrShowCrslBtns();
		}
	};

	onResize = () => {
		for (const neighborhood of this.neighborhoodInstances) {
			neighborhood.unshiftCrsl();
			setTimeout(neighborhood.hideOrShowCrslBtns, 400); //the transition time for the slide to unshift
		}
	};
}
