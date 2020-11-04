// storage controller

// item colntroller
const ItemCtrl = (function(){
  // item constructor
  const Item = function(id, name, calories) {
    this.id =id;
    this.name=name;
    this.calories= calories;
  }

  // data structure / state
  const data = {
    items:[
      {id: 0, name: "Curry with Naan", calories: 1600},
      {id: 1, name: "Fish and Chips", calories: 1400},
      {id: 2, name: "Eggs", calories: 300}
    ],
    currentItem: null,
    totalCalories: 0

  }
})();
// ui controller
const UICtrl = (function(){
  
})();
// app controller
const AppCtrl = (function(ItemCtrl, UICtrl){
  
})(ItemCtrl, UICtrl);