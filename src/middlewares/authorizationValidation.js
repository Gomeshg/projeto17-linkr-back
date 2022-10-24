import * as userRepository from "../repositories/userRepository.js";
import { authorizationSchema } from "../schemas/schemas.js";

export default async function (req, res, next){

    console.log(req.headers.authorization)

    const authorization = authorizationSchema.validate({authorization: req.headers.authorization},{abortEarly: false})
    if (authorization.error) {

        const error = authorization.error.details.map(details => details.message);
    
        return res.status(401).send(error);
    };

    const token = req.headers.authorization.replace('Bearer ', '');

    const rows = await userRepository.getItem({table:"sessions", categori:"token", iten: `'${token}'` })

    try {

       
        if(rows.length===0) return res.sendStatus(401)

        res.localItens = rows[0]
        
        next();
    } catch (error) {
        res.sendStatus(400)
    }

    
}