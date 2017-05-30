const EXERCISE_TYPE = {
    1: {name: '单选题'},
    2: {name: '填空题'},
    3: {name: '主观题'}
}

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


export {EXERCISE_TYPE, TABLE_PAGE_SIZE, biz_Target_Status, biz_Target_Type}