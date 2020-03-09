import express from 'express';
import cors from 'cors';
import Network from './routes/network.routes'


const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Network)

app.listen(4000, () => {
    console.log('Server on port  4000');
})