(function(){
    'use strict';
    
    angular
        .module('app')
        .config(AppConfig);
    
    AppConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
    /* @ngInject */
    function AppConfig($urlRouterProvider, $stateProvider){
        
        $stateProvider
        .state('store',{
            url: '/store',
            templateUrl: 'app/modules/store/store.tmpl.html',
            controller: 'StoreController',
            controllerAs: 'store'
        })
        .state('mycart',{
            url: '/cart',
            templateUrl: 'app/modules/cart/cart.tmpl.html',
            controller: 'CartController',
            controllerAs: 'vm'
        })
        
        $urlRouterProvider.otherwise('/store');
    }
    
})();