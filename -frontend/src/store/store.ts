import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  PERSIST
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['api'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  
})

const persistedReducer = persistReducer<any, AnyAction>(persistConfig, rootReducer);

const store = configureStore({
  
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
