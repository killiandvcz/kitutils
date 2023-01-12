export const get = (endpoint, opts = {fn: fetch, bearer: ""}) => {
    return opts.fn(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Authorization": opts.bearer ? `Bearer ${opts.bearer}` : ""
        }
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    });
}

export const post = (endpoint, data = {}, opts = {fn: fetch, bearer: ""}) => {
    return opts.fn(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': opts.bearer ? `Bearer ${opts.bearer}` : ""
        },
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    })
}

