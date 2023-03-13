const Laptop = require("../models/Laptop");

exports.getAllProduct = async()=>{
    const product = await Laptop.find({});
    return product;
}

exports.createAProduct = async(data)=>{
    const product = await Laptop.create(data);
    return product;
}

exports.getASingleProduct = async(data)=>{
    const product = await Laptop.find({_id: data});
    return product;
}

exports.deleteASingleProduct = async(data)=>{
    console.log(data)
    const product = await Laptop.deleteOne({_id: data});
    return product;
}