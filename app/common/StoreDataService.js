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
            removeItemFromCart: removeItemFromCart,
            clearCart: clearCart
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
        
        function toNumber(value) {
            value = value * 1;
            return isNaN(value) ? 0 : value;
        }
        
        function addToCart(item, qty){
            var found = false;
            for(var i = 0; i < itemsInCart.length; i++){
                var currentItem = itemsInCart[i];
                if(currentItem.sku == item.sku){
                    found = true;
                    currentItem.quantity = toNumber(currentItem.quantity + qty);
                    if(currentItem.quantity <= 0){
                        itemsInCart.splice(i, 1);
                    }
                }
            }
                
                
            if(!found){
                var cartItem = new Cart(item.name, item.description, item.price, item.sku, qty)
                itemsInCart.push(cartItem);
            }
            
            syncStoreDatabase();
        }
        
        function removeItemFromCart(item){
            for(var i = 0; i < itemsInCart.length; i++){
                var currentItem = itemsInCart[i];
                if(currentItem.sku == item.sku){
                    itemsInCart.splice(i, 1);
                }
            }
            syncStoreDatabase();
        }
        
        function syncStoreDatabase(){
            if(localStorage != null && JSON != null){
                localStorage[cartName] = JSON.stringify(itemsInCart);
            }
        }
        
        function getItemsInCart(){
            itemsInCart.length = 0;
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
        
        function clearCart(){
            itemsInCart.length = 0;
            syncStoreDatabase();
            console.warn("Cleaered cart")
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