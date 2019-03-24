import React from 'react';
import ItemDetails, { Record } from '../item-details/item-details';
import { withSwapiService } from '../hoc-helper';

const PersonDetails = (props) => {

	return (

		<ItemDetails
			{ ... props }
		>
			{/* для вывода строк свойств айтема. чтобы работать такому полю нужен field, label и item
	 item здесь нет но мы можем взять его из item-details. поэтому передаем Record в кач-ве props.children
	 */}
			<Record field="gender" label="Gender" />
			<Record field="eyeColor" label="Eye Color" />
		</ItemDetails>
	)

};

const mapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getPerson,
		getImageUrl: swapiService.getPersonImage
	}
};

export default withSwapiService(mapMethodsToProps)(PersonDetails);