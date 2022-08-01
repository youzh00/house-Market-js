const mongoose = require('mongoose');



const houseSchema=new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
      },
    price:{
        type:number,required:true
    },
    forRent:{
        type:boolean
    },
    forSale:{
        type:boolean,
    },
    city:{
        type:string,
        required:true
    },
    country:{
        type:string,
        required:true
    },
    propertyType:{
        type:string,  // Home, Appartment or Desktop 
        required:true,
        value:
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
},
{
  timestamps: true,
})



const HouseModel=mongoose.model("House", houseSchema);

module.exports = HouseModel