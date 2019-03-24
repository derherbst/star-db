import React from 'react';

const {
	Provider: SwapiServiceProvider,
	Consumer: SwapiServiceConsumer
} = React.createContext(); // метод для создания контекста. достаем оттуда компоненты для провайдера и консьюмера

export {
	SwapiServiceProvider,
	SwapiServiceConsumer
}