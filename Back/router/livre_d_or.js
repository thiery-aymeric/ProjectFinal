import {Router} from "express"
import { Message, validMessage } from "../model/livre_d_or.js"


const router = Router();


//ajout d'un nouveau profil
router.post("/add-message", async function(req, rep){
    const body = req.body ;
   
    const {error} = validMessage.validate(body, {abortEarly : false})
    if(error){
        rep.status(400).json({msg : "message invalid"});
        return ; 
    }

    const message = new Message(body)
    const reponse = await message.save();
    rep.json(reponse)
})


export default router ; 