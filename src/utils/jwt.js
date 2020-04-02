const jwt = require("jsonwebtoken")
const JWTKEY = process.env.JWTKEY

/**
 * Firma una carga y genera un jwt
 * @param {any} payload Carga a firmar
 * @returns {string} JSON Web Token
 */
export const jwtSign = payload => {
    let token = jwt.sign(payload, JWTKEY)
    return token
}

/**
 * Verifica el jwt ingresado
 * @param {string} token JSON Web Token a verificar
 * @returns {"error"|"expired"|any} "error" | "expired" | any
 */
export const jwtVerify = token => {
    if(!token) return "error"
    else {
        token = token.replace("Bearer ", "")
        return jwt.verify(token, JWTKEY, (err, decoded) => {
            if(err) {
                if(err.name == "TokenExpiredError") return "expired"
                else return "error"
            } else return decoded
        })
    }
}
