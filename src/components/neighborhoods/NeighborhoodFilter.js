import NgRadio from './NeighborhoodRadio.js';

export default class NeighborhoodFilter {
	constructor(neighborhoods, filterByNeighborhoodHandler) {
		this.neighborhoods = neighborhoods;
		this.filterByNeighborhoodHandler = filterByNeighborhoodHandler;
		this.render();
	}

	render() {
		const radioList = document.querySelector('.filter-neighborhoods');
		let neighborhoodRadio = null;

		if (this.neighborhoods.length > 1) {
			radioList.addEventListener('click', this.filterByNeighborhoodHandler);
			neighborhoodRadio = new NgRadio('all', true);
			neighborhoodRadio = neighborhoodRadio.render();
			radioList.insertAdjacentElement('beforeend', neighborhoodRadio);

			for (let nb = 0; nb < this.neighborhoods.length; nb++) {
				neighborhoodRadio = new NgRadio(Object.keys(this.neighborhoods[nb])[0]);
				neighborhoodRadio = neighborhoodRadio.render();

				radioList.insertAdjacentElement('beforeend', neighborhoodRadio);
			}
		} else if (this.neighborhoods.length == 1) {
			neighborhoodRadio = new NgRadio(
				Object.keys(this.neighborhoods[0])[0],
				true
			);
			neighborhoodRadio = neighborhoodRadio.render();

			radioList.insertAdjacentElement('beforeend', neighborhoodRadio);
		}
	}
}
