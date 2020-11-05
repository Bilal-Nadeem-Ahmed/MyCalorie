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
      //{id: 0, name: "Curry with Naan", calories: 1600},
      //{id: 1, name: "Fish and Chips", calories: 1400},
      //{id: 2, name: "Eggs", calories: 300}
    ],
    currentItem: null,
    totalCalories: 0

  }
  // public methods
    
  return{
    
      getItems : function(){
        return data.items;
      },
    addItem : function(name, calories){
      let ID;
      // create id
      if(data.items.length>0){
        ID = data.items[data.items.length-1].id+1;
      } else {
        ID=0
      }
      // calories to number
      calories= parseInt(calories);
      // create new item
      newItem = new Item(ID,name,calories);

      // push new items to array
      data.items.push(newItem);

      return newItem
    },  
    getTotalCalories: function(){
      let total=0;
      // loop through items and add cal
      data.items.forEach(function(item){
        total+= item.calories;
      })
      // set total cal here
      data.totalCalories = total
      // return total
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }
})();
// ui controller
const UICtrl = (function(){
  const UISelectors={
    itemList: '#item-list',
    addBtn: ".add-btn",
    itemNameInput:"#item-name",
    itemCalorieInput:"#item-calories",
    totalCalories:".total-calories"
  }
  // return public methods
  return {
    populateItemsList: function(items){
      let html ='';

      items.forEach(item => {
        html+= `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`
        
      });
      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML= html;
    },
    getItemInput: function(){
      return {
        name:document.querySelector(UISelectors.itemNameInput).value,
        calories:document.querySelector(UISelectors.itemCalorieInput).value,
      }
    },
    addListItem: function(item){
      //show list
      document.querySelector(UISelectors.itemList).style.display = "block";
      //create li element
      const li = document.createElement("li");
      // add class
      li.classList="collection-item";
      li.id = `item-${item.id}`;
      // add html
      li.innerHTML = `
      <strong>item.name:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      
      `;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },
    // clear input fields
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value="";
      document.querySelector(UISelectors.itemCalorieInput).value="";
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = "none";
    }, 
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent= totalCalories;

    },
    // return a function which makes the ui selectors available for other to use
    getSelectors: function(){
      return UISelectors;
      
    }
  }
  
})();
// app controller
const AppCtrl = (function(ItemCtrl, UICtrl){
  //load event listeners
  const loadEventListners = function(){
    // get selectors from above
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit)

  }
  // Add item submit
  const itemAddSubmit = function(e){
    // get form input from ui controller

    const input= UICtrl.getItemInput();
    // checkfor input inn to fields
    if(input.name !== "" && input.calories!=="") {
      // add item
      const newItem =ItemCtrl.addItem(input.name, input.calories)
      // add item to ui list
      UICtrl.addListItem(newItem);
      // get total calories
      const totalCalories=ItemCtrl.getTotalCalories();
      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);
      // clear fields
      UICtrl.clearInput();
    }
    e.preventDefault()
  }
  // public methods
  return {
    init: function(){
      
      const items = ItemCtrl.getItems();
      // check if there are items
      if(items.length===0){
        UICtrl.hideList()

      } else {
        // populare list with items
      UICtrl.populateItemsList(items);
      }

      // get total calories
      const totalCalories=ItemCtrl.getTotalCalories();
      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);
      

      // load event listeners
      loadEventListners();
    }
  }
})(ItemCtrl, UICtrl);

AppCtrl.init()