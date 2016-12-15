angular.module('mineApp').controller('cargarEstudiantesCtrl',function($scope, $location, $http){

    $scope.estados = [{text:'INSCRITO'}, {text:'ADMITIDO'}, {text:'DOCUMENTOS'}];
    $scope.maestrias =[{text:'MINE'}, {text:'MESI'}, {text:'MISIS'}, {text:'MISO'}];

    $scope.uploadFileToUrl = function(){
        console.log($scope.estado);
        console.log($scope.maestria);
        console.log($scope.myFile);
        var fd = new FormData();
        fd.append('file', $scope.myFile);
        var request = {
            method: 'POST',
            url: '../api/estudiantes/cargue/'+$scope.estado.text +'/'+$scope.maestria.text,
            data: fd,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                console.log("No hubo error");
                console.log(response.data);

            }, function errorCallback(response) {
                console.log("Hubo error");
            });
    };

});