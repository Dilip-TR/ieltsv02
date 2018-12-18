routerApp.controller('breakCntrl', function($scope, $state, $window,$filter, $http, $interval, secService, $timeout, $cookieStore) {
  // alert("enter in");
  if($cookieStore.get('loginAccess') == undefined) {
    $state.go('login');
   }
  $scope.count=10 ;
  $scope.type=$state.params.name ;
  $scope.startInterVel1 = $interval(function(){
  $scope.count-- ;
   //console.log("enter in");
   console.log($scope.count);
   if($scope.count == 0){
       $scope.count=0 ;
       $interval.cancel($scope.startInterVel1) ;
       console.log($state.params.name) ;
      $state.go($state.params.name) ;
   }
 },1000);
//  Click continue button
 $scope.continueTosec=function(){
   $interval.cancel($scope.startInterVel1) ;
  //  $scope.count=1000000 ;
   $state.go($state.params.name) ;
   
 }
});

