import config from '../config'
import {ajaxGet, ajaxPost} from './ajaxMethod'


const _loginUrl = config.realHost +  '/login/do/user_login';
const _dictionaryUrl = config.realHost +  '/app/dictionary';
const _courseListUrl = config.realHost +  '/visitor/course/list';

export function userLogin (data, callback){
    return ajaxPost(_loginUrl, {}, data, callback)
}

export function fetchDictionary(regionId, callback) {
    return ajaxPost(_dictionaryUrl, {}, {regionId}, callback)
}

export function fetchCourseList(requestInfo, callback) {
    return ajaxPost(_courseListUrl, {}, requestInfo, callback)
}