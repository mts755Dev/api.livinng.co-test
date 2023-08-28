import app from "./src/index.js";
import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env || 3000;



app.listen(PORT, "0.0.0.0");
console.log("Server on port", PORT);

