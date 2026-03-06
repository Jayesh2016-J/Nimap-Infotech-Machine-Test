const {category} = require('../models');

exports.addCategory = async (req,res,next)=>{
    try {
        const {name} = req.body;
        const existingCategory = await category.findOne({ where: { name } });

        if (existingCategory) {
            const categories = await category.findAll();
            return res.render('category', { categories, error: "Category already exists" });
        }
       const newCategory = await category.create({name});
       if(!newCategory){
            const categories = await category.findAll();
            return res.render('category', { categories, error: "Failed to create category" });
       }
        return res.redirect('/api/category/getCategory');
    } catch (err) {
        next(err);
    }
};


exports.updateCategory = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const {name} = req.body;
        const existingCategory = await category.findOne({ where: { id } });
        if(!existingCategory){
            const categories = await category.findAll();
            return res.render('category', { categories, error: "Category not found" });
        }
        const result = await category.update({name}, {where:{id}});
        if(!result){
            const categories = await category.findAll();
            return res.render('category', { categories, error: "Failed to update category" });
        }
        return res.redirect('/api/category/getCategory');
    }catch(err){
        next(err)
    }
}


exports.deleteCategory = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const existingCategory = await category.findOne({ where: { id } });
        if(!existingCategory){
            return res.redirect('/api/category/getCategory');
        }
        const result = await category.destroy({where:{id}});
        if(!result){
            const categories = await category.findAll();
            return res.render('category', { categories, error: "Failed to delete category" });
        }
        return res.redirect('/api/category/getCategory');
    }catch(err){
        next(err)
    }  
}

exports.getAllCategory = async (req,res,next)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        const { count, rows: categories } = await category.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['id', 'ASC']]
        });
        const totalPages = Math.ceil(count / pageSize);

        return res.render('category', { 
            categories, 
            error: null,
            currentPage: page,
            totalPages,
            totalItems: count
        });
    }catch(err){
        next(err)
    }
}

