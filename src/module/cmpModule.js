const mongoose=require("mongoose")

const cmpSchema=new mongoose.Schema({

    companyname:{
        type:String,
        required:true,
        unique:true
    },
    headofficeaddress:{
        type:String,
        required:true,
        unique:true

    },
    country:{
        type:String,
        required:true,

    },
    postalcode:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    countrycode:{
        type:String,
        required:true
    },
    contactnumber:{
        type:String,
        required:true,
        unique:true
    },
    websiteurl:{
        type:String,
        required:true
    },
    keycontactperson:{
        name:{
            type:String,
            required:true},
        degignation:{
            type:String,
        required:true
        },
        countrycode:{
            type:String,
        required:true
        },
        contactnumber:{
            type:String,
        required:true
        },
        email:{
            type:String,
        required:true
        }
    },
    isDeleted:{ 
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

module.exports=mongoose.model("company",cmpSchema)





