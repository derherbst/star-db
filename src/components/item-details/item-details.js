import React, { Component } from 'react';

import './item-details.css';
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
	return (
		<li className="list-group-item">
			<span className="term">{ label }</span>
			<span>{ item[field] }</span>
		</li>
	)
};

export { Record };

export default class ItemDetails extends Component {

	state = {
		item: null,
		image: null,
		loading: true
	};

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId ||
			this.props.getData !== prevProps.getData ||
			this.props.getImageUrl !== prevProps.getImageUrl) {
			this.setState({
				loading: true
			});
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId, getData, getImageUrl } = this.props;
		if (!itemId) {
			return
		}
		getData(itemId) // контроль за получением данных из swapi перенесли в app
			.then((item) => {
				this.setState({
					item,
					image: getImageUrl(item), // функц для получения ссылки о картинке из сервиса
					loading: false
				});
			})
	}

	render() {

		const { item, image, loading } = this.state;

		if (!item) {
			return <span>Select a item from a list</span>
		}

		const DetailsView = ({item, image}) => {
			const { name } = item;
			return (
				<React.Fragment>
					<img className="item-image"
					     src={image}
					     alt='character'
					/>
					<div className="card-body">
						<h4>{ name }</h4>
						<ul className="list-group list-group-flush">
							{/* передаем children из app и с помощью React.Children перебираем все Record и
							 с помощью React.cloneElement преобразовываем копию эл-та child добавляя ему еще и item помимо field и label
							 Нельзя напрямую менять child!!!
							 */}
							{
								React.Children.map(this.props.children, (child) => {
									return React.cloneElement(child, { item })
								})
							}
						</ul>
					</div>
				</React.Fragment>
			)
		};

		const loadingContent = loading ? <Spinner /> : <DetailsView item={item} image={image}/>;

		return (
			<div className="item-details card">
				{ loadingContent }
			</div>
		)
	}
}