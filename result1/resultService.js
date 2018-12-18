'use strict';

angular.module('routerApp').service('resultService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {


    this.result = function() {

        var D = $q.defer()
        $http.get(baseUrl+"uploads/" + $cookieStore.get("loginAccess").id + $cookieStore.get("testId") + '.json').then(function(data) {
            D.resolve(data);
            // console.log(data);
        }, function(data) {

            D.resolve(data);
        });
        // )
        //     .error(function(data) {
        //         D.resolve(data);
        //     });
        return D.promise;
    }

    this.resumeTest = function() {

        var D = $q.defer()
        $http.get(baseUrl+"uploads/" + $cookieStore.get("loginAccess").id + $cookieStore.get("testId") + '.json').then(function(data) {
            D.resolve(data);
            console.log(data);
        }, function(data) {

            D.resolve(data);
        });
        // )
        //     .error(function(data) {
        //         D.resolve(data);
        //     });
        return D.promise;
    }




}]);