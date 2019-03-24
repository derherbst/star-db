import React from 'react';

const withChildFunction = (fn) => (Wrapped) => { // создали ф-ю, которая оборачивает компонент с render() функцией
	return (props) => {
		return (
			<Wrapped { ...props }>
				{ fn }
			</Wrapped>
		)
	}
};

export default withChildFunction;