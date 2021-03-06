// storage controller
const StorageCtrl = (function(){
  //public methods
  return{
    storeItem: function(item){
      let items ;
      // check if any items in local storage
      if(localStorage.getItem("items")=== null){
        items=[];
        // push new i tem
        items.push(item);
        // set ls
        localStorage.setItem("items", JSON.stringify(items))
      } else {
        // get what is already in ls
        items = JSON.parse(localStorage.getItem("items"));
        // push new item
        items.push(item);
        // re set ls
        localStorage.setItem("items", JSON.stringify(items))
      }
    },
    getItemsFromStorage:function(){
      let items;
      if(localStorage.getItem("items")=== null){
        items=[];


      }else {
        items = JSON.parse(localStorage.getItem("items"));

      }
      return items;

    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach(function(item, index){
        if(updatedItem.id=== item.id){
          items.splice(index,1,updatedItem);
        }

      });
      // re set ls
      localStorage.setItem("items", JSON.stringify(items))
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach(function(item, index){
        if(id=== item.id){
          items.splice(index,1);
        }

      });
      // re set ls
      localStorage.setItem("items", JSON.stringify(items))
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem("items");
    }

  }
})();

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
   //items:[
      //{id: 0, name: "Curry with Naan", calories: 1600},
      //{id: 1, name: "Fish and Chips", calories: 1400},
      //{id: 2, name: "Eggs", calories: 300}
   //],
    items: StorageCtrl.getItemsFromStorage(),
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
    getItemById: function(id){
      let found= null;
      // loop through items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item
        }
      })
      return found;
    },
    updateItem: function(name, calories){
      // calories to num
      calories = parseInt(calories);
      let found = null;
      // loop through data to see where it matches(id) update the information
      data.items.forEach(function(item){
        if(item.id=== data.currentItem.id){
          item.name= name;
          item.calories = calories;
          found = item;
          
        }
        
      })
      return found;

    },
    clearAllItems: function(){
      data.items=[];
    },
    deleteItem: function(id){
      // get ids
       const ids = data.items.map(function(item){
        return item.id;
      })
      // get index
      const index = ids.indexOf(id);
      // remove item
      data.items.splice(index,1);

    },
    setCurrentItem: function(item){
      data.currentItem = item;

    },
    getCurrentItem: function(){
      return data.currentItem
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
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
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
      <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      
      `;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },
    //updatelist item
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute("id");
        if(itemID=== `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`
        }

      })

    },
    // delete list item
    deleteListItem: function(id){
      const itemId= `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();

    },
    // clear input fields
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value="";
      document.querySelector(UISelectors.itemCalorieInput).value="";
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value=ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalorieInput).value=ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = "none";
    }, 
    removeItems: function(){
      let listItems= document.querySelectorAll(UISelectors.listItems);
      // turn node list into array
      listItems=Array.from(listItems);
      listItems.forEach(function(item){
        item.remove();
      })
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent= totalCalories;

    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function() {
      
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    // return a function which makes the ui selectors available for other to use
    getSelectors: function(){
      return UISelectors;
      
    }
  }
  
})();
// app controller
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl){
  //load event listeners
  const loadEventListners = function(){
    // get selectors from above
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit)
    // disable submit on enter
    document.addEventListener("keypress", function(e){
      if(e.keyCode=== 13|| e.which===13){
        e.preventDefault();
        return false;
      }
    })
    // edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);
    // update item event
    document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);
    // delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);
    // back button event
    document.querySelector(UISelectors.backBtn).addEventListener("click", UICtrl.clearEditState);
    // clear all event
    document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItemsClick);

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
      // store in local storage
      StorageCtrl.storeItem(newItem);
      // clear fields
      UICtrl.clearInput();
    }
    e.preventDefault()
  }
  // edit item
   const itemEditClick = function(e){
    if(e.target.classList.contains("edit-item")){
      // get list item id
      const listId= e.target.parentNode.parentNode.id;
      // break into an array
      const listIdArr = listId.split("-");
      // get the actual id
      const id= parseInt(listIdArr[1]);
      // get item
      const itemToEdit= ItemCtrl.getItemById(id);
      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // addItem to form
      UICtrl.addItemToForm()
    }else{

    }
    e.preventDefault();


   }
   // update item submit
   const itemUpdateSubmit = function(e){
    // get item inout
    const input= UICtrl.getItemInput();
    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    UICtrl.updateListItem(updatedItem);
    
    // get total calories
    const totalCalories=ItemCtrl.getTotalCalories();
    // add total calories to ui
    UICtrl.showTotalCalories(totalCalories);
    // update ls 
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();

    e.preventDefault();
   }

   // delete button event
   const itemDeleteSubmit = function(e){
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();
    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id);
    // delete from ui
    UICtrl.deleteListItem(currentItem.id);
     // get total calories
     const totalCalories=ItemCtrl.getTotalCalories();
     // add total calories to ui
     UICtrl.showTotalCalories(totalCalories);
     // delete from ls
     StorageCtrl.deleteItemFromStorage(currentItem.id);
     UICtrl.clearEditState();
 

    e.preventDefault();
     }
     // clear items event
     const clearAllItemsClick= function(e){
       // delete all items from data stuctre
       ItemCtrl.clearAllItems();
       
        // get total calories
     const totalCalories=ItemCtrl.getTotalCalories();
     // add total calories to ui
     UICtrl.showTotalCalories(totalCalories);
     // remove from ui
     UICtrl.removeItems();
     // clear from local storage
     StorageCtrl.clearItemsFromStorage();
     // hide ul
     UICtrl.hideList();
     }
   
  // public methods
  return {
    init: function(){
      // set initial state
      UICtrl.clearEditState();

      
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
})(ItemCtrl, StorageCtrl, UICtrl);

AppCtrl.init()