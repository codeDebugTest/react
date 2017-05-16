import {userLogin, fetchKnowledgeTree} from '../utils/httpReqApi'
export const LOGIN = 'login';
export const LOGIN_SUCCESS= 'login_success';
export const LOGIN_FAILED = 'login_failed';
export const SWITCH_HOME_ROUTE = 'home_route';
export const FETCH_KNOWLEDGE_TREE = 'fetch_knowledge_tree';

const login = (obj) => {
    return {
        type: LOGIN,
        info: obj
    }
};

const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        response: response,
        // successFunc: successFunc
    }
};

const loginFailed = (response) => {
    return {
        type: LOGIN_FAILED,
        response: response,
        // failedFuc: failedFuc
    }
};
const switchRoute = (path) => {
    return {
        type: SWITCH_HOME_ROUTE,
        path: path
    }
};

const fetchKnowledgeTreeAction = (response) => {
    return {
        type: FETCH_KNOWLEDGE_TREE,
        response: response
    }
};

const doFetchKnowledgeTree = (regionId, dispatch) => {
    fetchKnowledgeTree(regionId).then(
        response => {
            if (response.code === undefined) {
                alert(`No code in result of post: fetchKnowledgeTree`);
                return;
            }

            dispatch(fetchKnowledgeTreeAction(response.content))
        }
    );
}

export function fetchLogin(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(login(data));

        return userLogin(data).then(
            response => {
                if (response.code === undefined) {
                    alert(`No code in result of post: login`);
                    return;
                }

                if(response.code === 0) {
                    dispatch(loginSuccess(response));
                    dispatch(switchRoute('/management'));
                    doFetchKnowledgeTree(response.content.regionId, dispatch);
                } else {
                    dispatch(loginFailed(response));
                    failedFuc(response.message);
                }
            }
        );
    }
}
