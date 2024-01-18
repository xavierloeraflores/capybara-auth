require ('dotenv').config();
import {Request, Response} from "express";
const express = require('express');
const port = process.env.PORT || 3000;

console.log('Hello World!');

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send({message: 'Hello World!'});
});

app.listen(port, () => {    
  console.log(`Listening on port ${port}`);
});