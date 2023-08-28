import express from "express";
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from "./routes/index.js";
import cors from "cors";

app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 100000 }))


app.use(routes);

export default app;
