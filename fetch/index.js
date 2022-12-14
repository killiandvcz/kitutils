export const get = (endpoint, {fn = fetch, bearer = ""}) => {
    return fn(endpoint, {
        method: 'GET',
        credentials: 'include'
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    });
}

export const post = (endpoint, data = {}, {fn = fetch, bearer = ""}) => {
    return fn(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer ? `Bearer ${bearer}` : ""
        },
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    })
}

