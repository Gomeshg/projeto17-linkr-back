import * as userRepository from '../repositories/userRepository.js'

export default async function validLike(req,res, next){
        if(req.body.id && req.body.linkId )return res.send("post id and linkId").status(400);
    try {
        const valid = await userRepository.localizePost({user:req.body.id, iten:req.body.linkId})
        
        if(valid.lengt===0) return res.sendStatus(401)

        res.localItens = valid[0];
        
        console.log(item, 'OI')

        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }


}