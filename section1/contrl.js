routerApp.controller('customersCtrl', function($scope, $state, $window,$filter, $http, $interval, secService, $timeout, $cookieStore) {
  if ($cookieStore.get('loginAccess') == undefined) {
    $state.go('login');
}
// alert("enter in");
    $scope.loader=true;
    $scope.btndisable=false;
    $scope.actpara=0  ;
    $scope.actqua=0;
    $scope.indexBottom=1
    $scope.getInd=[] ;
    $scope.readingLength=0;
    $scope.testWise='reading' ;  
    secService.sec().then(function(response){
      $scope.loader=false;
      $scope.readingdata=response.data;
      $scope.readingLength =  $scope.readingdata.reading.length;
      console.log($scope.readingdata.reading);
      angular.forEach($scope.readingdata.reading, function(val, key) {
        console.log(val.questions);
      });
       //Add user time key
       _.map($scope.readingdata.reading,function(x){
        //  console.log(x);
        return x.userTime = 0 ; 
      });
      $scope.readingdata.totalReadingTime= _.sumBy($scope.readingdata.reading, function(o) { return o.time; }) ;
      console.log( $scope.readingdata.totalReadingTime);

      //Inter for every second 
   $scope.startInterVel =   $interval(function(){
        //Reading section ;
        if($scope.readingdata.totalReadingTime !=0){
           $scope.readingdata.totalReadingTime-- ;
           $scope.readingdata.reading[$scope.actpara].userTime++
           console.log($scope.readingdata.reading[$scope.actpara].userTime);
        }else{
           console.log("Your time is up"); 
           $interval.cancel($scope.startInterVel) ;
           
           $scope.loadNewParag() ;
        }
        //console.log( $scope.readingdata.reading);
      },1000)
      $timeout(function(){
          $('.liCount').each(function(i){
            //console.log() ;
            var id=i++ +1 ;
            $(this).html(id) ;
            $(this).attr("data",id);
          });
          $('.liReview').each(function(i){
            //console.log() ;
            var id=i++ +1 ;
            $(this).find('.addIndex').html(id) ;
            
          });
          

       },500);
      console.log($scope.readingLength);
    });
    $scope.prevQua=function(){
      $scope.actpara=$scope.actpara-1;
    }
    $scope.nextQua=function(){
     $scope.actpara=$scope.actpara+1;
     console.log($scope.actpara,$scope.readingdata.reading[$scope.actpara].questions);
    }
    $scope.loadNewParag=function(){
      $scope.btndisable=true;
      var sendObj = {
            "useId": $cookieStore.get("loginAccess").id,
            "testId": Number($cookieStore.get("testId")),
            "toalObj": $scope.readingdata
          }
       secService.saveData(sendObj).then(function(res) {
        $scope.btndisable=false;
        $state.go('break',{"name":"listening"});
       });
    }
    $scope.exit=function(){
     // alert(5);
      window.close();
    }

    $scope.goToSelect=function(page,event){
      //alert(page);
    //  alert(event.target.attributes.data.value);
      var inp=event.target.attributes.data.value ;
      $scope.actpara=page;
      $timeout(function(){
        $('.num_'+inp).focus();
      var $container = $("html,body");
      var $scrollTo = $('.num_'+inp);
      $container.animate({scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300);
    
      },300);
      
      
    }

  // findans
  console.log( $scope.readingdata);
   
    
});
