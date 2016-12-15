angular.module('mineApp',['ui.router','ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $stateProvider
            .state('app',{
                url:'/',
                views:{
                    'menu' : {
                        templateUrl : 'views/menu.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            .state('app.estudiantes',{
                url:'estudiantes',
                views:{
                    'content@':{
                        templateUrl:'views/estudiante/lista-estudiantes.html',
                        controller:'listaEstudiantesCtrl'
                    }
                }
            })
            .state('app.editarEstudiante',{
                url:'estudiantes/editar/:EstudianteId',
                views:{
                    'content@':{
                        templateUrl:'views/estudiante/detalle-estudiante.html',
                        controller:'editarEstudianteCtrl'
                    }
                }
            })
            .state('app.nuevoEstudiante',{
                url:'estudiantes/nuevo',
                views:{
                    'content@':{
                        templateUrl:'views/estudiante/detalle-estudiante.html',
                        controller:'nuevoEstudianteCtrl'
                    }
                }
            })
            .state('app.cargueEstudiantes',{
                url:'estudiantes/cargue',
                views:{
                    'content@':{
                        templateUrl:'views/estudiante/cargue-estudiantes.html',
                        controller:'cargarEstudiantesCtrl'
                    }
                }
            })
            .state('app.resumenEstudiantes',{
                url:'estudiantes/resumen',
                views:{
                    'content@':{
                        templateUrl:'views/estudiante/resumen-estudiantes.html',
                        controller:'resumenEstudiantesCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    });