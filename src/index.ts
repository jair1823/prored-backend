import express from 'express';
import cors from 'cors';
import { addRoutes } from './routes/index.routes';
const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
addRoutes(app);


app.listen(4000, () => {
    console.log('Server on port  4000');
})