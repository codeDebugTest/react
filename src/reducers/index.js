import {combineReducers} from 'redux'
import {loginReducer} from './login'
import {knowledgeTreeReducer} from  './knowledgeTree'

const appReducer = combineReducers({
    loginReducer,
    knowledgeTreeReducer
});

export default appReducer