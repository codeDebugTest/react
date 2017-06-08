import fetch from 'isomorphic-fetch'

const ajaxPost = (url, header, params, callback) => {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...header
    });
    console.log('------>>>> ' + url);

    const requestBody = JSON.stringify(params);
    console.log(' ------ body ' + requestBody);
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: requestBody
    }).then(
        response => {return response.json() }
    ).then(
        json => {
            console.dir(json);
            console.log('<<<<----- ');
            return json
        }
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
