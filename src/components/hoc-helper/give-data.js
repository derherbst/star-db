import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const giveData = (View) => {
	return class extends Component {

		state = {
			data: null,
			loading: true,
			error: false,
		};

		componentDidUpdate(prevProps) {
			if (this.props.getData !== prevProps.getData) {
				this.update();
			}
		}

		componentDidMount() { // компонент уже отренедерился
			this.update();
		}

		update() {
			console.log(this.props);  // getData, children, onItemSelected - это то что передается в вызове ItemList

			this.setState({
				loading: true,
				error: false
			});

			this.props.getData()
				.then((data) => {
					this.setState({ // получаем массив всех персонажей и передаем в state
						data,
						loading: false
					})
				})
				.catch(() => {
					this.setState({
						error: true,
						loading: false
					})
				})
		}

		render() {

			const { data, loading, error} = this.state;

			if (loading) {
				return <Spinner />
			}

			if (error) {
				return <ErrorIndicator />
			}

			return <View { ... this.props } data={ data } />
		}
	}
};

export default giveData;