
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
//mongoose setup

// enable cors
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['token']
  };
  let mongodbURI: string;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
}
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodbURI)
  .then(db => {
    console.log('Connected to MongoDB');
  }) 
  .catch((err: any) => {
    console.log(`DB connection error. Please make sure DB is running. ${err}`);
    // process.exit();
})
  app.use(cors(corsOption));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// routes setup

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');

  next(err);
});
// error handler
app.use((err:any, req:any, res:any, next:any) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}..!!`));

export default app;
