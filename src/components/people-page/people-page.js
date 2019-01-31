import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../services/swapi-services";
import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson: 3,
		hasErorr: false
	};

	componentDidCatch(error, info) {  // error - это сама ошибка а info - где она произошла
		this.setState({hasError: true})
	}

	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		})
	};

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />
		}

		return (
			<div className="row mb2">
				<div className="col-md-6">
					<ItemList onItemSelected={this.onPersonSelected}
					          getData={this.swapiService.getAllPeople}
					/>
				</div>
				<div className="col-md-6">
					<PersonDetails personId={this.state.selectedPerson}/>
				</div>
			</div>
		)
	}

}