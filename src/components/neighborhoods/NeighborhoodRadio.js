export default class NeighborhoodRadio {
	constructor(neighborhood, checked = false) {
		this.neighborhood = neighborhood;
		this.checked = checked;
		this.render();
	}

	render() {
		const radioDiv = document.createElement('div');
		radioDiv.classList.add('filter-neighborhood');

		let name = this.neighborhood.toLowerCase();
		let nameCapitilized = name.charAt(0).toUpperCase() + name.slice(1);

		const radio = document.createElement('input');
		radio.type = 'radio';
		radio.id = name;
		radio.name = 'Neighborhood';
		radio.value = nameCapitilized;
		radio.checked = this.checked;
		radio.classList.add('radio');

		const label = document.createElement('label');
		label.classList.add('filter-neighborhood__label');
		label.htmlFor = name;
		label.textContent = nameCapitilized;

		radioDiv.insertAdjacentElement('beforeend', radio);
		radioDiv.insertAdjacentElement('beforeend', label);

		return radioDiv;
	}
}
