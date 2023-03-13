const  mongoose  = require("mongoose")

//Mongoose has three steps , 1: create a mongo schema, 2: Create a model, 3: Create query=> get,post,put,patch,delete

//Defining a schema
const laptopSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    model:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:1000
    },
    quantity:{
        type:Number,
        min:0
    },
    brand:{
        type:String,
        required:true
    }
})

//To post data to database, first we need to create an instance of mongoose model
const Laptop = mongoose.model("laptop",laptopSchema)

module.exports = Laptop;