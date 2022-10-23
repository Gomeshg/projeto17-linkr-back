import * as userRepository from "../repositories/userRepository.js";
import { authorizationSchema } from "../schemas/schemas.js";

export default async function (req, res, next){

    const authorization = authorizationSchema.validate({authorization: req.headers.authorization},{abortEarly: false})
    console.log(authorization)
    if (authorization.error) {

        const error = authorization.error.details.map(details => details.message);
    
        return res.status(401).send(error);
    };

    const token = req.headers.authorization.replace('Bearer ', '');

    const rows = await userRepository.getItem({table:"sessions", categori:"token", iten: `'${token}'` })

    console.log(rows)


    try {

       
        if(rows.length===0) return res.sendStatus(401)

        res.localItens = rows[0]
        
        next();
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

    
}