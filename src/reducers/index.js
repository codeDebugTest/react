import {combineReducers} from 'redux'
import {loginReducer} from './login.reducer'
import {knowledgeTreeReducer} from  './knowledgeTree.reducer'
import {courseReducer} from  './course.reducer'
import {examReducer} from  './exam.reducer'
import {teacherReducer} from  './teacher.reducer'

const appReducer = combineReducers({
    login: loginReducer,
    dictionary: knowledgeTreeReducer,
    course: courseReducer,
    exam: examReducer,
    teacher: teacherReducer
});

export default appReducer