routerApp.controller('dashboardCntrl', function ($scope, $rootScope, $cookieStore, dashboardService, $state) {

    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    $scope.loader=true;
    $scope.acttype= $scope.acttype= $cookieStore.get("loginAccess").acttype;
    $scope.userId=$cookieStore.get("loginAccess").id;
    var readingBands = [
        { "band": 3, "bands": [6, 7] },
        { "band": 3.5, "bands": [8, 9] },
        { "band": 4, "bands": [10, 12] },
        { "band": 4.5, "bands": [13, 14] },
        { "band": 5, "bands": [15, 16, 17, 18] },
        { "band": 5.5, "bands": [19, 20, 21, 22] },
        { "band": 6, "bands": [23, 24, 25, 26] },
        { "band": 6.5, "bands": [27, 28, 29] },
        { "band": 7, "bands": [30, 31, 32] },
        { "band": 7.5, "bands": [33, 34] },
        { "band": 8, "bands": [35, 36] },
        { "band": 8.5, "bands": [37, 38] },
        { "band": 9, "bands": [39, 40] }
    ];
    var lisBands = [
        { "band": 3, "bands": [5, 8] },
        { "band": 3.5, "bands": [9, 10] },
        { "band": 4, "bands": [11, 12] },
        { "band": 4.5, "bands": [13, 15] },
        { "band": 5, "bands": [16, 17] },
        { "band": 5.5, "bands": [18, 20, 21, 22] },
        { "band": 6, "bands": [23, 24, 25] },
        { "band": 6.5, "bands": [26, 28, 29] },
        { "band": 7, "bands": [30, 31] },
        { "band": 7.5, "bands": [32, 34] },
        { "band": 8, "bands": [35, 36] },
        { "band": 8.5, "bands": [37, 38] },
        { "band": 9, "bands": [39, 40] }
    ];
    $scope.getReadBands = function (type, obj) {

        var valBand = _.filter(obj, function (x) {
            return x.result === type;
        }).length;

        // console.log(valBand);
        var band = 0;
        angular.forEach(readingBands, function (val, key) {
            angular.forEach(val.bands, function (val1, key1) {
                if (val1 === valBand) {
                    band = val.band;
                }
            });
        });
        if (band == 0) {
            return 2.5;
        } else {
            return band;
        }
    }
    $scope.getLisBands = function (type, obj) {
        var valBand = _.filter(obj, function (x) {
            return x.result === type;
        }).length;

        // console.log(valBand);
        var band = 0;
        angular.forEach(lisBands, function (val, key) {
            angular.forEach(val.bands, function (val1, key1) {
                if (val1 === valBand) {
                    band = val.band;
                }
            });
        });
        if (band == 0) {
            return 2.5;
        } else {
            return band;
        }
    }
    $scope.getWritBands = function (valBand) {
        // console.log(valBand, 'enter in bands');
        if (valBand.length) {
            //  var getBands= _.sumBy(['bonds'], _.partial(_.sumBy, valBand));
            var getBands = _.sumBy(['bonds'], function (pro) {
                return _.sumBy(valBand, pro);
            });
            return getBands / 2;

        } else {
            return 0;
        }

        // console.log(getBands);
    }
    $scope.datasetVal = [];
    var colorPick = [
        "#ff4000",
        "#ffbf00",
        "#ffff00",
        "#bfff00",
        "#80ff00",
        "#40ff00",
        "#00ff00",
        "#00ff40",
        "#00ff80",
        "#00ffbf",
        "#00ffff",
        "#00bfff",
        "#0080ff",
        "#0040ff",
        "#0000ff",
        "#4000ff",
        "#8000ff",
        "#bf00ff",
        "#ff00ff",
        "#ff00bf",
        "#ff0080",
        "#ff0040",
        "#ff0000",
        "#f90606",
        "#ec1313",
        "#e61919",
        "#df2020",
        "#d92626",
        "#d22d2d",
        "#cc3333",
        "#c63939",
        "#bf4040",
        "#b94646",
        "#b34d4d",
        "#ac5353",
        "#a65959",
        "#9f6060",
        "#996666",
        "#936c6c",
        "#8c7373",
        "#867979",
        "#808080"
    ]


    $scope.getStrTojson = function (obj, key) {
        var objData = JSON.parse(obj);
        return objData[key];
    }
    dashboardService.dashboardData().then(function (response) {
        $scope.loader=false;
        // console.log(response.data.data);
        $scope.dashboardData = response.data.data;
        $scope.awaScoreData = response.data.data.fullLength;
        // console.log($scope.awaScoreData);
        //    $scope.awaScoreData = angular.fromJson($scope.awaScoreData1);
        var myChartData = [];
        var greLable = [];
        // var myChartData = [];
        // console.log($scope.awaScoreData);
        var totalDataGreScore = $scope.awaScoreData;
        //    delete totalDataGreScore.lineData ; 
        //  



        var getDataGraph = [];
        var writing=0;
        angular.forEach($scope.awaScoreData, function (val, key) {
            // console.log(val, key);
            // console.log(val.graphdata.toatalscore);
            greLable.push(val.title);
            // console.log($scope.getReadBands(true, $scope.getStrTojson( val.result_data ,'reading')) + $scope.getLisBands(true, $scope.getStrTojson( val.result_data ,'listening')) +$scope.getWritBands($scope.getStrTojson( val.result_data ,'writing') ) /3) ;
            var reading = $scope.getReadBands(true, $scope.getStrTojson(val.result_data, 'reading'));
            var listening = $scope.getLisBands(true, $scope.getStrTojson(val.result_data, 'listening'));
            var writing = $scope.getWritBands($scope.getStrTojson(val.result_data, 'writing'));
            // console.log(reading, listening, writing);

            var totalGet = (reading + listening + writing) / 3;
            myChartData.push(Math.round(totalGet));
            getDataGraph.push({
                "reading": reading,
                "listening": listening,
                "writting": writing,
                "testname": val.title
            });

        });

        // console.log(greLable, myChartData);
        var ctx = document.getElementById("myChart1").getContext('2d');
        var myChart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: greLable,
                datasets: [{
                    label: "bands",
                    data: myChartData,
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(149,165,166)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(149,165,166)',
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

                    yAxes: [
                        {
                            ticks: {
                                suggestedMin: 1,
                                max: 9

                            }
                        }]
                }
            }

        });

        var mydata = [];
        // console.log(mydata);
        angular.forEach(getDataGraph, function (val, key) {
            // console.log(val,key) ;
            var mydata = [val.reading, val.listening, val.writting];
            var test = val.testname;
            $scope.datasetVal.push({
                label: test,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(225,0,0,0.4)",
                borderColor: colorPick[key],
                borderCapStyle: 'square',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "black",
                pointBackgroundColor: "white",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "yellow",
                pointHoverBorderColor: "brown",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: mydata,
                spanGaps: true,
            });

        });


        myBarChart.update();

    });
    // $scope.datasetVal=[4,5,6];
    var canvas = document.getElementById("barChart");
    var ctx = canvas.getContext('2d');

    // Global Options:
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 16;

    var data = {
        labels: ["Reading", "Listening", "Writing"],
        datasets: $scope.datasetVal
    };
    // Notice the scaleLabel at the same level as Ticks
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 1,
                    max: 9
                },
                scaleLabel: {
                    display: true,
                    labelString: '',
                    fontSize: 20
                }
            }]
        }
    };
    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });



});
