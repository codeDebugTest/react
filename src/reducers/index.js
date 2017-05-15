import {combineReducers} from 'redux'
import {loginReducer} from './login'

const appReducer = combineReducers({
    loginReducer,
});

export default appReducer