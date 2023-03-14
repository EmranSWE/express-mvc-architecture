const Laptop = require("../models/Laptop")
const { createAProduct, getAllProduct, getASingleProduct, deleteASingleProduct, updateASingleProduct, bulkUpdate, bulkDeleteProduct } = require("../services/laptop.service")

exports.postAProduct = async (req, res) => {
    try {
        const result = await createAProduct(req.body)
        res.status(200).json({
            status: "Success",
            message: "Product added successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed to post data",
            error: error.message
        })
    }
}

exports.getAProduct = async (req, res) => {
    try {
        let filters = { ...req.query }
        //sort, page, limit ===> exclude
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])
        let filtersString = JSON.stringify(filters)
       
       filtersString = filtersString.replace(/\b(gt| gte|lt|lte)\b/g, match => `$${match}`)
       filters =JSON.parse(filtersString)

        const queries = {}
        if (req.query.sort) {
            //price,quantity ==> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }

        //Pagination
        if(req.query.page){
            const {page = 1, limit=10} = req.query;
            //50 Products
            //Each page has 10 products
            //page 1==> 1-10
            //page 2==> 2-20
            //page 3==> 21-30 (3-1)==> 2*10
            const skip = (page -1)*parseInt(limit);
            queries.skip = skip;
            queries.limit= parseInt(limit)
        }



        const result = await getAllProduct(filters, queries);
        res.status(200).json({
            message:"Successfully getting data",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed to get data",
            error: error.message
        })
    }
}

exports.getASingleProduct = async (req, res) => {
    try {
        const result = await getASingleProduct(req.params.id);
        res.send(result)
    } catch (error) {
        res.status(400).json({
            status: "Failed to post data",
            error: error.message
        })
    }
}



exports.updateData = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateASingleProduct(id, req.body)
        res.send(result)
    } catch (error) {
        res.status(400).json({
            status: "Failed to delete data",
            error: error.message
        })
    }
}

exports.bulkUpdates = async (req, res, next) => {
    try {
        const result = await bulkUpdate(req.body)
        res.send(result)
    } catch (error) {
        res.status(400).json({
            status: "Failed to added bulk data",
            error: error.message
        })
    }
}

exports.deleteAsingleProduct = async (req, res) => {
    try {
        const result = await deleteASingleProduct(req.params.id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't deleted a product"
            })
        }
        res.status(200).json({
            message: "Delete the data successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed to delete data",
            error: error.message
        })
    }
}


exports.bulkDelete = async (req, res) => {
    try {
        const result = await bulkDeleteProduct(req.body.ids);
        res.status(200).json({
            message: "Delete the data successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed to delete data",
            error: error.message
        })
    }
}