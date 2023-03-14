const Laptop = require("../models/Laptop");



exports.getAllProduct = async (filters, queries) => {
    // =====================Advandced Query===========
    //.sort({price:-1});
    //.sort('name price quantity');
    // {price:{$gt:50}},gt,gt,gte,lte
    const product = await Laptop.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
        const totalProducts =await Laptop.countDocuments(filters)
        const pageCount =Math.ceil(totalProducts/queries.limit)
    return {totalProducts,pageCount,product};
}

exports.createAProduct = async (data) => {
    const product = await Laptop.create(data);
    return product;
}

exports.getASingleProduct = async (data) => {
    const product = await Laptop.find({ _id: data });
    return product;
}



exports.updateASingleProduct = async (productId, data) => {
    const product = await Laptop.updateOne({ _id: productId }, { $set: data }, {
        $inc: data
    }, {
        runValidators: true
    });
    // ==================
    // const product = await Laptop.findById(productId)
    // const result = await product.set(data).save()
    return product;
}


exports.bulkUpdate = async (data) => {
    // const product = await Laptop.updateMany({ _id: data.ids }, data, {
    //     runValidators: true
    // });

    const products = [];
    data.ids.forEach(product => {
        products.push(Laptop.updateOne({ _id: product.id }, product.data))
    });
    const result = await Promise.all(products)
    return result;
}


exports.deleteASingleProduct = async (data) => {
    console.log(data)
    const product = await Laptop.deleteOne({ _id: data });
    return product;
}

exports.bulkDeleteProduct = async (ids) => {
    console.log(ids)
    const product = await Laptop.deleteMany({});
    return product;
}