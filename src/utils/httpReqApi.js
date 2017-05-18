import config from '../config'
import {ajaxGet, ajaxPost} from './ajaxMethod'


const loginUrl = config.realHost +  '/login/do/user_login';
const dictionaryUrl = config.realHost +  '/app/dictionary';

export function userLogin (data, callback){
    return ajaxPost(loginUrl, {}, data, callback)
}

export function fetchDictionary(regionId, callback) {
    return ajaxPost(dictionaryUrl, {}, {regionId}, callback)
}