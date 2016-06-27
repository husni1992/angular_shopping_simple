(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('StoreController', StoreController);
    
    StoreController.$inject = ['StoreDataService'];
    /* @ngInject */
    function StoreController(StoreDataService){
        var vm = this;
        
        vm.addItem = addItem;
        vm.getItemsCount = getItemsCount;
        vm.getTotalPrice = getTotalPrice;
                
        vm.products = StoreDataService.getAllItems();
        vm.itemsInCart = [];
        
        loadItemsFromLocalStorage();
        
        function loadItemsFromLocalStorage(){
            vm.itemsInCart = StoreDataService.getItemsInCart();
        }
        
        function addItem(item){
            StoreDataService.addToCart(item, 1);
        }
        
            function getItemsCount(){
                var count = 0;
                var items = vm.itemsInCart;
                for(var i = 0; i < items.length; i++){
                    count += items[i].quantity;
                }
                return count;
            }
        
         function getTotalPrice(){
            var price = 0;
            var items = vm.itemsInCart;
            for(var i = 0; i < items.length; i++){
                price += (items[i].price * items[i].quantity);
            }
            return price;
        }
        
//        function saveItem(){
//            if(localStorage != null && JSON != null){
//                localStorage[cartName] = JSON.stringify(vm.itemsInCart);
//            }
//        }
        
//        function Cart(name, description, price, sku, quantity){
//            this.name = name;
//            this.description = description;
//            this.price = price;
//            this.sku =sku;
//            this.quantity = quantity; 
//        }
    }
    
})();