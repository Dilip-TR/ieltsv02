'use strict';

angular.module('routerApp').service('dashboardService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {


    // http://localhost/services/softprep/api/PractCategory/dashbord/51
    this.dashboardData = function() {
        var D = $q.defer()
        $http.get(baseUrl+"api/Test/dashbord/" + $cookieStore.get("loginAccess").id).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);