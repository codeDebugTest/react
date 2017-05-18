import {combineReducers} from 'redux'
import {loginReducer} from './login.reducer'
import {knowledgeTreeReducer} from  './knowledgeTree.reducer'
import {courseReducer} from  './course.reducer'

const appReducer = combineReducers({
    login: loginReducer,
    dictionary: knowledgeTreeReducer,
    course: courseReducer
});

export default appReducer