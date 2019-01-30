export default class SwapiService { // класс сервис

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
		return res.results.map(this._transformPerson)
	}

	async getPerson(id) {
		const person = await this.getResource(`/people/${id}`);
		return this._transformPerson(person)
	}

	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results.map(this._transformPlanet)
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}`)
		return this._transformPlanet(planet)
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformStarship)
	}

	async getStarship(id) {
		const starship = await this.getResource(`/starships/${id}`);
		return this._transformStarship(starship)
	}

	_extractId(item) {
		const idRegExp = /\/([0-9]*)\/$/; // $ это конец строки. берем последние два слеша и все что между ними. в скобки выделяем что именно нам надо то есть число
		// [1] потому что в объекте на первом месте строка со слешами а они не нужны
		return item.url.match(idRegExp)[1];
	}

	// изолируем код для обработки данных
	// подготавливаем данные для передачи компоненту. иногда формат данных может отличаться. например не
	// camelCase а this_notation. здесь мы и приводим все к кэмл кейсу там где надо

	_transformPlanet = (planet) => {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter
		}
	};

	_transformPerson = (person) => {
		return {
			id: this._extractId(person),
			name: person.name,
			gender: person.gender,
			birthYear: person.birthYear,
			eyeColor: person.eyeColor
		}
	};

	_transformStarship = (starship) => {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.costInCredits,
			length: starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargoCapacity
		}
	};
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
