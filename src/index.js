import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import ReactDOM from 'react-dom'
import { Form } from 'antd'
import App from './App'
import KnowledgeTree from './containers/knowledgeTree'
import Course from './containers/course'
import CourseDetail from './containers/courseDetail'
import Exam from './containers/exam'
import ExerciseDetail from './containers/exerciseDetail'
import Teacher from './containers/teacher'
import TeacherDetail from './containers/tearcherDetail'
import Live from './containers/live'
import LiveDetail from './containers/liveDetail'
import School from './containers/school'
import LoginForm from './containers/login'
import appReducer from './reducers/index'
import './index.css'

let store = createStore(appReducer, applyMiddleware(thunk));
const WrappedLoginForm = Form.create()(LoginForm);
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route>
                <Route exact path="/" component={WrappedLoginForm}/>

                <Route path="/management" component={App}>
                    <IndexRoute component={KnowledgeTree}/>
                    <Route path="knowledge_tree" component={KnowledgeTree}/>
                    <Route path="course" component={Course}/>
                    <Route path="course/:id" component={CourseDetail}/>
                    <Route path="exam" component={Exam}/>
                    <Route path="exercise/:id" component={ExerciseDetail}/>
                    <Route path="teacher" component={Teacher}/>
                    <Route path="teacher/:id" component={TeacherDetail}/>
                    <Route path="live" component={Live}/>
                    <Route path="live/:id" component={LiveDetail}/>
                    <Route path="school" component={School}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
