export const handleErrors = ({status, code, errors, headers, thr = true}) => {
    return new Response(JSON.stringify({
        pass: false,
        code,
        errors
    }), {status, headers})
}

export const handleForbiddenError = (message = 'Vous n\'êtes pas autorisé à effectuer cette action') => {
    return handleErrors({
        status: 403,
        code: 'FORBIDDEN',
        errors: [
            {
                message
            }
        ]
    })
}

export const handleAlreadyExistsError = (message = 'Cet élément existe déjà') => {
    return handleErrors({
        status: 409,
        code: 'ALREADY_EXISTS',
        errors: [
            {
                message
            }
        ]
    })
}


export const handleNotFoundError = (message = 'Cet élément n\'existe pas') => {
    return handleErrors({
        status: 404,
        code: 'NOT_FOUND',
        errors: [
            {
                message
            }
        ]
    })
}