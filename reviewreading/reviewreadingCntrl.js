routerApp.controller('reviewreadingCtrl', function ($scope, $state, $window, $filter, $http, $interval, $timeout, $cookieStore, reviewreadingService) {
  if ($cookieStore.get('loginAccess') == undefined) {
    $state.go('login');
  }
  $scope.loader=true;
  $scope.isvisable = true;
  $scope.actpara = 0;
  $scope.actqua = 0;
  $scope.indexBottom = 1;
  $scope.getInd = [];
  $scope.readingLength = 0;
  $scope.testWise = 'reading';
  $scope.isvisable=true;
  reviewreadingService.reviewTest().then(function (response) {
    $scope.loader=false;
    $scope.readingdata = response.data;
    $scope.readingLength = $scope.readingdata.reading.length;
    console.log($scope.readingdata.reading);
    angular.forEach($scope.readingdata.reading, function (val, key) {
      console.log(val.questions);
    });
       //Add user time key
    _.map($scope.readingdata.reading, function (x) {
      //console.log(x);
      return x.userTime = 0;
    });
    $scope.readingdata.totalReadingTime = _.sumBy($scope.readingdata.reading, function (o) { return o.time; });
    //Get result quetion
    $scope.getIsCorrectResult=function(objectData,userAns){
      //options.is_answer,options.
      var getFindInd=_.findIndex(objectData,function(x){
        return x === userAns; 
      });
      console.log(getFindInd) ;
      if(getFindInd !=-1){
        return true ;
      }else{
        return false ;
      }
    }
    $timeout(function () {
      $('.liCount').each(function (i) {
        //console.log() ;
        var id = i++ + 1;
        $(this).html(id);
        $(this).attr("data", id);
      });
      $('.liReview').each(function (i) {
        //console.log() ;
        var id = i++ + 1;
        $(this).find('.addIndex').html(id);
      });
      $scope.locate=function(){
        $('input').each(function(i){
          console.log(this);
          var splitVar= $(this).attr('class').split(" ");
          var splitNumber = splitVar[1].split("_");
          console.log(splitNumber[1]);
          $( "<span style='cursor:pointer' class='leftQua leftGet_"+splitNumber[1]+"' ><span class='glyphicon glyphicon-map-marker'> &nbsp; </span></span>" ).insertBefore('.'+splitVar[1]);
        });
        $('.leftQua').on("click",function(){
          // alert("enter in") ;
         var splitVar= $(this).attr('class').split(" ");
         var splitNumber = splitVar[1].split("_");
         console.log(splitNumber[1]) ;
         //alert('.review_'+splitNumber[1]) ;
         var $container = $(".get_first_scrollbar");
         var $scrollTo =  $('.review_'+splitNumber[1]);
         $container.animate({ scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0 }, 300);
         $('.review_'+splitNumber[1]).fadeOut( "slow" );
         $('.review_'+splitNumber[1]).fadeIn( "slow" );
         $('.review_'+splitNumber[1]).fadeOut( "slow" );
         $('.review_'+splitNumber[1]).fadeIn( "slow" );
        })

      }
      $scope.locate();
     
     
    }, 500);
    console.log($scope.readingLength);
  });
  $scope.prevQua = function () {
   $scope.actpara = $scope.actpara - 1;
   $timeout(function(){
    console.log("Action start");
    $scope.locate();
  },400);
  }
  $scope.nextQua = function () {
    $scope.actpara = $scope.actpara + 1;
    $timeout(function(){
      console.log("Action start");
      $scope.locate();
         
     
    },400);
   
    console.log($scope.actpara, $scope.readingdata.reading[$scope.actpara].questions);
  }
  $scope.loadNewParag = function () {
  
    $state.go('reviewlistening');
  }
  $scope.exit = function () {
    // alert(5);
   $state.go("fulllength");
  }
  $scope.goToSelect = function (page, event) {
    //alert(page, event);
    //alert(event.target.attributes.data.value);
    $timeout(function(){
      console.log("Action start");
      $scope.locate();
    },400);
    var inp = event.target.attributes.data.value;
    $scope.actpara = page;
    $timeout(function () {
      $('.num_' + inp).focus();
      var $container = $("html,body");
      var $scrollTo = $('.num_' + inp);
      $container.animate({ scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0 }, 300);

    }, 300);


  }


});
