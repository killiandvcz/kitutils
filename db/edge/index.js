
export const query = (client, query, params = {debug: false}) => client.query(query).then(res => {
    if (params.debug) {
        console.log({res});
    }
    return {
        pass: true,
        data: res
    }
}).catch(e => {
    if (params.debug) {
        console.log({e});
    }
    return {
        pass: false,
        code: e.code
    }
});

export const querySingle = (client, query, params = {debug: false}) => client.querySingle(query).then(res => {
    if (params.debug) {
        console.log({res});
    }

    return {
        pass: true,
        data: res
    }
}).catch(e => {
    if (params.debug) {
        console.log({e});
    }

    return {
        pass: false,
        code: e.code
    }
});

