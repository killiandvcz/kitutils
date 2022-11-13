export const deleteCookie = (name) => {
    return {
        'set-cookie': `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
    }
}

export const setCookie = ({name, content, age = 60 * 60 * 24 * 30 }) => {
    return {
        'set-cookie': `${name}=${content}; HttpOnly; max-age=${age}; path=/;`
    }
}

