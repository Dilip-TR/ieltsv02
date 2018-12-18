routerApp.controller('fullengCtrl', function($scope, $http, $interval, $cookieStore, fullengService, $state) {
    // $http.get("section1/data.json")
    console.log($cookieStore.get('loginAccess'));
    if ($cookieStore.get('loginAccess') == undefined) {
         $state.go('login');
    }
    $scope.limit=1;
    $scope.acttype= $cookieStore.get("loginAccess").acttype;
    $scope.userId=$cookieStore.get("loginAccess").id;
    

    $scope.checkIsOpenButton = function(type, obj) {
        console.log(type, obj.is_attend_test);

        if (type == 'new') {
            if (obj.is_attend_test == '') {
                return true;
            } else {
                return false;
            }        
            } else if (type == 'pause') {
            if (obj.is_attend_test.testtype == 'pause') {
                return true;
            } else {
                return false;
            }
        } else if (type == 'save') {
            if (obj.is_attend_test.testtype == 'save') {
                return true;
            } else {
                return false;
            }
        }
    }
  
    $scope.loader=true;
    fullengService.sec().then(function(response) {
        //$scope.post = response.data;
        $scope.post = response.data;
        $scope.loader=false;
        console.log($scope.post);
    });
    $scope.getTestId = function(obj) {
        // $scope.starttime();
        // alert(obj);
        console.log( obj);
        $cookieStore.put("testId", obj);
        console.log( $cookieStore.get("testId", obj));
        // var url = $state.href('cover', { parameter: "parameter" });
        // // window.open(url,"popup", "width=1350,height=800");
        // // window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        // window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        //   newwindow.document.body.style.background = "#ECF0F5";
          $state.go('cover');
    }
    // console($cookieStore.get("loginAccess"));
    $scope.review = function(obj) {
        $cookieStore.put("testId", obj);
        // alert(5);
        console.log("testId", obj);
        $state.go('result1');
    }
    $scope.resume = function(obj) {
        // alert(5);
        $cookieStore.put("testId", obj.testid);
        var url = $state.href('resumetest', { parameter: "parameter" });
        window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        // console.log("testId", obj.testid);
        // $state.go('resumetest');
    }
});