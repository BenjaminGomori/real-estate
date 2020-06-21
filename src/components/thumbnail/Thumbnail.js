import emptyNode from '../../utilities/emptyDomElement.js';

export default class Thumbnail {
	constructor(mainImgHook, galleryHook, mainImg, gallery) {
		this.mainImgData = mainImg;
		this.galleryData = gallery;
		this.gallery = null;
		this.mainImg = null;
		this.mainImgHook = mainImgHook;
		this.galleryHook = galleryHook;
		this.render();
	}

	render() {
		this.appendMainImg();
		this.appendGallery();
	}

	appendGallery() {
		let thumbnail;
		let img;
		let i = 0;

		this.gallery = document.createElement('div');
		this.gallery.classList.add('thumbnails');

		for (i = -1; i < this.galleryData.length; i++) {
			thumbnail = document.createElement('div');
			img = document.createElement('img');

			thumbnail.classList.add('thumbnails__item');
			thumbnail.classList.add('thumbnail');
			img.classList.add('thumbnail__img');

			if (i === -1) {
				img.src = '' + this.mainImgData;
				img.classList.add('is-opacity');
			} else {
				img.src = '' + this.galleryData[i];
			}

			this.gallery.insertAdjacentElement('beforeend', thumbnail);
			thumbnail.insertAdjacentElement('beforeend', img);

			thumbnail.addEventListener('click', this.onClickThumbnail);
			img.addEventListener('click', this.onClickThumbnail);
		}

		emptyNode(this.galleryHook);
		this.galleryHook.insertAdjacentElement('beforeend', this.gallery);
	}

	appendMainImg() {
		this.mainImgHook.src = '' + this.mainImgData;
	}

	onClickThumbnail = (event) => {
		let element = event.target;
		if (element.classList.contains('is-opacity')) return;

		const hasOpacity = this.galleryHook.querySelector(
			'.grid-modal__thumbnail .is-opacity'
		);

		hasOpacity.classList.remove('is-opacity');

		//traversing to img tag
		if (element.nodeName == 'DIV') {
			event.target.firstElementChild.classList.add('is-opacity');
		}
		if (element.nodeName == 'IMG') {
			element.classList.add('is-opacity');
		}

		this.mainImgHook.src = event.target.getAttribute('src');
		event.stopPropagation();
	};
}
