import express from "express";
import "dotenv/config"
import { connect } from "mongoose"
import cors from "cors"
import routerUser from "./router/user.js"
import routerMenu from "./router/menu.js"
import routerlivre_d_or from "./router/livre_d_or.js"
const app = express();
const PORT = 1237 ;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connect(process.env.DB)
    .then(function(){
        console.log("connexion à la base réussie")
    })
    .catch(function(err){
        throw new Error(err)
    })

app.use(cors()); 

app.use("/" , routerUser);
app.use("/" , routerMenu);
app.use("/" , routerlivre_d_or);


app.listen(PORT , function(){
    console.log(`server express écoute sur le port ${PORT}`);
})