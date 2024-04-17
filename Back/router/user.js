import {Router} from "express"
import { User, validUser } from "../model/user.js"
import { hash , compare } from "bcrypt";
import { isValidObjectId } from "mongoose"
import {verifyToken} from "../middelWare/verification.js"
const router = Router();


//ajout d'un nouveau profil
router.post("/addProfil",verifyToken, async function(req, rep){
    const body = req.body ;
    
    const {error} = validUser.validate(body, {abortEarly : false})
    if(error){
        rep.status(400).json({msg : "profil invalid"});
        return ; 
    }
    // est ce qu'il y a un user qui a déjà pris cet email ?
    const userExist =  await User.findOne({nom : body.nom})

    if(userExist){
        rep.status(400).json({msg : "email déjà utilisé"});
        return ; 
    }

    const passwordHashe = await hash(body.password, 10);
    body.password = passwordHashe;
    const user = new User(body)
    const reponse = await user.save();
    rep.json(reponse)
})

//connection des utilisateurs
router.post("/login", async function(req, rep){
    const body = req.body ;
   
    const {error} = validUser.validate(body, {abortEarly : false})
    if(error){
        rep.status(400).json({msg : "profil invalid"});
        return ; 
    }
    // est ce qu'il y a un user qui a déjà pris cet email ?
    const userExist =  await User.findOne({nom : body.nom})

    if(!userExist){
        rep.status(404).json({msg : "aucun user avec cet email"});
        return ; 
    }

    // est ce que le profil que l'on a trouvé a un password qui ressemble celui dans la base de données 

    const verif = await compare( body.password , userExist.password );

    if(!verif){
        rep.status(404).json({msg : "identifiants invalides"});
        return ; 
    }

    // création du token ici 
    const token = userExist.generateJWT(); 
    
    rep.json({ msg : "bienvenue" , token  }); 
})

// recupere un ou les utilisateurs
router.get("/users" , async function(req, rep){
    const user = await User.find().sort({ dt_publication: -1 });
    rep.json(user); 
})

router.get("/users/:id", async function(req, rep){
    const id = req.params.id
    const verif = isValidObjectId(id)
    if(!verif){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const user = await User.findOne({_id : id})
    if(!user){
        rep.status(404).json({msg : "user introuvable"})
        return ; 
    }
    rep.json(user); 
})

//modification ou suppression d'un utilisateur
router.get("/delete-user/:id", verifyToken ,  async function(req, rep){
    const id = req.params.id ; 
    const verification = isValidObjectId(id)
    if(!verification){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const user = await User.findOne({_id : id})
    if(!user){ 
        rep.status(404).json({msg : "article introuvable"})
        return ; 
    }
    await User.deleteOne({_id : id})
    const allUsers = await User.find().sort({ dt_publication: -1 });
    rep.json(allUsers) ;  //une fois que j'ai réussi à supprimer mon article 
    // node me retourne l'ensemble des articles présents en base de données
})

router.post("/update-article/:id", verifyToken , validUser ,async function(req, rep){
    const id = req.params.id ;
    const body = req.article ; 
    const reponse = await User.updateOne({_id : id},{$set : body}, {$new : true });
    rep.json(reponse);
})
export default router ; 