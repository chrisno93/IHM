app
.controller('AppCtrl', function ( $scope,$http) {

  // $('.fc-slot5').css({'background-color':'yellow', 'opacity':0.5 });

   $scope.eventSources = []
  function get_event()
  {
    $scope.eventSources.length = 0 ;
    $http.get('/api/event')
         .success(function(data) {
              var len = data.length ;
              for (var i = 0 ; i < len; i++) {
                console.log(data[i]);
                $scope.eventSources.push({events : [data[i]] } )}

                // console.log($scope.eventSources)
              })
         .error(function(data) {
             console.log('Error: ' + data);
         }); }

   get_event();

   function update_post(event)
   {
     var toSend = {Id : event.id , CT : event.CT , DGF : event.DGF , Title: event.title , Debut : event.start._d.toISOString(), Fin : event.end._d.toISOString() }
     $http.post('/api/event' , toSend )
     .success(function(data) {
                     console.log(data);
                 })
     .error(function(data) {
     console.log('Error: ' + data);
     });
   }

  $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
  update_post(event)
  };

  $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view ){
  update_post(event)
  };

  $scope.alertEventOnClick = function(event, delta, revertFunc, jsEvent, ui, view)
 {
        $http.post('/api/delete', { Id : event.id } )
            .success(function(data) {
                // $scope.todos = data;
                console.log(data);
                get_event();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
  };

  $scope.defaultView = "agendaWeek"
  $scope.eventSources = []
  $scope.uiConfig = {
     calendar:{
      //  height: 450,
       editable: true,
       firstDay: 1 ,
       nowIndicator : true,
       aspectRatio : 2 ,
       contentHeight : 'auto' ,
       allDaySlot : false ,
       timeFormat:'H:mm', // Month 24 hour timeformat
       axisFormat: 'H:mm', // Week & Day 24 hour timeformat
       defaultView : 'agendaWeek' ,
       dayNamesShort : ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'] ,
       weekNumbers: true,
       nextDayThreshold: '00:00:00',
      //  dayNamesShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'] ,
       header:{
        //  left: 'month basicWeek basicDay agendaWeek agendaDay',
         center: 'prev,intervalweek,next',
         right: 'Copier,Coller'
       },
       timeFormat: {
                // for agendaWeek and agendaDay do not display time in title (time already displayed in the view)
                agenda: '',

                // for all other views (19p)
                '': 'H:mm{ - H:mm}'
            },
       customButtons: {
       intervalweek: {
             text: 'title' ,
             click: function() {
                 alert('clicked the custom button!');
             }
         },
       Copier: {
           text: 'Copier',
           click: function() {
               alert('clicked the custom button!');
           }
       },
       Coller: {
           text: 'Coller',
           click: function() {
               alert('clicked the custom button!');
           }
       }
      },
       eventClick: $scope.alertEventOnClick,
       eventDrop: $scope.alertOnDrop,
       eventResize: $scope.alertOnResize
     }
   };


});
//   $scope.eventSources = [{
//     events: [
//         {
//             title: 'Event1',
//             start: '2017-06-26T12:00:00',
//             end: '2017-06-26T17:00:00'
//         },
//         {
//             title: 'Event2',
//             start: '2017-06-27T14:00:00',
//             end: '2017-06-26T17:00:00'
//         }
//         // etc...
//     ],
//     color: 'rgba(174, 159, 218, 0.7)',   // an option!
//     textColor: 'white', // an option!
//     editable : true // Evenement non éditable
// }, {
//  events: [
//       {
//           title: 'Event2',
//           start: '2017-06-28T10:00:00',
//           end: '2017-06-28T13:00:00'
//       }
//   ],
//   color: 'rgba(124, 168, 245, 0.7)',   // an option!
//   textColor: 'white' // an option!
// }
// ];
