import {combineReducers} from 'redux'
import {loginReducer} from './login'
import {knowledgeTreeReducer} from  './knowledgeTree'
import {courseReducer} from  './course'

const appReducer = combineReducers({
    login: loginReducer,
    dictionary: knowledgeTreeReducer,
    course: courseReducer
});

export default appReducer