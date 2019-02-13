import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const giveData = (View, getData) => {
	return class extends Component {

		state = {
			data: null
		};

		componentDidMount() { // компонент уже отренедерился

			console.log(this.props);  // getData, children, onItemSelected - это то что передается в вызове ItemList

			getData()
				.then((data) => {
					this.setState({ // получаем массив всех персонажей и передаем в state
						data
					})
				});
		}

		render() {

			const { data } = this.state;

			if (!data) {
				return <Spinner />
			}

			return <View { ... this.props } data={ data } />
		}
	}
};

export default giveData;