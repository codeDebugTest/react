const SINGLE_SELECT_EXERCISE = {value: 1, name: '单选题'};
const FILL_EXERCISE = {value: 2, name: '填空题'};
const MULTI_SELECT_EXERCISE = {value: 3, name: '多选题'};
const JUDGE_EXERCISE = {value: 4, name: '判断题'};
const SUBJECT_EXERCISE = {value: 5, name: '主观题'};

const EXERCISE_TYPE = {};
EXERCISE_TYPE[SINGLE_SELECT_EXERCISE.value] = SINGLE_SELECT_EXERCISE;
EXERCISE_TYPE[FILL_EXERCISE.value] = FILL_EXERCISE;
EXERCISE_TYPE[MULTI_SELECT_EXERCISE.value] = MULTI_SELECT_EXERCISE;
EXERCISE_TYPE[JUDGE_EXERCISE.value] = JUDGE_EXERCISE;
EXERCISE_TYPE[SUBJECT_EXERCISE.value] = SUBJECT_EXERCISE;


const TABLE_PAGE_SIZE = 20;

const biz_Target_Status = {
    UN_SUBMIT: 1,   // 未上架
    IN_VERIFY: 2,   //上架审核中
    RELEASED: 3,    //已上架发布
    REMOVED: 4      //已下架
}

const biz_Target_Type = {
    TEACHER: 1,     // 教师
    COURSE: 2,      //课程
    EXERCISE: 3,    //习题
    ALBUM: 4,       //专辑
    EXAM: 5,        //试卷
    CLASS: 6,       //班级
    LIVE: 7,        //直播
    STUDENT: 8,     //学生
    SCHOOL: 9       //学校
}


export {EXERCISE_TYPE, TABLE_PAGE_SIZE, biz_Target_Status, biz_Target_Type, SINGLE_SELECT_EXERCISE,
    FILL_EXERCISE, JUDGE_EXERCISE, MULTI_SELECT_EXERCISE, SUBJECT_EXERCISE}