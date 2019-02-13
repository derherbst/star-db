import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-services";
import Row from "../row";
import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson: 3,
	};

	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		})
	};

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />
		}

		const itemList = (
			<ItemList onItemSelected={this.onPersonSelected}
			          getData={this.swapiService.getAllPeople}>
				{(item) => `${item.name} (${item.birthYear})`}
			</ItemList>
		);

		const personDetails = (
			<ErrorBoundry>
				<ItemDetails
					itemId={this.state.selectedPerson}
					getData={this.swapiService.getPerson}
					getImageUrl={ this.swapiService.getPersonImage }
				/>
			</ErrorBoundry>
		);

		return (
			<Row left={ itemList } right={ personDetails } />
		);

	}

}