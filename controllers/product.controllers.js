const Laptop = require("../models/Laptop")
const { createAProduct, getAllProduct, getASingleProduct, deleteASingleProduct } = require("../services/laptop.service")

exports.postAProduct = async(req,res)=>{
    try {
     const result = await createAProduct(req.body)
     res.status(200).json({
         status:"Success",
         message: "Product added successfully",
         data:result
     })
    } catch (error) {
     res.status(400).json({
         status:"Failed to post data",
         error: error.message
     })
    }
 }

 exports.getAProduct = async(req,res)=>{
    try {
     const result = await getAllProduct();
     res.send(result)
    } catch (error) {
     res.status(400).json({
         status:"Failed to post data",
         error: error.message
     })
    }
 }

 exports.getASingleProduct = async(req,res)=>{
    try {
     const result = await getASingleProduct(req.params.id);
     res.send(result)
    } catch (error) {
     res.status(400).json({
         status:"Failed to post data",
         error: error.message
     })
    }
 }

 exports.deleteAsingleProduct = async(req,res)=>{
    try {
     const result = await deleteASingleProduct(req.params.id);
     res.status(200).json({
        message: "Delete the data successfully",
        data:result
     })
    } catch (error) {
     res.status(400).json({
         status:"Failed to delete data",
         error: error.message
     })
    }
 }