import {config} from '../config'
import {ajaxGet, ajaxPost} from './ajaxMethod'

const _loginUrl = config.realHost +  '/login/do/user_login';
const _dictionaryUrl = config.realHost +  '/app/dictionary';
const _knowledgeTreeUrl = config.realHost +  '/app/knowledge_tree';
const _courseListUrl = config.realHost +  '/app/search';
const _examListUrl = _courseListUrl;
const _teacherListUrl = _courseListUrl;
const _liveListUrl = _courseListUrl;
const _schoolListUrl = config.realHost +  '/login/register/do/search_school';
const _updateSchoolUrl = config.realHost + '/admin/school/update';
const _register_step_Url = config.realHost +  '/login/register/do/pre_update_step1';
const _verifyUrl = config.realHost +  '/admin/audit';
const _updateCourseKnowledgeTreeUrl = config.realHost +  '/teacher/course/do/batch_update_knowledge_tree_nodes';

export function userLogin (data, callback){
    return ajaxPost(_loginUrl, {}, data, callback)
}

export function fetchKnowledgeTree(requestInfo, callback) {
    return ajaxPost(_knowledgeTreeUrl, {}, requestInfo, callback)
}

export function updateKnowledgeTree(requestInfo, callback) {
    return ajaxPost(_knowledgeTreeUrl + '/update', {}, requestInfo, callback)
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

export function updateSchool(requestInfo, callback) {
    return ajaxPost(_updateSchoolUrl, {}, requestInfo, callback)
}

export function priUpdateStep(requestInfo, callback) {
    return ajaxPost(_register_step_Url, {}, requestInfo, callback)
}

export function auditResource(requestInfo, callback) {
    return ajaxPost(_verifyUrl, {}, requestInfo, callback)
}

export function udpateCourseKnowledgeTree(requestInfo) {
    return ajaxPost(_updateCourseKnowledgeTreeUrl, {}, requestInfo, null);
}