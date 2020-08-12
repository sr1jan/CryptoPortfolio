import {createStore, combineReducers} from 'redux';
import portReducer from './reducers/portReducer';

const rootReducer = combineReducers({
  portReducer: portReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
