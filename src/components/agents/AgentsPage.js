import fetchAgents from '../../utilities/fetchAgents.js';
import AgentsCards from './AgentsCards.js';
import Spinner from '../Spinner.js';

class AgentsPage {
	constructor() {
		this.spinner = new Spinner();
		this.spinner.display();
		fetchAgents(this.onResponse);
	}

	onResponse = (agentsData, er) => {
		this.spinner.undisplay();
		if (er) {
			let errMeasge = document.querySelector('.grid-agents__content');
			errMeasge.style.padding = '20vh 30vw';
			errMeasge.innerHTML =
				'Agents data ' + er + '<br>Please contact support at<br> 02-111111111';
			return;
		}

		new AgentsCards(agentsData);
	};
}

new AgentsPage();
