import {handleErrors, handleAlreadyExistsError, handleNotFoundError} from '../index.js';

export const handleQueryErrors = (query, {alreadyExists = "", notFound = ""}) => {
    if (!query.data){
        return handleNotFoundError(notFound);
    }

    if (query.code === 84017153){
        return handleAlreadyExistsError(alreadyExists);
    }
    return handleErrors({
        status: 400,
        code: 'UNKNOWN_ERROR',
        queryCode: query.code,
        errors: [
            {
                message: 'Une erreur inconnue s\'est produite'
            }
        ]
    })
}

