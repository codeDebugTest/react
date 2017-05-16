import config from '../config'
import {ajaxGet, ajaxPost} from './ajaxMethod'


const loginUrl = config.realHost +  '/login/do/user_login';
const knowledgeUrl = config.realHost +  '/app/knowledge_tree';

export function userLogin (data, callback){
    return ajaxPost(loginUrl, {}, data, callback)
}

export function fetchKnowledgeTree(regionId, callback) {
    return ajaxPost(knowledgeUrl, {}, {regionId}, callback)
}