import {combineReducers} from 'redux'
import {loginReducer} from './login.reducer'
import {knowledgeTreeReducer} from  './knowledgeTree.reducer'
import {courseReducer} from  './course.reducer'
import {examReducer} from  './exam.reducer'
import {teacherReducer} from  './teacher.reducer'
import {liveReducer} from  './live.reducer'
import {schoolReducer} from  './school.reducer'

const appReducer = combineReducers({
    login: loginReducer,
    dictionary: knowledgeTreeReducer,
    course: courseReducer,
    exam: examReducer,
    teacher: teacherReducer,
    live: liveReducer,
    school: schoolReducer
});

export default appReducer