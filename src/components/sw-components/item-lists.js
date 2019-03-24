import React from 'react';
import ItemList from '../item-list';
import {
	giveData,
	withSwapiService,
	compose,
	withChildFunction
} from '../hoc-helper';

const renderName = ({ name }) => <span>{ name }</span>;
const renderModelAndName = ({ model, name }) => <span>{ name } ({ model })</span>;

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople
	}
};

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets
	}
};

const mapStarshipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships
	}
};

// // у Item-List нет ф-ии render() поэтому мы ей ее даем вместо Item-List даем обёртку
const PersonList = compose(
							withSwapiService(mapPersonMethodsToProps),
							giveData,
							withChildFunction(renderName)
						)(ItemList);

const PlanetList = compose(
							withSwapiService(mapPlanetMethodsToProps),
							giveData,
							withChildFunction(renderName)
						)(ItemList);

const StarshipList = compose(
							withSwapiService(mapStarshipMethodsToProps),
							giveData,
							withChildFunction(renderName)
						)(ItemList);

export {
	PersonList,
	PlanetList,
	StarshipList
}