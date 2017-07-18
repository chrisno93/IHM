app.controller('AppCtrl', function ( $scope, $http) {
  var NumCT = "01305"
  var date = new Date();
  $scope.tab =  []
  $scope.adr = ""
  $scope.ville = ""
  $scope.puiss = ""
  $scope.desc =""
  $scope.p1 =""
  $scope.p1 =""
  $scope.p1 =""
  $scope.p1 =""
  $scope.pt =""
  $scope.ct =""
  $scope.ctr =""
  $scope.super =""
  $scope.typ =""
  $scope.stat =""
  $scope.nrg =""
  $scope.prev =""
  $scope.rmq =""
  $scope.dat =""
  $scope.der =""
  $scope.exp =""
  $scope.peri =""
  $scope.resptech =""
  $scope.respadmin =""
  $scope.cho =""
  $scope.chno =""
  $scope.refinter =""
  $scope.eqp =""
  $scope.numeqp =""
  $scope.eqpadr =""
  $scope.eqpcontact =""
  $scope.eqptel =""
  $scope.eqsvcefonc =""
  $scope.eqpsvceges =""
  $scope.coll =""
  $scope.nbcapt =""
  $scope.FromDate = ('0' + date.getDate()).slice(-2)  + '-' +  ('0' + (date.getMonth() + 1)).slice(-2) + '-' +  date.getFullYear();

  function get_CT()
  {
    $http.post('/api/CT' , { CT : NumCT } )
       .success(function(data) {
                       DATA = data ;
                       $scope.adr = DATA[0].CTH_ADRESSE
                       $scope.cp = DATA[0].CTH_CODE_POSTAL
                       $scope.ville = DATA[0].CTH_VILLE
                       $scope.puiss = DATA[0].CTH_PUISSANCE_CT
                       $scope.desc = DATA[0].CTH_DESC_CT
                       $scope.p1 = DATA[0].CTH_P1
                       $scope.p2 = DATA[0].CTH_P2
                       $scope.p3 = DATA[0].CTH_P3
                       $scope.p4 = DATA[0].CTH_P4
                       $scope.pt = DATA[0].CTH_NUM_PT
                       $scope.ct = DATA[0].CTH_NUM_CT
                       $scope.ctr = DATA[0].CTH_CTR_ID
                       $scope.super = DATA[0].CTH_SUPERVISE
                       $scope.typ = DATA[0].CTT_LBL
                       $scope.stat = DATA[0].STA_LBL
                       $scope.nrg = DATA[0].NRG_LBL
                       $scope.prev = DATA[0].CTH_DAT_PREV_RENOV
                       $scope.rmq = DATA[0].CTH_RMQ_PREV_RENOV
                       $scope.dat = DATA[0].CTH_DAT_DER_RENOV
                       $scope.der = DATA[0].CTH_RMQ_DER_RENOV
                       $scope.exp = DATA[0].GRE_EXP_COD
                       $scope.peri = DATA[0].GRE_PERIMETRE_COD
                       $scope.resptech = DATA[0].GRE_RESP_TECHNIQUE
                       $scope.respadmin = DATA[0].GRE_RESP_ADM
                       $scope.cho = DATA[0].GRE_CONTACT_HO
                       $scope.chno = DATA[0].GRE_CONTACT_HNO
                       $scope.refinter = DATA[0].GRE_REF_INTERNE
                       $scope.eqp =DATA[0].EQP_DESIGNATION
                       $scope.numeqp =DATA[0].EQP_NUM
                       $scope.eqpadr =DATA[0].EQP_ADRESSE
                       $scope.eqpcontact =DATA[0].EQP_CONTACT
                       $scope.eqptel =DATA[0].EQP_CONTACT_TEL
                       $scope.eqsvcefonc =DATA[0].EQP_SERVICE_FON
                       $scope.eqpsvceges =DATA[0].EQP_SERVICE_GES
                       $scope.coll = DATA[0].COL_LBL
                       $scope.nbcapt =DATA[0].EQP_NB_CAPTEUR
                      
                   })
       .error(function(data) {
       console.log('Error: ' + data);
       });

       }

   get_CT();

   $scope.$watch('adr', function (newValue,oldValue)
{
console.log($scope.adr)
})

  //  function update_post(event)
  //  {
  //    var toSend = {Id : event.id , CT : event.CT , DGF : event.DGF , Title: event.title , Debut : event.start._d.toISOString(), Fin : event.end._d.toISOString() }
  //    $http.post('/api/event' , toSend )
  //    .success(function(data) {
  //                    console.log(data);
  //                })
  //    .error(function(data) {
  //    console.log('Error: ' + data);
  //    });
  //  }

  // $http.get('/api/event')
  //      .success(function(data) {
  //           console.log(data)
  //
  //           })
  //      .error(function(data) {
  //          console.log('Error: ' + data);
  //      });

});
