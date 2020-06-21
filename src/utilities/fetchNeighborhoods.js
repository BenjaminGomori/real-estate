export default async function fetchNeighborhoods(f) {
	let response = await fetch(
		'https://stormy-gorge-00359.herokuapp.com/apartments'
	);

	if (!response.ok) {
		f(null, response.statusText);
		return;
	}
	let res = await response.json();
	f(res.data);
	return;
}
