const ajaxPost = (url, headers, params, callback) => {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: params
    }).then (
        response => {return response.json() }
    ).then(
        json => {
            console.log('--------<< ' + url);
            if (!json.code) {
                alert(`No code in result of post: ${url}`);
                return;
            }
            if (json.code + '' !== '0') {
                alert(`Error in result of post: ${url}, message: ${json.message}`);
                return;
            }
            callback(json);
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
