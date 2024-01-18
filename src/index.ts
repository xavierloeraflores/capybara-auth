require ('dotenv').config();
import {Request, Response} from "express";
const express = require('express');
const app = express();
const mysql = require('mysql');


const port = process.env.PORT || 3000;
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err: any) => {
  if (err) throw err;
  console.log('Connected!');
});



app.get('/', (req: Request, res: Response) => {
  connection.query('SELECT * from test_test', function (error: Error, results: any[], _fields: any[]) {
    if (error) {
      res.send({message: 'Could not connect to database'});
      throw error;
    }
    res.send(results[0]);
  });
});

app.listen(port, () => {    
  console.log(`Listening on port ${port}`);
});