import React from 'react';
import ItemList from '../item-list';
import { giveData } from '../hoc-helper';
import SwapiService from '../../services/swapi-services';

const swapiService = new SwapiService();

const {
	getAllPeople,
	getAllStarships,
	getAllPlanets
} = swapiService;

const withChildFunction = (Wrapped, fn) => { // создали ф-ю, которая оборачивает компонент с render() функцией
	return (props) => {
		return (
			<Wrapped { ...props }>
				{ fn }
			</Wrapped>
		)
	}
};

const renderName = ({ name }) => <span>{ name }</span>;
const renderModelAndName = ({ model, name }) => <span>{ name } ({ model })</span>;

// // у Item-List нет ф-ии render() поэтому мы ей ее даем вместо Item-List даем обёртку
const PersonList = giveData(withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = giveData(withChildFunction(ItemList, renderName), getAllPlanets);
const StarshipList = giveData(withChildFunction(ItemList, renderModelAndName), getAllStarships);

export {
	PersonList,
	PlanetList,
	StarshipList
}