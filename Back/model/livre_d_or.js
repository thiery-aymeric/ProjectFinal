import Joi  from "joi";
import {Schema, model} from "mongoose";

/* création du shema d'un message */

const schemaMessage = new Schema({
    nom : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 20
    },
    message : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 10000
    },
    
    dt_creation :  {type : Date , default : Date.now}
})


export const Message = model( "FinalProjectMessagesClient" , schemaMessage);

export const validMessage = Joi.object({
    nom:Joi.string().min(2).max(255).required(),
    message:Joi.string().min(2).max(10000).required()
})