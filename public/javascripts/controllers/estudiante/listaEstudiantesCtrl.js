angular.module('mineApp').controller('listaEstudiantesCtrl',function($http,$scope, $location, $filter){

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.searchResults = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.erroresCargue = [];
    $scope.numberOfPages = function() {
        var result = Math.ceil($scope.filteredResults.length / $scope.pageSize);
        var max = (result == 0) ? 1 : result;
        $scope.pageRange = [];
        for (var ctr = 0; ctr < max; ctr++) {
            $scope.pageRange.push(ctr);
        }
        return max;
    };

    $scope.get = function(){
        $http({method: 'GET', url: '../api/estudiantes'})
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.filteredResults = response.data;
                $scope.currentPage = 0;
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.previous = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.next = function() {
        if ($scope.currentPage < ($scope.numberOfPages() - 1)) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };
    $scope.first = function(){
        $scope.currentPage =0;
    };
    $scope.last = function(){
        $scope.currentPage = $scope.numberOfPages()-1;
    };

    $scope.get();
});
