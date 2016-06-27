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
        vm.getItemsCount = getItemsCount;
        vm.getTotalPrice = getTotalPrice;
        
        function removeItemFromCart(itemSku, qty){
            StoreDataService.removeItemFromCart(itemSku);
        }
        
        function clearCart(){
            StoreDataService.clearCart();
        }
        
        function getItemsCount(){
            var count = 0;
            var items = vm.cartItems;
            for(var i = 0; i < items.length; i++){
                count += items[i].quantity;
            }
            return count;
        }
        
        function getTotalPrice(){
            var price = 0;
            var items = vm.cartItems;
            for(var i = 0; i < items.length; i++){
                price += (items[i].price * items[i].quantity);
            }
            return price;
        }
    }
    
})()