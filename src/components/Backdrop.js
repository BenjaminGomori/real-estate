export default class Backdrop {
	constructor(closeModal) {
		this.backdrop = document.querySelector('.backdrop');
		this.backdrop.addEventListener('click', closeModal);
	}
}
