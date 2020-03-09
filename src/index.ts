import express from 'express';
import cors from 'cors';



const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use();

app.listen(3000, () => {
    console.log('Server on port  3000');