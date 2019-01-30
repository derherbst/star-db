import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorButton from "../error-button";
import PeoplePage from "../people-page";

import './app.css';

export default class App extends Component {

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
		console.log(123);
		this.setState({
			hasError: true
		})
	}

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />
		}

		const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

		return (
			<div className="stardb-app">
				<Header />
				{ planet }
				<div className='row mb2 button-row'>
					<button
						className="toggle-planet btn btn-warning btn-lg"
						onClick={this.toggleRandomPlanet}
					>
						Toggle Random Planet
					</button>
					<ErrorButton />
				</div>
				<PeoplePage />
				<PeoplePage />
				<PeoplePage />
			</div>
		);
	}
};