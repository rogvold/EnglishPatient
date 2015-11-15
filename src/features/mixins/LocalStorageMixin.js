/**
 * Created by sabir on 03.10.15.
 */

var LocalStorageMixin = {
    supported: function(){
        return (typeof(Storage) !== "undefined");
    },

    removeItem: function(itemName){
        if (itemName == undefined){
            return;
        }
        localStorage.removeItem(itemName);
    },

    setItem: function(name, value){
        if (name == undefined){
            return;
        }
        if (value == undefined){
            this.removeItem(name);
        }
        localStorage.setItem(name, value);
    },

    getItem: function(name){
        if (name == undefined){
            return undefined;
        }
        return localStorage.getItem(name);
    }

}

module.exports = LocalStorageMixin;