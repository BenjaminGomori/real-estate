import fetchNeighborhoods from '../../utilities/fetchNeighborhoods.js';
import Neighborhoods from './Neighborhoods.js';
import NeighborhoodsFilter from './NeighborhoodFilter.js';
import Modal from '../Modal.js';
import Backdrop from '../Backdrop.js';
import Spinner from '../Spinner.js';

class ApartmentPage {
	constructor() {
		this.spinner = new Spinner();
		this.spinner.display();
		fetchNeighborhoods(this.onResponse);
	}

	onResponse = (neighborhoodsApartData, er) => {
		this.spinner.undisplay();
		if (er) {
			let errMeasge = document.querySelector('.neighborhoods-container');
			errMeasge.style.padding = '20vh 30vw';
			errMeasge.innerHTML =
				'Apartments data ' +
				er +
				'<br>Please contact support at<br> 02-111111111';
			return;
		}

		this.neighborhoodsData = neighborhoodsApartData;
		this.modalInstance = new Modal(this.neighborhoodsData);
		new Backdrop(this.modalInstance.closeModal.bind(this.modalInstance));
		this.neighborhoodsInstance = new Neighborhoods(
			this.neighborhoodsData,
			this.modalInstance
		);
		new NeighborhoodsFilter(
			this.neighborhoodsData,
			this.filterByNeighborhoodHandler
		);

		this.radioState = 'All';
		window.onresize = this.neighborhoodsInstance.onResize;
	};

	filterByNeighborhoodHandler = (event) => {
		let elm = event.target;
		if (elm.nodeName !== 'INPUT' && elm.nodeName !== 'LABEL') return;

		//traverse to input element (for value property)
		if (elm.nodeName === 'LABEL') elm = elm.previousElementSibling;

		if (elm.value === this.radioState) return;

		this.radioState = elm.value;

		this.neighborhoodsInstance.reRender(this.radioState);
		event.stopPropagation();
	};
}

new ApartmentPage();
