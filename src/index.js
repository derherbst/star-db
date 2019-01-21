
class SwapiService { // класс сервис

	_apiBase = 'https://swapi.co/api';

	async getResource(url) { //
		const res = await fetch(`${this._apiBase}${url}`); // ждем пока результат промиса не будет доступен // fetch возвращает промис
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`) // до then не дойдет так как статус будет не 200
		}

		const body = await res.json();

		return body
	}

	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results
	}

	getPerson(id) {
		return this.getResource(`/people/${id}`)
	}

	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results
	}

	getPlanet(id) {
		return this.getResource(`/planets/${id}`)
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results
	}

	getStarship(id) {
		return this.getResource(`/starships/${id}`)
	}
}

const swapi = new SwapiService();

swapi.getPerson(3).then((p) => {
	console.log(p.name);
});

// getResource('https://swapi.co/api/people/1/')
// 	.then((body) => {
// 		console.log(body);
// 	})
// 	.catch((err) => {
// 		console.error('Could not fetch', err); // например нет сети
// 	});

// fetch('https://swapi.co/api/people/1/') // вернет промис и после полуения выполнит then
// 	.then((res) => {
// 		// console.log('Got response', res.status)
// 		return res.json(); // получаем результат запроса
// 	})
// 	.then((body) => { // забираем тело результата
// 		console.log(body);
// 	});
