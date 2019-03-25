import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../services/swapi-services";
import DummySwapiService from '../../services/dummy-swapi-service';

import StarshipDetails from '../../components/sw-components/starship-details';

import {
	PeoplePage,
	PlanetsPage,
	StarshipsPage,
	LoginPage,
	SecretPage
} from '../pages';

import { SwapiServiceProvider } from "../swapi-service-context";

import ErrorBoundry from "../error-boundry/error-boundry";

import './app.css';

export default class App extends Component {

	state = {
		hasError: false,
		swapiService: new SwapiService(),
		isLoggedIn: false
	};

	onLogin = () => {
		this.setState({
			isLoggedIn: true
		});
	};

	onServiceChange = () => {
		this.setState(( { swapiService } ) => {
			const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

			return {
				swapiService: new Service()
			}
		})
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

		const { isLoggedIn } = this.state;

		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.state.swapiService} >
					<Router>
						<div className="stardb-app">
							<Header onServiceChange={this.onServiceChange}/>

							<RandomPlanet />

							<Switch> {/* прохождит по всем роутам и ищет первое совпадение. если не найдет то берет последний пустой роут */}
								<Route path='/' render={() => <h2>Welcome to StarDb!</h2>} exact/>
								<Route path='/people/:id?' component={PeoplePage} />
								<Route path='/planets' component={PlanetsPage} />
								<Route path='/starships' exact component={StarshipsPage} />
								<Route path='/starships/:id'
								       render={({ match }) => {
									       const { id } = match.params;
									       console.log(match);
									       return <StarshipDetails itemId={id}/>
								       }}
								/>
								<Route
									path='/login'
									render={() => (
										<LoginPage
											isLoggedIn={isLoggedIn}
											onLogin={this.onLogin}/>
									)}
								/>
								<Route
									path='/secret'
									render={() => <SecretPage isLoggedIn={isLoggedIn}/>}
								/>

								<Route render={() => <h2>Page not found!!!</h2>}/> {/* даже если нет path будет работать. используем как азглушку для несущ стр */}
							</Switch>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
};