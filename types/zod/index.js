import {z} from 'zod';


export const uuid = ({requiredMessage = "UUID requis", invalidMessage = "UUID invalide"}) => z
    .string({required_error: requiredMessage})
    .min(1, {message: requiredMessage})
    .regex(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/, {message: invalidMessage})

export const string = ({
                           requiredMessage = "Texte requis",
                           message = {
                               min: "Texte trop court",
                               max: "Texte trop long",
                               invalid: "Texte invalide",
                           },
                           min = 1,
                           max,
                           regex,
                           optional = false
                       }) => {
    let basic = z
        .string({required_error: requiredMessage, invalid_type_error: message.invalid})

    if (min) {
        if (min === 1) {
            basic = basic.min(1, {message: requiredMessage})
        } else {
            basic = basic.min(min, {message: message.min})
        }
    }

    if (max) {
        basic = basic.max(max, {message: message.max})
    }

    if (regex) {
        basic = basic.regex(regex, {message: message.invalid})
    }

    if (optional){
        basic = basic.optional().or(z.undefined()).or(z.literal(""))
    }

    return basic;
}


