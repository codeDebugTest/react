import config from '../config'
import fetch from 'isomorphic-fetch'

const _ajaxPost = (url, header, params, callback) => {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...header
    });
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    }).then(
        response => {return response.json() }
    ).then(
        json => {
            if (json.code === undefined) {
                alert(`No code in result of post: ${url}`);
                return;
            }

            callback(json);
        }
    ).catch(
        error => console.log(error)
    );
};

const _ajaxGet = (url, headersObject, callback) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            ...headersObject
        }
    }).then(
        response => {return response.json()}
    ).then(
        json => {callback(json)}
    ).catch(
        error => console.log(error)
    );
};

const loginUrl = config.realHost +  '/login/do/user_login';

export function userLogin (data, callback){
    _ajaxPost(loginUrl, {}, data, callback)
}