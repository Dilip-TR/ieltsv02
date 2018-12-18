routerApp.controller('listeningCtrl', function($scope, $state, $window,$filter, $http, $interval,listenService, secService, $timeout, $cookieStore) {
    if($cookieStore.get('loginAccess') == undefined) {
      $state.go('login');
    }
    $scope.actpara=0  ;
    $scope.loader=true;
    $scope.btndisable=false;
    $scope.showPlayButton = false ;
    $scope.actqua=0;
    $scope.indexBottom=1
    $scope.getInd=[] ;
    $scope.readingLength=0;
    $scope.testWise='reading' ;
    $scope.showAudio=false ;
    listenService.sec1().then(function(response){
      $scope.loader=false;
      $scope.listeningData=response.data;
      console.log($scope.listeningData.lesioning);
      $scope.showAudio=true ;
      $("#appendAudioPlayer audio").remove() ;
      $("#appendAudioPlayer").append('<audio controls ng-if="listeningData.lesioning[actpara].courrentime != 0" controlsList="nodownload"> <source src="http://18.218.122.78:8080/softprep'+$scope.listeningData.lesioning[$scope.actpara].paragraph+'"   type="audio/ogg"> </audio');
      // start
      console.log($scope.listeningData.lesioning[$scope.actpara].paragraph);
     // wavesurfer.load('http://18.218.122.78:8080/softprep'+$scope.listeningData.lesioning[$scope.actpara].paragraph );
      $scope.readingLength =  $scope.listeningData.lesioning.length;
      console.log(  $scope.readingLength );
      angular.forEach($scope.listeningData.lesioning, function(val, key) {
        console.log(val.questions);
      });
      _.map($scope.listeningData.lesioning,function(x){
        return x.userTime = 0 ;
      });
      _.map($scope.listeningData.lesioning,function(x){
        return x.courrentime = x.time ;
      });
      $scope.listeningData.totalReadingTime= _.sumBy($scope.listeningData.lesioning, function(o) { return o.time; }) ;
      console.log( $scope.listeningData.totalReadingTime);
      $scope.playTime=function(){
          $scope.showPlayButton = false ;
               // alert("enter in") ;
              //Inter for every second
          $scope.startInterVel =$interval(function(){
            //Reading section ;
            if($scope.listeningData.totalReadingTime !=0){
              $scope.listeningData.totalReadingTime-- ;
              if($scope.listeningData.lesioning[$scope.actpara].courrentime !=0){
                $scope.listeningData.lesioning[$scope.actpara].courrentime-- ;
              }else{
                $scope.listeningData.lesioning[$scope.actpara].courrentime =  0 ;
                $("#appendAudioPlayer audio").remove() ;
              }
              $scope.listeningData.lesioning[$scope.actpara].userTime++
              console.log($scope.listeningData.lesioning[$scope.actpara].userTime);
            }else{
              console.log("Your time is up");
              $interval.cancel($scope.startInterVel) ;
              $scope.listeningData.totalReadingTime=0;
              $scope.loadNewParag() ;
            }
            //console.log( $scope.readingdata.reading);
          },1000);
      }
      $scope.playTime() ;
      $timeout(function(){
        $scope.showPlayButton = true ;
      },10000);
      $scope.pause=function(){
        $scope.showPlayButton = true ;
      }
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
      if($scope.listeningData.lesioning[$scope.actpara].courrentime !=0){
        $("#appendAudioPlayer audio").remove() ;
        $("#appendAudioPlayer").append('<audio controls  controlsList="nodownload"> <source src="http://18.218.122.78:8080/ielts'+$scope.listeningData.lesioning[$scope.actpara].paragraph+'"   type="audio/ogg"> </audio');
      }else{
        $("#appendAudioPlayer audio").remove() ;
      }
    }
    $scope.nextQua=function(){
      $scope.actpara=$scope.actpara+1;
      console.log($scope.actpara,$scope.listeningData.lesioning[$scope.actpara].questions);
      if($scope.listeningData.lesioning[$scope.actpara].courrentime){
          $("#appendAudioPlayer audio").remove() ;
          $("#appendAudioPlayer").append('<audio controls  controlsList="nodownload"> <source src="http://18.218.122.78:8080/ielts'+$scope.listeningData.lesioning[$scope.actpara].paragraph+'"   type="audio/ogg"> </audio');
        }else{
          $("#appendAudioPlayer audio").remove() ;
        }
    }
    $scope.loadNewParag=function(){
      $scope.btndisable=true;
      var sendObj = {
            "useId": $cookieStore.get("loginAccess").id,
            "testId": Number($cookieStore.get("testId")),
            "toalObj": $scope.listeningData
          }
       secService.saveData(sendObj).then(function(res) {
        $scope.btndisable=false;
          $state.go('break',{"name":"writing"});
       });
    }
    $scope.exit=function(){
     // alert(5);
      window.close();
    }
    $scope.goToSelect=function(page,event){
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
  // console.log( $scope.listeningData);


});