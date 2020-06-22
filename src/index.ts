import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { addRoutes } from './routes/index.routes';
const morgan = require('morgan');
const app = express();

//middlwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


//routes
addRoutes(app);


app.listen(4000, () => {
    console.log('Server on port  4000');
})
