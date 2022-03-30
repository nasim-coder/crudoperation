const Product = require('../model/Product')
const Category = require('../model/Category')
const mongoose = require('mongoose')

exports.addProduct = async (req, res) => {
    const { name, price, categoryId } = req.body;
    let category;
    try {
        category = await Category.find({ categoryId: categoryId })
   } catch (err) {
       return res.status(400).send({success: false, msg: err})
    }
    
    let product;
    if (name && price && category) {
        product = new Product({
            name: name,
            price: price,
            category: category
        });
    }else {
        return res.status(204).send({ success: false, msg: "all fields are required"})
   }
    
    await product.save((err) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        }
    })
    return res.status(200).send({success: true, msg: "product added successfully"})
}

exports.getallProduct = async (req, res) => {
    let products;
    try {
         products = await Product.find({ });
    } catch (error) {
        return res.status(500).send({ success: false, msg: err })
    }  
    return res.status(200).send(products)
}

exports.changePrice = async (req, res) => {
    let pid = mongoose.Types.ObjectId(req.params.productid);
    let newprice = req.body.newprice;
    await Product.updateOne({ _id: pid }, { price: newprice }, (err) => {
        if (err) {
            return res.status(500).send({ success: false, msg: err })
        }
    });
    return res.status(200).send({success: true, msg: "price updated successfully"})
    
}

exports.deleteproduct = async (req, res) => {
    let pid = mongoose.Types.ObjectId(req.params.productid);
    await Product.deleteOne({ _id: pid }, (err) => {
        if (err) {
            return res.status(500).send({ success: false, msg: err })
        }
    })
    return res.status(200).send({success: true, msg:"deleted successfully"})
}



