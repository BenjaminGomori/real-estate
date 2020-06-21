export default async function fetchAgents(f) {
	let response = await fetch('https://stormy-gorge-00359.herokuapp.com/agents');
	if (!response.ok) {
		f(null, response.statusText);
		return;
	}

	let res = await response.json();
	f(res.data);
}
