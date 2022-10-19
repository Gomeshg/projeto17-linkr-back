import * as userRepository  from '../repositories/userRepository.js';
import * as schemas from '../schemas/schemas.js';
import bcrypt from 'bcrypt';

// função tentativa de refatoração //
async function validUser({ res , table , categori, iten , erro }){
    try {
        
    const rows = await userRepository.getItem({table:table, categori:categori, iten: `'${iten}'` }); 

    if(rows.length===0)res.sendStatus(erro); 

    return rows;

    } catch (error) {
        res.sendStatus(400)        
    }    

}

export async function signInValidation(req, res, next){

    const {email, password} = req.body

    const valid = schemas.signinSchema.validate(req.body,{abortEarly: false})

    
    if (valid.error) {

        const error = valid.error.details.map(details => details.message);
    
        return res.status(422).send(error);
    };
    try {
        
    const rows = await validUser({res:res,  table: "users" ,categori:"email" , iten:email , erro:401})

    const comparer = bcrypt.compareSync(password, rows[0].passwordHash )

    if(!comparer) return res.sendStatus(401);

    res.localItens = rows;

    next();
    } catch (error) {
    res.sendStatus(400)            
    }
}

export async function signUpValidation(req, res, next){


    const {email} = req.body
       
    const valid = schemas.signupSchema.validate(req.body,{abortEarly: false})
    
    if (valid.error) {

        const error = valid.error.details.map(details => details.message);
    
        return res.status(422).send(error);
    };
    try {
        
        const rows = await userRepository.getItem({table: "users" ,categori:"email" , iten:`'${email}'` }); 

        console.log(rows)

        if(rows.length>0)return res.sendStatus(409); 
        
        next();

    } catch (error) {
        res.sendStatus(400)
    }

}