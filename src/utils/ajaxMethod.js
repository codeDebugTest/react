import fetch from 'isomorphic-fetch'

const ajaxPost = (url, header, params, callback) => {
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
    ).catch(
        error => console.log(error)
    );
};

const ajaxGet = (url, headersObject, callback) => {
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

export {ajaxGet, ajaxPost};
