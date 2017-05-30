import config from '../config'
import {ajaxGet, ajaxPost} from './ajaxMethod'


const _loginUrl = config.realHost +  '/login/do/user_login';
const _dictionaryUrl = config.realHost +  '/app/dictionary';
const _courseListUrl = config.realHost +  '/app/search';
const _examListUrl = config.realHost +  '/teacher/exercise_item/list ';
const _teacherListUrl = config.realHost +  '/app/search';
const _liveListUrl = config.realHost +  '/student/live_course/list';
const _schoolListUrl = config.realHost +  '/login/register/do/search_school';
const _verifyUrl = config.realHost +  '/audit'

export function userLogin (data, callback){
    return ajaxPost(_loginUrl, {}, data, callback)
}

export function fetchDictionary(regionId, callback) {
    return ajaxPost(_dictionaryUrl, {}, {regionId}, callback)
}

export function fetchCourseList(requestInfo, callback) {
    return ajaxPost(_courseListUrl, {}, requestInfo, callback)
}

export function fetchExamList(requestInfo, callback) {
    return ajaxPost(_examListUrl, {}, requestInfo, callback)
}

export function fetchTeacherList(requestInfo, callback) {
    return ajaxPost(_teacherListUrl, {}, requestInfo, callback)
}

export function fetchLiveList(requestInfo, callback) {
    return ajaxPost(_liveListUrl, {}, requestInfo, callback)
}

export function fetchSchoolList(requestInfo, callback) {
    return ajaxPost(_schoolListUrl, {}, requestInfo, callback)
}

export function verifyResource(requestInfo, callback) {
    return ajaxPost(_verifyUrl, {}, requestInfo, callback)
}