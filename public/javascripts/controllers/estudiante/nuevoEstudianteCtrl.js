angular.module('mineApp').controller('nuevoEstudianteCtrl',function($scope, $location, $http){
    $scope.estados = [{text:'INSCRITO'}, {text:'ADMITIDO'}, {text:'DOCUMENTOS'}];
    $scope.maestrias =[{text:'MINE'}, {text:'MESI'}, {text:'MISIS'}, {text:'MISO'}];
    $scope.materias =[
        {
            codigo:'',
            nombre:'Ciencia de datos aplicada'
        },
        {
            codigo:'',
            nombre:'Analisis de Big Data'
        }
    ];
    $scope.save = function(){
        $scope.estudiante.estado = $scope.estudiante.estado.text;
        $scope.estudiante.maestria = $scope.estudiante.maestria.text;
        $scope.estudiante.nombresApellidos = $scope.nombres + " " + $scope.apellidos;
        $http.post('../api/estudiantes',$scope.estudiante)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });

    };
});