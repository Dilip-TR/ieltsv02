'use strict';

angular.module('routerApp').service('test1Service', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {

    // console.log($cookieStore.get("testId"));
this.reading = function() {
    var D = $q.defer()
    $http.get(baseUrl + "uploads/" + $cookieStore.get("testId") + '.json').then(function(data) {
        console.log(data);
        D.resolve(data);
        console.log(data);
    }, function(data) {

        D.resolve(data);
    });
    return D.promise;
       
    }

    this.listening = function(data) {

        var D = $q.defer()
        $http.get(baseUrl + "uploads/" + $cookieStore.get("loginAccess").id + 'test1' + '.json').then(function(data) {
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
    this.writing = function(data) {

        var D = $q.defer()
        $http.get(baseUrl + "uploads/" + $cookieStore.get("loginAccess").id + 'test1' + '.json').then(function(data) {
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


    this.resumeTest = function() {

        var D = $q.defer()
        $http.get(baseUrl + "uploads/" + $cookieStore.get("loginAccess").id + $cookieStore.get("testId") + '.json').then(function(data) {
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
       


    this.saveData = function(data) {

        var D = $q.defer()
        $http.post(baseUrl + "api/Test/save_test_file", data).then(function(data) {
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
    this.resume = function(data) {
        var D = $q.defer()
        $http.post(baseUrl + "api/Test/resume_test", data).then(function(data) {
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