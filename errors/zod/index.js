import {handleErrors} from "../index.js";

export const handleSchemaErrors = (schema) => {
    let errors = [];
    schema.error.issues.forEach(issue => {
        errors.push({
            message: issue.message,
            path: issue.path
        });
    })
    return handleErrors({
        status: 400,
        code: 'INVALID_SCHEMA',
        errors
    });
}

