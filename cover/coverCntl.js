'use strict';


angular.module('routerApp')
    .controller('coverCtrl', function($scope, $cookieStore, $state,fullengService, $window, $http) {

        if ($cookieStore.get('loginAccess') == undefined) {
            $state.go('login');
        }
     
        $scope.gosection = function() {
          
            $state.go('sec3');   
         
            //  var url = $state.href('section1', {parameter: "parameter"});
  
             
            // //  window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
            //  window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
            //  newwindow.document.body.style.background = "#ECF0F5";
           
         }
   
    });