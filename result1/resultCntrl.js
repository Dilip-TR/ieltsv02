routerApp.controller('result1Cntrl', function ($scope, $state, $window, $filter, resultService, $http, $interval, secService, $timeout, $cookieStore) {
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    $scope.loader=true;
    var readingBands= [
        {"band":3,"bands":[6,7] },
        {"band":3.5,"bands":[8,9] },
        {"band":4,"bands":[10,12] } ,
        {"band":4.5,"bands":[13,14] },
        {"band":5,"bands":[15,16,17,18] },
        {"band":5.5,"bands":[19,20,21,22] },
        {"band":6,"bands":[23,24,25,26] },
        {"band":6.5,"bands":[27,28,29] },
        {"band":7,"bands":[30,31,32] },
        {"band":7.5,"bands":[33,34] },
        {"band":8,"bands":[35,36] },
        {"band":8.5,"bands":[37,38] },
        {"band":9,"bands":[39,40] }
    ] ;
    var lisBands= [
        {"band":3,"bands":[5,8] },
        {"band":3.5,"bands":[9,10] },
        {"band":4,"bands":[11,12] } ,
        {"band":4.5,"bands":[13,15] },
        {"band":5,"bands":[16,17] },
        {"band":5.5,"bands":[18,20,21,22] },
        {"band":6,"bands":[23,24,25] },
        {"band":6.5,"bands":[26,28,29] },
        {"band":7,"bands":[30,31] },
        {"band":7.5,"bands":[32,34] },
        {"band":8,"bands":[35,36] },
        {"band":8.5,"bands":[37,38] },
        {"band":9,"bands":[39,40] }
    ] ;
    $scope.getReadBands=function(valBand){
        var band =0 ;
        angular.forEach(readingBands,function(val,key){
            angular.forEach(val.bands,function(val1,key1){
                if(val1 === valBand){
                    band = val.band  ;
                }
            });
        });
        if(band == 0 ) {
            return 2.5 ;
        }else{
            return band  ;
        }
    }
    $scope.getLisBands=function(valBand){
        var band =0 ;
        angular.forEach(lisBands,function(val,key){
            angular.forEach(val.bands,function(val1,key1){
                if(val1 === valBand){
                    band = val.band  ;
                }
            });
        });
        if(band == 0 ) {
            return 2.5 ;
        }else{
            return band  ;
        }
    }
    $scope.getWritBands=function(valBand){
      //  console.log(valBand , 'enter in bands');

      //  var getBands= _.sumBy(['bonds'], _.partial(_.sumBy, valBand));
      var getBands= _.sumBy(['bonds'], function(pro){
          return _.sumBy(valBand,pro) ;
      });
      return getBands/2 ;
       // console.log(getBands);
    }
    resultService.result().then(function (response) {
        $scope.loader=false;
        $scope.resultData = response.data;
        //$scope.resultData = response.data;
        console.log($scope.resultData.result.reading);
        var countData=function(val,obj){
           return _.filter(obj,function(x){
            return x.result === val ;
           }).length;
        }
         $scope.readingResult={
            "correctAns" : countData(true , $scope.resultData.result.reading) ,
            "wrongAns" : $scope.resultData.result.reading.length - countData(true , $scope.resultData.result.reading) ,
            "total" : $scope.resultData.result.reading.length ,
            "bands" : $scope.getReadBands(countData(true , $scope.resultData.result.reading)) 
         }
         $scope.listenResult={
            "correctAns" : countData(true , $scope.resultData.result.listening) ,
            "wrongAns" : $scope.resultData.result.listening.length - countData(true , $scope.resultData.result.listening) ,
            "total" : $scope.resultData.result.listening.length ,
            "bands" : $scope.getLisBands(countData(true , $scope.resultData.result.listening)) 
         }
         $scope.writingResult={
            "correctAns" : '-' ,
            "wrongAns" :'-' ,
            "total" : 2 ,
            "bands" :  $scope.getWritBands(  $scope.resultData.result.writing) ,
            "status" : $scope.resultData.awastatus
         }
        console.log($scope.readingResult,$scope.listenResult);
        // console.log($scope.resultData.resultData.resultCal.writting.bands);
        // console.log($scope.resultData.resultData.resultCal.reading.bands);
        $scope.readingStuBand=$scope.readingResult.bands ;
        $scope.lesioningStuBand= $scope.listenResult.bands ;
        // $scope.readingStuBand=   $scope.getReadBands($scope.resultData.resultData.resultCal.reading.correct) ;
        // $scope.lesioningStuBand=   $scope.getLisBands($scope.resultData.resultData.resultCal.lesioning.correct) ;
        var myChartData=[ $scope.readingStuBand ,$scope.lesioningStuBand,$scope.writingResult.bands];
        console.log(myChartData);
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Reading", "Listening", "Writing"],
                datasets: [{
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#E31B23",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e",
                        "#34495e",
                        "#34495e"
                    ],
                    data: myChartData
                }]
            }
        });
        angular.forEach($scope.resultData , function(val, key) {
        console.log(val);
        });
        var ctx = document.getElementById("myChart1").getContext('2d');
        var myChart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Reading", "Listening", "Writing"],
                datasets: [{
                    label: 'bands',
                    data: myChartData,
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(227,27,35)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 2,
                            max: 9
                        }
                    }]
                }
            }
        });
     
    });  
    $scope.goback = function () {
        $state.go("dashboard");
    }
    $scope.review1 = function () {
        // alert("enter in");
        $state.go("reviewwriting");
    }
});
