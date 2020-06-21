import AagentCard from './AgentCard.js';

export default class AgentsCards {
	constructor(agentsList) {
		this.element = document.querySelector('.grid-agents__content');
		this.agents = agentsList;
		this.render();
	}

	render() {
		let agntCard = null;

		for (const agent of this.agents) {
			agntCard = new AagentCard(agent);
			this.agntCard = agntCard.element;
			this.element.insertAdjacentElement('beforeend', this.agntCard);
		}
	}
}
