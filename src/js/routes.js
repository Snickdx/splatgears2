angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.gearList', {
    url: '/list',
    views: {
      'side-menu21': {
        templateUrl: 'templates/gearList.html',
        controller: 'gearListCtrl'
      }
    }
  })

  .state('menu.kitOptimizer', {
    url: '/optimizer',
    views: {
      'side-menu21': {
        templateUrl: 'templates/kitOptimizer.html',
        controller: 'kitOptimizerCtrl'
      }
    }
  })

  .state('menu.brands', {
    url: '/brands',
    views: {
      'side-menu21': {
        templateUrl: 'templates/brands.html',
        controller: 'brandsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('filters', {
    url: '/filters',
    templateUrl: 'templates/filters.html',
    controller: 'filtersCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/list')


});