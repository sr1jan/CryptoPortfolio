import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import portReducer from './reducers/portReducer';

const rootReducer = combineReducers({
  portReducer: portReducer,
});

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};

export default configureStore;
