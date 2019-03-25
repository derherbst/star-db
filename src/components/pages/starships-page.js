import React from 'react';

import { StarshipList } from "../sw-components";
import { withRouter } from "react-router-dom";

const StarshipsPage = ({ history }) => {

	console.log(history);

	// state = {
	// 	selectedItem: null
	// };
	//
	// onItemSelected = (selectedItem) => {
	// 	this.setState({ selectedItem })
	// };

	return (
		<StarshipList
			onItemSelected={(itemId) => {
				// const newPath = `/starships/${itemId}`;
				history.push(itemId)
			}} />
	)
};

export default withRouter(StarshipsPage);