"use strict";//----------------------OPC-------------------------
const sql = require('mssql');
var express = require('express');
var app = express();
var opn = require('opn');
var bodyParser = require("body-parser");
var morgan = require('morgan');             // log requests to the console (express4)
// Binding express app to port 3000
app.listen(4000,function(){
    console.log('Node server running @ http://localhost:4000')
});
// app.use(parser.urlencoded({extended : true}));
app.use(morgan('dev')); //Log server
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

opn('http://localhost:4000', {app: 'chrome'});

var config = {
    user: 'BdConnectClient',
    password: 'Uuxwp7Mcxo7Khy',
    // user : 'root',
    // password:'P@ssw0rd',
    // server: 'localhost\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
    server: '10.18.10.3\\MSSQLSERVER',
    database: 'DONNEES',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

sql.connect(config).then(function() {
  // Query
console.log('MS SQL connected success');
}).catch(function(err) {
        console.log(err.name + ' --> ' + err.code + ' : ' + err.message);
});

function query(query, req, res, read) { //read = true only for SELECT query
  var request =  new sql.Request()
  .query(query).then(function(rec) {
  if(read) { var ids = JSON.parse(JSON.stringify(rec.recordset).replace(/"\s+|\s+"/g,'"'))
  res.json(ids)
// console.log(ids)

}
  else res.send()
  }).catch(function(err) {
  console.log(err.name + ' --> ' + err.code + ' : ' + err.message);
  res.send(err)
  });

    // return p1 * p2;              // The function returns the product of p1 and p2
}

// app.get('/api/event', function(req, res) {
// query('Select id,CT,DGF,Debut as "start", Fin as "end", Evenement as "title" from dbo.Evenements',req,res, true)
// });

app.post('/api/CT', function(req, res) {
var b = req.body;
console.log(b)
var select= "SELECT * From SUPERVISION Where localisation=\'" + b.CT + "\'"
query(select,req,res,true)
});

// app.post('/api/delete', function(req, res) {
// var b = req.body;
// console.log(b)<z
// var update= "DELETE From dbo.Evenements Where id=\'" +b.Id+ "\'"
// query(update,req,res,false)
//    });

app.use('/',  express.static(__dirname + '/')); //Fichier a servir

// app.get('*',function(req,res){
//     res.sendFile('index.html',{'root': __dirname });
// });

app.use(function(req, res, next){
  res.status(404);
  // default to plain-text. send()
   res.type('txt').send('Not found');
 });





//     var request =  new sql.Request()
//
//      //    .input('input_parameter', sql.Int, value)
//       // .query('select TOP 5 * from SUPERVISION where id = @input_parameter').then(function(recordset) {
//
//       .query('select TOP '+ SELECT + ' * from dbo.SUPERVISION  ').then(function(recordset) {
//
//       //  ids=JSON.stringify(recordset, [ 'Metier', 'Installation_technique','NomGroupeFonctionnel','DesignGroupeFonctionnel','NomObjetFonctionnel','DesignObjetFonctionnel','Information','Libelle_information']);
//       ids = JSON.parse(JSON.stringify(recordset).replace(/"\s+|\s+"/g,'"'))
//       console.log(Object.keys(ids).length);
//
//       //  TOTAL = Object.keys(ids).length;
//       // console.log(ids);
//       callback();
//       }).catch(function(err) {
//
//         console.log(err.name + ' --> ' + err.code + ' : ' + err.message);
//     });
//
//     }).catch(function(err) {
//         console.log(err.name + ' --> ' + err.code + ' : ' + err.message);
//
//     });



      // use mongoose to get all todos in the database
      // Todo.find(function(err, todos) {
      //
      //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      //     if (err)
      //         res.send(err)
      //
      //     res.json(todos); // return all todos in JSON format
