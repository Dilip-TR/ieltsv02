var routerApp = angular.module('routerApp', ['ui.router', 'ngCookies', 'ngSanitize', 'toaster','ngDragDrop','dragularModule']);
var mode = "live" ;
var baseUrl ="" ;
if(mode == 'test'){
    //Local test
    baseUrl ="http://localhost/ieltsservices/ielts/" ;
    
} else{
    //Live    
    baseUrl ="http://18.218.122.78:8080/ielts/" ;
}

routerApp.directive('bindUnsafeHtml', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
            // watch the 'bindUnsafeHtml' expression for changes
            return scope.$eval(attrs.bindUnsafeHtml);
          },
          function(value) {
            // when the 'bindUnsafeHtml' expression changes
            // assign it into the current DOM
            element.html(value);
 
            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
          }
      );
  };
 }]);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardCntrl'
    })
    $stateProvider.state('header', {
        url: '/header',
        templateUrl: 'header.html',
        controller: 'headerCtrl'
    })
    $stateProvider.state('sider', {
            url: '/sider',
            templateUrl: 'sidebar.html',
            controller: 'sidebarCntrl'
        })
        .state('lessons', {
            url: '/lessons',
            templateUrl: 'lessons/lessons.html'

        })
    .state('reasoning', {
            url: '/reasoning',
            templateUrl: 'videos/reasoning/reasoning.html'
                // controller: 'reasngCntrl'
        })
        .state('fulllength', {
            url: '/fulllength',
            templateUrl: 'full length test/fulllength.html',
            controller: 'fullengCtrl'
        })
        .state('cover', {
            url: '/cover',
            templateUrl: 'cover/cover.html',
            controller: 'coverCtrl'
        })
        .state('section1', {
            url: '/section1',
            templateUrl: 'section1/section1.html',
            controller: 'customersCtrl'

        })
        .state('listening', {
            url: '/listening',
            templateUrl: 'listening/listening.html',
            controller: 'listeningCtrl'

        })
        .state('writing', {
            url: '/writing',
            templateUrl: 'writing/writing.html',
            controller: 'writingCtrl'

        })
       
      
        .state('videos', {
            url: '/videos',
            templateUrl: 'videos/video.html',
            controller: 'videoCntrl'
        })
        .state('videoques', {
            url: '/videoques/:id',
            templateUrl: 'videos/videoques.html',
            controller: 'videoqueCntrl'
        })
         .state('videoview', {
            url: '/videoview/:catid?:subcatid',
            templateUrl: 'videos/videoview.html',
            controller: 'videoviewCntrl'
         })
         .state('videoviewans', {
            url: '/videoviewans/:catid?:subcatid?:queid',
            templateUrl: 'videos/videoviewans.html',
            controller: 'videoviewansCntrl' 
          
         })
         .state('videoexam', {
            url: '/videoexam/:id?:testid?:videoid',
            templateUrl: 'videos/videoexam.html',
            controller: 'videoexamsCntrl'
         })
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        })
         .state('logout', {
            url: '/logout',
            templateUrl: 'logout/logout.html',
            controller: 'logoutCtrl'
        })
        
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup/signup.html',
            controller: 'signupCtrl'
        })
        .state('break', {
            url: '/break/:name',
            templateUrl: 'break/break.html',
            controller: 'breakCntrl'
        })
        .state('result1', {
            url: '/result1',
            templateUrl: 'result1/result1.html',
            controller: 'result1Cntrl'
        })
        .state('reviewresult1', {
            url: '/reviewresult1',
            templateUrl: 'reviewresult1/reviewresult1.html',
            controller: 'reviewresult1Cntrl'
        })
         
        .state('feedback', {
            url: '/feedback',
            templateUrl: 'feedback/feedback.html',
            controller: 'feedbackCntrl'

        })
         .state('reviewreading', {
            url: '/reviewreading',
            templateUrl: 'reviewreading/reviewreading.html',
            controller: 'reviewreadingCtrl'

        })
        .state('radio', {
            url: '/radio',
            templateUrl: 'radio/radio.html',
            controller: 'radioCntrl'

        })
        .state('sec1', {
            url: '/sec1',
            templateUrl: 'test1/sec1.html',
            controller: 'sec1Cntrl'
         })
         .state('sec2', {
            url: '/sec2',
            templateUrl: 'test1/sec2.html',
            controller: 'sec2Cntrl'
         })
         .state('sec3', {
            url: '/sec3',
            templateUrl: 'test1/sec3.html',
            controller: 'sec3Cntrl'
         })
         .state('sec4', {
            url: '/sec4',
            templateUrl: 'test1/sec4.html',
            controller: 'sec4Cntrl'
         })
         .state('sec5', {
            url: '/sec5',
            templateUrl: 'test1/sec5.html',
            controller: 'sec5Cntrl'
         })
         .state('test1listening', {
            url: '/test1listening',
            templateUrl: 'test1/listening.html',
            controller: 'listeningCntrl'
         })
        .state('reviewlistening', {
            url: '/reviewlistening',
            templateUrl: 'reviewlistening/reviewlistening.html',
            controller: 'reviewlisteningCtrl'

        })
        .state('reviewwriting', {
            url: '/reviewwriting',
            templateUrl: 'reviewwriting/reviewwriting.html',
            controller: 'reviewwritingCtrl'

        })


});
routerApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
 });

routerApp.filter('secondsToDateTime', [function() {
    /**
     * This code returns a date string formatted manually.
     * Code "new Date(1970, 0, 1).setSeconds(seconds)" returns malformed output on days.
     * Eg. 4 days, magically becomes 5, 15 becomes 16 and so on...;
     * */
    return function(seconds) {
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var mins = Math.floor(((seconds % 86400) % 3600) / 60);
        var secs = ((seconds % 86400) % 3600) % 60;
        return ('00' + mins).slice(-2) + ':' + ('00' + secs).slice(-2);
    };
}]);
routerApp.filter('secondsToTime', function() {

    function padTime(t) {
        return t < 10 ? "0"+t : t;
    }

    return function(_seconds) {
        if (typeof _seconds !== "number" || _seconds < 0)
            return "00:00:00";
        var hours = Math.floor(_seconds / 3600),
            minutes = Math.floor((_seconds % 3600) / 60),
            seconds = Math.floor(_seconds % 60);
        return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
    };
});
routerApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
    routerApp.directive('draggable', function() {
  return function(scope, element, attrs) {
    // Get the native element
    var el = element[0];
    el.draggable = true; // Make dragable

    // Add event listeners
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('item_id', this.id);
        e.dataTransfer.setData('origin_id', el.parentElement.id);
        this.classList.add('dragging');
        return false;
      }, false
    );

    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('dragging');
        return false;
      },
      false
    );
  }
});

routerApp.directive('droppable', function() {
  return function(scope, element, attrs) {
    // Get the native element
    var el = element[0];

    // Add event listeners
    el.addEventListener(
      'dragover',
      function(e) {
        e.preventDefault(); // Allow the drop

        // Set effects
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('dragover');
        return false;
      }, false
    );

    el.addEventListener(
      'dragenter',
      function(e) {
        this.classList.add('dragover');
        return false;
      }, false
    );

    el.addEventListener(
      'dragleave',
      function(e) {
        this.classList.remove('dragover');
        return false;
      }, false
    );

    el.addEventListener(
      'drop',
      function(e) {
        this.classList.remove('dragover');

        // Get the data
        var destination = this.id;
        var item_to_move = e.dataTransfer.getData('item_id');
        var origin = e.dataTransfer.getData('origin_id');

        // Call the scope move function
        scope.MoveItem(origin, destination, item_to_move);

        return false;
      }, false
    );
  }
});

routerApp.controller('logoutCtrl', function($scope, loginService, $state, $rootScope, $cookieStore,$cookies) {
  
   $cookieStore.remove('loginAccess');
    //$cookieStore.put('loginAccess',undefined);
    console.log($cookieStore.get('loginAccess'));
   $state.go('login');
});
routerApp.controller('headerCtrl', function($scope, loginService, $state, $rootScope, $cookieStore) {
    // alert("enter in");
    // console.log("enter in");
    
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
      }
    $scope.email = $cookieStore.get("loginAccess").email;
    $scope.fullname = $cookieStore.get("loginAccess").fullname;

});
routerApp.controller('sidebarCntrl', function($scope, loginService, $state, $rootScope, $cookieStore) {
    // alert("enter in");
    // console.log("enter in");
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
      }
    $scope.fullname = $cookieStore.get("loginAccess").fullname;
});
