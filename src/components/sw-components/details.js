import React from 'react';
import ItemDetails, { Record } from '../item-details/item-details';
import { giveData } from '../hoc-helper';
import SwapiService from '../../services/swapi-services';

const swapiService = new SwapiService();

const {
	getPerson,
	getPlanet,
	getStarship,
	getPersonImage,
	getPlanetImage,
	getStarshipImage
} = swapiService;

const PersonDetails = ({itemId}) => {
	return (
		<ItemDetails
			itemId={itemId}
			getData={ getPerson }
			getImageUrl={ getPersonImage }
		>
			{/* для вывода строк свойств айтема. чтобы работать такому полю нужен field, label и item
				 item здесь нет но мы можем взять его из item-details. поэтому передаем Record в кач-ве props.children
				 */}
			<Record field="gender" label="Gender" />
			<Record field="eyeColor" label="Eye Color" />
		</ItemDetails>
	)
};

const PlanetDetails = ({itemId}) => {
	return (
		<ItemDetails
			itemId={itemId}
			getData={ getPlanet }
			getImageUrl={ getPlanetImage }
		>
			<Record field="population" label="Population" />
			<Record field="rotationPeriod" label="Rotation Period" />
			<Record field="diameter" label="Diameter" />
		</ItemDetails>
	)
};

const StarshipDetails = ({itemId}) => {
	return (
		<ItemDetails
			itemId={itemId}
			getData={ getStarship }
			getImageUrl={ getStarshipImage }
		>
			<Record field="model" label="Model" />
			<Record field="length" label="Length" />
			<Record field="costInCredits" label="Cost" />
		</ItemDetails>
	)
};

export {
	PersonDetails,
	PlanetDetails,
	StarshipDetails
}