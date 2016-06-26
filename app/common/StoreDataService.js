(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('StoreDataService', StoreDataService);
    
    StoreDataService.$inject = [];
    /* @ngInject */
    function StoreDataService(){
        var service = {
            getAllItems: getAllProducts,
            getItemsInCart: getItemsInCart,
            addToCart: addToCart,
            removeItemFromCart: removeItemFromCart
        };
        
        var itemsInCart = [];
        var cartName = "angular_cart";        

        function getAllProducts(){
            return [
                new product("APL", "Apple", "Eat one every day to keep the doctor away!", 12),
                new product("AVC", "Avocado", "Guacamole anyone?", 16),
                new product("BAN", "Banana", "These are rich in Potassium and easy to peel.", 4),
                new product("CTP", "Cantaloupe", "Delicious and refreshing.", 3),
                new product("FIG", "Fig", "OK, not that nutritious, but sooo good!", 10),
                new product("GRF", "Grapefruit", "Pink or red, always healthy and delicious.", 11),
                new product("GRP", "Grape", "Wine is great, but grapes are even better.", 8),
                new product("GUA", "Guava", "Exotic, fragrant, tasty!", 8)
            ]
        };
        
        function addToCart(item){
            var cartItem = new Cart(item.name, item.description, item.price, item.sku, 1)
            itemsInCart.push(cartItem);
            
            syncStoreDatabase();
        }
        
        function syncStoreDatabase(){
            if(localStorage != null && JSON != null){
                localStorage[cartName] = JSON.stringify(itemsInCart);
            }
        }
        
        function getItemsInCart(){
            var items = localStorage != null ? localStorage[cartName] : null;
            if(items != null && JSON != null){
                var convertedItems = JSON.parse(items);
                try{
                    for(var i = 0; i < convertedItems.length; i++){
                        itemsInCart.push(convertedItems[i]);
                    }
                }catch(err){
                    console.warn(err);
                }
            }
            return itemsInCart;
        }
        
        function removeItemFromCart(itemSku){
            var removeItemName = "";
            for(var i = 0; i < itemsInCart.length; i++){
                if(itemsInCart[i].sku == itemSku){
                    removeItemName = itemsInCart[i].name;
                    itemsInCart.splice(1,i);
                }
            }
            syncStoreDatabase();
            console.info('Removed: '+removeItemName);
        }
        
        
        function product(sku, name, description, price){
            this.name = name;
            this.description = description;
            this.price = price;
            this.sku = sku;
        }
        
        function Cart(name, description, price, sku, quantity){
            this.name = name;
            this.description = description;
            this.price = price;
            this.sku =sku;
            this.quantity = quantity; 
        }
        
        return service;
    }
    
})();