(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('CartController', CartController);
    
    CartController.$inject = ['StoreDataService'];
    /* @ngInject */
    function CartController(StoreDataService){
        var vm = this;
        
        vm.cartItems = StoreDataService.getItemsInCart();
        vm.removeItemFromCart = removeItemFromCart;
        vm.clearCart = clearCart;
        
        function removeItemFromCart(itemSku){
            StoreDataService.removeItemFromCart(itemSku);
        }
        
        function clearCart(){
            StoreDataService.clearCart();
        }
    }
    
})()