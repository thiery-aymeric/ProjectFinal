import Joi  from "joi";
import {Schema, model} from "mongoose";

/* création du shema d'un Menu */

const schemaMenu = new Schema({
    nomEntree : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 30
    },
    desciptionEntree : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 1000
    },
    nomPlat : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 30
    },
    desciptionPlat : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 1000
    },
    nomDessert : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 30
    },
    desciptionDessert : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 1000
    },
    dt_utilisation:{type:Date},
    dt_creation :  {type : Date , default : Date.now}
})


export const Menu = model( "FinalProjectMenus" , schemaMenu);

// création de la validation
export const validMenu = Joi.object({
    day:Joi.number().required(),
    month:Joi.number().required(),
    years:Joi.number().required(),
    nomEntree:Joi.string().min(2).max(255).optional(),
    desciptionEntree:Joi.string().min(2).max(1000).optional(),
    nomPlat:Joi.string().min(2).max(255).required(),
    desciptionPlat:Joi.string().min(2).max(1000).required(),
    nomDessert:Joi.string().min(2).max(255).optional(),
    desciptionDessert:Joi.string().min(2).max(1000).optional()
})