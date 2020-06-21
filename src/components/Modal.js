import Thumbnail from './thumbnail/Thumbnail.js';
import emptyNode from '../utilities/emptyDomElement.js';

export default class Modal {
	constructor() {
		this.modal = document.querySelector('.grid-modal');
		this.backdrop = document.querySelector('.backdrop');
		this.modalCloseButton = document.querySelector('.grid-modal__close');
		this.modalCloseButton.addEventListener('click', this.closeModal.bind(this));
	}

	closeModal = () => {
		this.modal.style.visibility = 'hidden';
		this.backdrop.style.visibility = 'hidden';
	};

	openModal = (apartment, event) => {
		this.backdrop.style.visibility = 'visible';
		this.modal.style.visibility = 'visible';

		this.appenndModalSideBar(apartment);
		this.appenndModalThumbnail(apartment);
		event.stopPropagation();
	};

	//SideBar displays apartment and its broker info
	appenndModalSideBar = (passedApartment) => {
		const sideBar = document.querySelector('.grid-modal__side-bar');
		emptyNode(sideBar);

		const aprtInformation = document.createElement('div');
		const brokerInformation = document.createElement('div');

		const imgBroker = document.createElement('img');
		const nameBroker = document.createElement('p');
		const emailBroker = document.createElement('p');
		const price = document.createElement('p');
		const room = document.createElement('p');
		const sqrM = document.createElement('p');
		const floor = document.createElement('p');
		const balconies = document.createElement('p');
		const parking = document.createElement('p');

		imgBroker.classList.add('grid-modal__side-bar__broker-information__img');
		brokerInformation.classList.add('grid-modal__side-bar__broker-information');
		aprtInformation.classList.add('grid-modal__side-bar__aprt-information');

		nameBroker.innerHTML = passedApartment.broker.brokerName + '  ';
		emailBroker.innerHTML = '' + passedApartment.broker.brokerEmail;
		imgBroker.src = passedApartment.broker.brokerImage;
		price.innerHTML = 'Price: ' + passedApartment.price;
		room.innerHTML = 'Rooms: ' + passedApartment.room;
		sqrM.innerHTML = 'm<sup>2</sup>: ' + passedApartment.sqrM;
		floor.innerHTML = 'Floor: ' + passedApartment.floor;
		balconies.innerHTML = 'Balconies: ' + passedApartment.balconies;
		parking.innerHTML = 'Parking: ' + passedApartment.parking;

		aprtInformation.insertAdjacentElement('beforeend', price);
		aprtInformation.insertAdjacentElement('beforeend', room);
		aprtInformation.insertAdjacentElement('beforeend', sqrM);
		aprtInformation.insertAdjacentElement('beforeend', floor);
		aprtInformation.insertAdjacentElement('beforeend', balconies);
		aprtInformation.insertAdjacentElement('beforeend', parking);
		brokerInformation.insertAdjacentElement('beforeend', nameBroker);
		brokerInformation.insertAdjacentElement('beforeend', emailBroker);
		brokerInformation.insertAdjacentElement('beforeend', imgBroker);

		sideBar.insertAdjacentElement('beforeend', aprtInformation);
		sideBar.insertAdjacentElement('beforeend', brokerInformation);
	};

	appenndModalThumbnail = (passedApartment) => {
		const modalMainImg = document.querySelector('.grid-modal__slide img');
		const modalThumbnails = document.querySelector('.grid-modal__thumbnail');

		new Thumbnail(
			modalMainImg,
			modalThumbnails,
			passedApartment.mainImage,
			passedApartment.images
		);
	};
}
