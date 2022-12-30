import { handleErrors } from '../../errors/index.js';
import { deleteCookie } from '../../cookies/index.js';
import cookie from 'cookie';
import { verifyToken } from '../../jwt/index.js';
export const getCookies = (request, message) => {
    const rawCookies = request.headers.get("cookie") || "";

    if (!rawCookies) {
        return {
            pass: false,
            err: handleErrors({
                status: 401,
                code: "NO_COOKIE",
                errors: [
                    {
                        message: message || "Aucun cookie n'a été trouvé"
                    }
                ],
                headers: {
                    ...deleteCookie("token")
                }
            })
        }
    }

    return cookie.parse(request.headers.get("cookie"));

}

export const getToken = (request, cookie, messages = {
    noCookie: "Aucun cookie n'a été trouvé",
    noToken: "Token d'authentification inexistant"
}) => {
    const cookies = getCookies(request, messages.noCookie);

    if (cookies.err){
        return cookies;
    }

    if (!cookies[cookie]) {
        return {
            err: handleErrors({
                status: 401,
                code: "NO_TOKEN",
                errors: [
                    {
                        message: messages.noToken || "Token d'authentification inexistant"
                    }
                ],
                headers: {
                    ...deleteCookie("token")
                }
            }),
            pass: false
        }
    }


    return cookies[cookie];
}

export const checkToken = (request, cookie, key, messages = {
    noCookie: "Aucun cookie n'a été trouvé",
    noToken: "Token d'authentification inexistant",
    invalidToken: ""
    // invalidToken: "Token d'authentification invalide"
}) => {
    const rawToken = getToken(request, cookie, {
        noCookie: messages.noCookie,
        noToken: messages.noToken
    });

    if (rawToken.err){
        return rawToken;
    }

    const token = verifyToken(rawToken, key)

    if (!token.pass) {
        return {
            err: handleErrors({
                status: 401,
                code: token.code,
                errors: [
                    {
                        message: messages.invalidToken || token.message
                    }
                ],
                headers: {
                    ...deleteCookie("token")
                }
            }),
            pass: false
        }
    }

    return token;
}


export const getBearerToken = (request, message = "Aucun token d'authentification n'a été trouvé") => {
    const rawToken = request.headers.get("authorization")

    if (!rawToken) {
        return {
            err: handleErrors({
                status: 401,
                code: "NO_TOKEN",
                errors: [
                    {
                        message: message || "Token d'authentification inexistant"
                    }
                ]
            }),
            pass: false
        }
    }

    const token = rawToken.split(" ")[1];

    return token;
}