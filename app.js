var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose=require('mongoose');
var app = express();
var productsRoute= require('./routes/product');
var collectionRoute= require('./routes/collection');
var orderRoute=require('./routes/order');
const morgan = require('morgan');
var dotenv = require('dotenv');
//upload folders for files upload
//app.use(express.static('uploads'));
dotenv.config();

// mongoose.connect('mongodb+srv://inamulhaqmayo:'+
// process.env.MONGO_ATLAS_PW+
// '@nodejs1.xb9ir.mongodb.net/nodejs1?retryWrites=true&w=majority',{
//   userMongoClient:true
// })
mongoose 
 .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
         })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.Promise=global.Promise;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRoute);
app.use('/collection',collectionRoute);
app.use('/order',orderRoute);
app.use('/uploads', express.static('uploads'));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message  = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(function(err, req, res, next) {
  res.header('Access-Cotrol-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET ;')
    return res.status(200).json({
        
    })
  }
});
app.use(function(err, req, res, next) {
  const error=new Error('No Found');
  error.status= 404;
  next('error');
});

module.exports = app;
