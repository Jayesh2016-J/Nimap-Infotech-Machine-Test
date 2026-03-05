const {category,product} = require('../models');
exports.addProduct = async (req,res,next)=>{
    try {
        const {name,price,categoryId} = req.body;
        const existingCategory = await category.findOne({ where: { id: categoryId } });

        if (!existingCategory) {
            const products = await product.findAll({ include: [{ model: category, as: 'category' }] });
            const categories = await category.findAll();
            return res.render('product', { products, categories, error: "Category does not exist" });
        }
         const newProduct = await product.create({name,price,categoryId});
            if(!newProduct){
                const products = await product.findAll({ include: [{ model: category, as: 'category' }] });
                const categories = await category.findAll();
                return res.render('product', { products, categories, error: "Failed to create product" });
            }
        return res.redirect('/api/product/getProduct');
    }
    catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const {name,price,categoryId} = req.body;
        const existingProduct = await product.findOne({ where: { id } });
        if(!existingProduct){
            const products = await product.findAll({ include: [{ model: category, as: 'category' }] });
            const categories = await category.findAll();
            return res.render('product', { products, categories, error: "Product not found" });
        }
        const existingCategory = await category.findOne({ where: { id: categoryId } });
        if (!existingCategory) {
            const products = await product.findAll({ include: [{ model: category, as: 'category' }] });
            const categories = await category.findAll();
            return res.render('product', { products, categories, error: "Category does not exist" });
        }
        const result = await product.update({name,price,categoryId}, {where:{id}});
        if(!result){
            const products = await product.findAll({ include: [{ model: category, as: 'category' }] });
            const categories = await category.findAll();
            return res.render('product', { products, categories, error: "Failed to update product" });
        }
        return res.redirect('/api/product/getProduct');
    }catch(err){
        next(err)
    }
}

exports.deleteProduct = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const existingProduct = await product.findOne({ where: { id } });
        if(!existingProduct){
            return res.redirect('/api/product/getProduct');
        }
        const result = await product.destroy({where:{id}});
        if(!result){
            const products = await product.findAll({ include: [{ model: category, as: 'category' }] });
            const categories = await category.findAll();
            return res.render('product', { products, categories, error: "Failed to delete product" });
        }
        return res.redirect('/api/product/getProduct');
    }catch(err){
        next(err)
    }
}

exports.getAllProduct = async (req,res,next)=>{
    try {
        const products = await product.findAll(
            {include:[{
                model:category,
                as:'category',
                attributes:['name']
            }]}
        );
        const categories = await category.findAll();
        return res.render('product', { products, categories, error: null });
    }catch(err){
        next(err)
    }
}