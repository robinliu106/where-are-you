import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import scoreReducer from "../reducers/scoreReducer";
import streetViewReducer from "../reducers/streetViewReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            score: scoreReducer,
            reloadStreetView: streetViewReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
