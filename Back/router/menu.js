import {Router} from "express"
import { Menu, validMenu } from "../model/menu.js"
import {verifyToken} from "../middelWare/verification.js"
import { isValidObjectId } from "mongoose"
const router = Router();


//ajout d'un nouveau profil
router.post("/addMenu",verifyToken ,async function(req, rep){
    const body = req.body ;
   
    const {error} = validMenu.validate(body, {abortEarly : false})
    if(error){
        rep.status(400).json({msg : "menu invalid"});
        return ; 
    }

    const menu = new Menu(body)
    const reponse = await menu.save();
    rep.json(reponse)
})

// récupérer l'ensemble des menus stockés 
router.get("/Menus" , async function(req, rep){
    const menu = await Menu.find().sort({ dt_publication: -1 });
    rep.json(menu); 
})

router.get("/Menus/:id", async function(req, rep){
    const id = req.params.id
    const verif = isValidObjectId(id)
    if(!verif){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const menu = await Menu.findOne({_id : id})
    if(!menu){
        rep.status(404).json({msg : "menu introuvable"})
        return ; 
    }
    rep.json(menu); 
})


export default router ; 