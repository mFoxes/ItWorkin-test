import React from 'react';
import { Home } from '../pages/home/home';
import './app.scss';
import './reset.scss';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <div className="app__container">
                    <Home />
                </div>
            </div>
        </Provider>
    );
}

export default App;
