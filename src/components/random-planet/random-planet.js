import React, { Component } from 'react';

import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

	swapiService = new SwapiService();

	state = {
		planet: {},
		loading: true,
		error: false
	};

	componentDidMount() { // означает, что компонент уже подключен. используем вместо контруктора. получение данных и тп
		// при каждом новом построении компонента будет выполняться эта функция
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, 1500);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false
		});
	};

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		})
	};

	updatePlanet =() => {
		const id = Math.floor(Math.random()*25) + 3;
		this.swapiService
			.getPlanet(id) // здесь получаем объект с данными из апи по планете и отдаем ниже в then в качестве парам функции
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};

	render() {
		// вся логика здесь
		const { planet, loading, error } = this.state;
		const hasData = !(loading || error);
		const errorMessage = error ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = hasData ? <PlanetView planet={ planet }/> : null;

		return (
			<div className="random-planet jumbotron rounded">
				{ errorMessage }
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