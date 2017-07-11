app.controller('AppCtrl', function ( $scope, $http) {
  var NumCT = "01410"
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
  $scope.date =""

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
                       //$scope.tab = DATA
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

// Date systeme
function Ctrl($scope)
{
  $scope.date = new Date();
}

});
