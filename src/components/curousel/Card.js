export default class Card {
	constructor(hook, cardData, addEvent) {
		this.element = null;
		this.cardData = cardData;
		this.eventListner = addEvent;
		this.hook = hook;
		this.render();
	}

	render() {
		this.element = document.createElement('div');
		this.element.classList.add('carousel__card');

		this.buildInnerHtml();
		this.addEvent();
		this.hook.insertAdjacentElement('beforeend', this.element);
	}

	buildInnerHtml() {
		let inner = '';

		inner = ` <img class="carousel__card__image" src="${this.cardData.img}" alt="apartment" >`;

		for (let property of this.cardData.properties) {
			inner += `<p class="carousel__card__p">${property}</p>`;
		}

		if (this.cardData.discreptionAttributes) {
			if (this.cardData.discreptionAttributes.length > 0) {
				inner += `<p class="carousel__card__p">${this.cardData.discreptionAttributes.join(
					', '
				)}</p>`;
			}
		}
		this.element.innerHTML = inner;
	}

	addEvent = () => {
		if (typeof this.eventListner === 'function') {
			this.element.addEventListener('click', this.eventListner);
		}
	};
}
