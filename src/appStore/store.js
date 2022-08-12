import {createStore,combineReducers} from 'redux'
import reducer  from '../reducers/reducer';

const reducers=combineReducers({reducer})

export const store=createStore(reducers);