import * as userRepository from '../repositories/userRepository.js' 

export default async function followController(req,res){
    const { id } = req.params;

    const {userId} = res.localItens

    try {
        const rows = await userRepository.getItem({table:"users", categori:"id",iten: id})
        

        if(rows.length===0)res.status(401).send("non-existent user")

        const follow = await userRepository.getItemFollow({userId:userId,following:id})

        if(follow.length===0){ 

            await userRepository.insert({localItens:`followers("userId",following)`, iten:[userId,id] })

            console.log(rows, id ,userId, follow)
        
            return res.sendStatus(200)
        }
        console.log("OIII")

        await userRepository.deleteFollow({userId:userId,following:id})

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}