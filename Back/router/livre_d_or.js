import {Router} from "express"
import { Message, validMessage } from "../model/livre_d_or.js"
import { isValidObjectId } from "mongoose"
import {verifyToken} from "../middelWare/verification.js"

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

// recupere un ou les messages utilisateurs
router.get("/messages" , async function(req, rep){
    const message = await Message.find().sort({ dt_publication: -1 });
    rep.json(message); 
})

router.get("/users/:id", async function(req, rep){
    const id = req.params.id
    const verification = isValidObjectId(id)
    if(!verification){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const message = await Message.findOne({_id : id})
    if(!message){
        rep.status(404).json({msg : "message introuvable"})
        return ; 
    }
    rep.json(message); 
})

//modification ou suppression d'un message utilisateur
router.get("/delete-message/:id", verifyToken ,  async function(req, rep){
    const id = req.params.id ; 
    const verification = isValidObjectId(id)
    if(!verification){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const message = await Message.findOne({_id : id})
    if(!message){ 
        rep.status(404).json({msg : "article introuvable"})
        return ; 
    }
    await Message.deleteOne({_id : id})
    const allMessage = await Message.find().sort({ dt_publication: -1 });
    rep.json(allMessage) ;  //une fois que j'ai réussi à supprimer mon message 
    // node me retourne l'ensemble des messages présents en base de données
})

export default router ;