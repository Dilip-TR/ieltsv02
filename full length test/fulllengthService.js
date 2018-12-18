'use strict';

angular.module('routerApp').service('fullengService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {



    this.sec = function() {
        var D = $q.defer()
        // http://localhost/ieltsservices/ielts/api/pragoption/list_fullength_tests
        $http.get(baseUrl+"api/Pragoption/list_fullength_tests/" + $cookieStore.get("loginAccess").id).then(function(data) {
            D.resolve(data);
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