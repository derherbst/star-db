import React, { Component } from 'react';

import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner'

import './random-planet.css';

export default class RandomPlanet extends Component {

	swapiService = new SwapiService();

	state = {
		planet: {},
		loading: true
	};

	constructor() {
		super();
		this.updatePlanet(); // при каждом новом построении компонента будет выполняться эта функция
	}

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false
		});
	};

	updatePlanet() {
		const id = 12;
		this.swapiService
			.getPlanet(id) // здесь получаем объект с данными из апи по планете и отдаем ниже в then в качестве парам функции
			.then(this.onPlanetLoaded);
	}

	render() {
		// вся логика здесь
		const { planet, loading } = this.state;
		const spinner = loading ? <Spinner /> : null;
		const content = !loading ? <PlanetView planet={ planet }/> : null;

		return (
			<div className="random-planet jumbotron rounded">
				{ spinner }
				{ content }
			</div>
		);
	}
}

const PlanetView = ({ planet }) => { // отдельный компонент для рендеринга
	const {id, name, population, rotationPeriod, diameter } = planet;

	return (
		<React.Fragment> {/* позволяет групировать несколько контенеров чтобы не создавать див */}
			<img className="planet-image"
			     src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
			     alt={ 'Planet: ' + name }
			/>
			<div>
				<h4>{ name }</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{ population }</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{ rotationPeriod }</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{ diameter }</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
};