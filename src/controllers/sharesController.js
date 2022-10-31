import * as userRepository from '../repositories/userRepository.js' 

export default async function shares(req,res){


    try {

        const {userId ,linkId, repostUserId} = res.localItens

        if(linkId!==0 && repostUserId!==0){

            await userRepository.insert({localItens: `shares("linkId","userId","RepostId")`, iten:[linkId, userId , repostUserId]})
            
           // const link = await userRepository.getItem({table:"links", categori:"id",iten:linkId})
            
           // await userRepository.insert({localItens: `links("userId", url ,repost, text )`, iten:[userId, link[0].url, true, link[0].text]})
        
        }

        const cont = await userRepository.getItem({table:"shares", categori:`"linkId"`,iten:linkId })

        const i = cont.length

        res.send({cont:i}).status(200)
    
    } catch (error) {
        res.sendStatus(400)
        
    }

} 