export default class Spinner {
	constructor(hook) {
		this.element = document.querySelector('.spinner');
		this.element.classList.add('is-not-displayed');
	}

	display = () => {
		this.element.classList.remove('is-not-displayed');
	};

	undisplay = () => {
		this.element.classList.add('is-not-displayed');
	};
}
