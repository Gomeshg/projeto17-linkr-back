import * as userRepository  from '../repositories/userRepository.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export async function signIn(req, res){

    try {
        const rows = res.localItens 

        console.log(rows)
        const token = uuid();
        
        await userRepository.insert({localItens:`sessions("usersId", token)`, iten:[ rows[0].id, token]}) 

        res.send({token: token}).status(200);
    
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }

} 

export async function signUp(req, res){

    const {name, email, pictureUrl, password} = req.body

    const encrypt = bcrypt.hashSync(password, 10);

    try {

        await userRepository.insert({localItens:`users("userName", email, "pictureUrl", "passwordHash" )`, iten:[name, email, pictureUrl,encrypt]} )              

        res.sendStatus(201);
    
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }

}