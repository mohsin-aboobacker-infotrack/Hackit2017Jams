// import createHistory from 'history/createBrowserHistory';
// import { routerMiddleware } from 'react-router-redux';
// import { applyMiddleware, compose, createStore } from 'redux';
// import thunk from 'redux-thunk';

// import rootReducer from '../Components/Reducers/root';

// export const history = createHistory();

// const initialState = {};
// const middleware = [
//     thunk,
//     routerMiddleware(history)
// ];

// const composedEnhancers = compose(
//     applyMiddleware(...middleware)
// );

// const store = createStore(
//     rootReducer,
//     initialState,
//     composedEnhancers
// );

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../Components/Reducers/root';
import thunk from "redux-thunk";


const composeEnhancers =
    typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: true,
        }) : compose;


const middleware = [thunk]

const enhancer = composeEnhancers(applyMiddleware(...middleware))

export default function configureStore(initialState: any) {
    // return compose(applyMiddleware(thunk))(createStore)(rootReducer);
    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}