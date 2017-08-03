"use strict";//----------------------OPC-------------------------
const sql = require('mssql');
var express = require('express');
var app = express();
var opn = require('opn');
var bodyParser = require("body-parser");
var morgan = require('morgan');

// Binding express app to port 3000
app.listen(4000,function(){
    console.log('Node server running @ http://localhost:4000')
});

// app.use(parser.urlencoded({extended : true}));
app.use(morgan('dev')); //Log server
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// opn('http://localhost:4000', {app: 'chrome'});
var config = {
    user: 'sa',
    password: 'VdP2016!',
    server: '10.18.10.3\\MSSQLSERVER',
    database: 'BDD_DONNEES',

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
}

// Procédure stockée Centre Thermique
app.post('/api/CT', function(req, res) {
var b = req.body;
// console.log(b)
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_CENTRE_THERMIQUE', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});

// Procédure stockée Groupe Exploitation
app.post('/api/Exp', function(req, res) {
var b = req.body;
// console.log(b)
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_CENTRE_THERMIQUE_GROUPE_EXPLOITATION', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});

// Procédure stockée Equipement
app.post('/api/Eqpt', function(req, res) {
var b = req.body;
console.log(b)
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_CENTRE_THERMIQUE_EQUIPEMENT', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});

// Procédure stockée Objet Fonctionnel
app.post('/api/GpeFonc', function(req, res) {
var b = req.body;
console.log(b)
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_CENTRE_THERMIQUE_GROUPE_FONCTIONNEL', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});

// Procédure stockée Objet Fonctionnel
app.post('/api/NbeGroup', function(req, res) {
var b = req.body;
console.log(b)
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_NB_GROUPE_FONCTIONNEL', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});

app.use('/',  express.static(__dirname + '/')); //Fichier a servir

app.use(function(req, res, next){
  res.status(404);
  // default to plain-text. send()
   res.type('txt').send('Not found');
 });
