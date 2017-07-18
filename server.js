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

// opn('http://localhost:4000', {app: 'chrome'});

var config = {
    user: 'sa',
    password: 'VdP2016!',
    // user : 'root',
    // password:'P@ssw0rd',
    // server: 'localhost\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
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

    // return p1 * p2;  // The function returns the product of p1 and p2
}

// Appel d'une procédure stockée pour ramener les valeurs à vériifer
// var request = new sql.Request()
// request.input('NUM_CT', '01305')
// // request.output('output_parameter', sql.NVarChar)
// request.execute('IHM_GET_CENTRE_THERMIQUE', (err, result) => {
//     console.log(result);
//     console.log(err);
// });

// app.get('/api/event', function(req, res) {
// query('Select id,CT,DGF,Debut as "start", Fin as "end", Evenement as "title" from dbo.Evenements',req,res, true)
// });

// Procédure stockée Centre Thermique
app.post('/api/CT', function(req, res) {
var b = req.body;
// console.log(b)
// Appel d'une procédure stockée pour ramener les valeurs à vériifer
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
// Appel d'une procédure stockée pour ramener les valeurs à vériifer
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_CENTRE_THERMIQUE_GROUPE_EXPLOITATION', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});
// Procédure stockée Equipement
app.post('/api/Eqp', function(req, res) {
var b = req.body;
//console.log(b)
// Appel d'une procédure stockée pour ramener les valeurs à vériifer
var request = new sql.Request()
request.input('NUM_CT', sql.NVarChar, b.CT)
// request.output('output_parameter', sql.NVarChar)
request.execute('IHM_GET_CENTRE_THERMIQUE_EQUIPEMENT', (err, result) => {
  if (err) res.send(err)
  else res.send(result.recordset)
});
});
//var select= "SELECT * From CENTRE_THERMIQUE Where CTH_NUM_CT =\'" + b.CT + "\'"
//var select = "SELECT * From CENTRE_THERMIQUE left join CENTRE_THERMIQUE_TYPE on CTH_CTT_ID = CTT_ID left join STATUT on CTH_STA_ID = STA_ID left join ENERGIE on CTH_NRG_ID = NRG_ID Where CTH_NUM_CT =\'" + b.CT + "\'"
// var select = "SELECT	*  FROM [CENTRE_THERMIQUE] LEFT JOIN CENTRE_THERMIQUE_GRP_EXPLOITATION ON CTG_CTH_ID = CTH_ID LEFT JOIN GROUPE_EXPLOITATION ON  CTG_GRE_ID = GRE_ID LEFT JOIN ROLE_EXPLOITANT ON RXP_ID = CTG_RXP_ID LEFT JOIN STATUT ON CTH_STA_ID = STA_ID LEFT JOIN ENERGIE ON CTH_NRG_ID = NRG_ID LEFT JOIN CENTRE_TECHNIQUE_EQUIPEMENT ON CTE_CTH_ID = CTH_ID LEFT JOIN EQUIPEMENT ON EQP_ID = CTE_EQP_ID LEFT JOIN COLLECTIVITE ON COL_ID = EQP_COL_ID WHERE RXP_ID = '1' AND CTH_NUM_CT =\'" + b.CT + "\'"
// query(select,req,res,true)

// app.post('/api/LISTE', function(req,res)) {
// var c = req.body;
// console.log(c)
// var select= "SELECT * From CENTRE_THERMIQUE Where CTH_NUM_PT =\'" + c.LISTE + "\'"
// query(select,req,res,true)
// });

// CallableStatement cs = conn.prepareCall("{call SHOW_FOURNISSEURS}");
// ResultSet rs = cs.executeQuery();

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
//    .input('input_parameter', sql.Int, value)
//    .query('select TOP 5 * from SUPERVISION where id = @input_parameter').then(function(recordset) {
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
