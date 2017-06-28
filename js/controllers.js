app
.controller('AppCtrl', function ( $scope, $http) {
  var CTdemo = "CT19001"
  $scope.tab =  []
  $scope.exp = ""
  function get_CT()
  {
    $http.post('/api/CT' , { CT : CTdemo } )
       .success(function(data) {
                       DATA = data ;
                       $scope.exp = DATA[0].Metier
                       $scope.tab = DATA
                   })
       .error(function(data) {
       console.log('Error: ' + data);
       });


       }

   get_CT();


   $scope.$watch('exp', function (newValue,oldValue)
{
console.log($scope.exp)
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
