import {FETCH_TEACHER_LIST, FETCH_TEACHER_SUCCESS, FETCH_TEACHER_FAILED,
    DELETE_TEACHER_SUCCESS, DELETE_TEACHER_FAILED, SHOW_TEACHER_DETAIL} from '../actions/teacher.action'

const tempTeacher =  {
    "pictureUrl":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002525.jpg_texzK4r8sT.jpg",
    "genderId":"1",
    "gradeId":"2",
    "birthday":"2017-05-10",
    "school":"上海中学",
    "subjectId":"7",
    "districtId":"38",
    "userToken":"d05d544da03d4f38bff560823a0496d1",
    "idCard":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002500.jpg_NXtPDifGPZ.jpg",
    "empCard":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002500.jpg_eFrtSrb5ze.jpg",
    "quaCert":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tii219a1116.jpg_yzkDNJi8GP.jpg",
    "psyCert":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002500.jpg_fdHn5SeMKQ.jpg",
    "eduCert":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002500.jpg_Ff6a5cKnMs.jpg",
    "degreeCert":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002525.jpg_j8rhXTPZ5W.jpg",
    "levelCert":"http://yixi-1.oss-cn-hangzhou.aliyuncs.com/user-dir_tid020t002500.jpg_jhKhNZjWex.jpg"
}
export function teacherReducer(state = {}, action){
    switch (action.type) {
        case FETCH_TEACHER_LIST:
            return Object.assign({}, state, {loading: true, teacherList: []});
        case FETCH_TEACHER_SUCCESS:
            return Object.assign({}, state, {loading: false, teacherList: action.response.content[0].results});
        case FETCH_TEACHER_FAILED:
            return Object.assign({}, state, {loading: false, teacherList: []});
        case SHOW_TEACHER_DETAIL:
            return Object.assign({}, state, {teacher: Object.assign({}, tempTeacher, action.teacher)});
        case DELETE_TEACHER_SUCCESS:
            state.teacherList.splice(action.index, 1);
            return Object.assign({}, state);
        default:
            return state;
    }
}
