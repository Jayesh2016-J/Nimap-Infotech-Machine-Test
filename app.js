const express = require('express')
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');

const { globalerror } = require('./utlis/globalerror');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);

app.get('/', (req, res) => {
    res.redirect('/api/category/getCategory');
});

app.use(globalerror);

app.listen(5000,()=>{
    console.log(`Server Start http://localhost:5000`)
})