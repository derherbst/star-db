import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../services/swapi-services";
import Row from "../row";

import './app.css';
import ErrorBoundry from "../error-boundry/error-boundry";
import ItemDetails, { Record } from "../item-details/item-details";

export default class App extends Component {

	swapiService = new SwapiService();

	state = {
		showRandomPlanet: true,
		hasError: false
	};

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return {
				showRandomPlanet: !state.showRandomPlanet
			}
		});
	};

	componentDidCatch() {
		this.setState({
			hasError: true
		})
	}

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />
		}

		const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

		const { getPerson,
				getStarship,
				getPersonImage,
				getStarshipImage } = this.swapiService;

		//* из сервиса берем функц для получ ссылки. сюда попадет id из details*/}

		const personDetails = (
			<ItemDetails
				itemId={11}
				getData={ getPerson }
				getImageUrl={ getPersonImage }
			>
				{/* для вывода строк свойств айтема. чтобы работать такому полю нужен field, label и item
				 item здесь нет но мы можем взять его из item-details. поэтому передаем Record в кач-ве props.children
				 */}
				<Record field="gender" label="Gender" />
				<Record field="eyeColor" label="Eye Color" />
			</ItemDetails>
		);

		const starshipDetails = (
			<ItemDetails
				itemId={5}
				getData={ getStarship }
				getImageUrl={ getStarshipImage }
			>
				<Record field="model" label="Model" />
				<Record field="length" label="Length" />
				<Record field="costInCredits" label="Cost" />
			</ItemDetails>
		);

		return (
			<ErrorBoundry>
				<div className="stardb-app">
					<Header />

					<Row
						left={personDetails}
						right={starshipDetails}
					/>
					{/*{ planet }*/}
					{/*<div className='row mb2 button-row'>*/}
						{/*<button*/}
							{/*className="toggle-planet btn btn-warning btn-lg"*/}
							{/*onClick={this.toggleRandomPlanet}*/}
						{/*>*/}
							{/*Toggle Random Planet*/}
						{/*</button>*/}
						{/*<ErrorButton />*/}
					{/*</div>*/}
					{/*<PeoplePage />*/}
				</div>
			</ErrorBoundry>
		);
	}
};