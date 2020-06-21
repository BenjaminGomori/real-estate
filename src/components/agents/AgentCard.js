export default class AgentCard {
	constructor(agent) {
		this.data = agent;
		this.element = null;
		this.render();
	}

	render() {
		this.element = document.createElement('div');
		this.element.classList.add('agent');
		this.appendImage();
		this.appendName();
		this.appendDescrption();
		this.appendContact();
	}

	appendImage() {
		let imgContainer = document.createElement('div');
		let image = document.createElement('img');

		imgContainer.classList.add('agent__img-container');
		image.classList.add('agent__img');
		image.src = this.data.profileImage;
		imgContainer.insertAdjacentElement('beforeend', this.element);
		this.element.insertAdjacentElement('beforeend', image);
	}

	appendName() {
		let nameTitle = document.createElement('h2');

		nameTitle.classList.add('agent__nameAsTitle');
		nameTitle.innerHTML = this.data.fullName;
		this.element.insertAdjacentElement('beforeend', nameTitle);
	}

	appendDescrption() {
		let discription = document.createElement('p');

		discription.classList.add('agent__descriptiom');
		discription.innerHTML = this.data.description;
		this.element.insertAdjacentElement('beforeend', discription);
	}

	appendContact() {
		let contactInfo = document.createElement('div');
		let phone = document.createElement('p');
		let email = document.createElement('p');

		contactInfo.classList.add('agent__contact');
		phone.innerHTML = '&nbsp;&nbsp;Cell:	' + this.data.cellPhone + '';
		email.innerHTML = 'Email: ' + this.data.email + '';
		contactInfo.insertAdjacentElement('beforeend', email);
		contactInfo.insertAdjacentElement('beforeend', phone);
		this.element.insertAdjacentElement('beforeend', contactInfo);
	}
}
