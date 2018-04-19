// Storage Controller

// Item Controller
const ItemCtrl = (function () {
    // Item constructor (to add item to the state or data structure)
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [
            // {
            //     id: 0,
            //     name: 'Steak Dinner',
            //     calories: 1200
            // },
            // {
            //     id: 1,
            //     name: 'Cookies',
            //     calories: 200
            // },
            // {
            //     id: 2,
            //     name: 'Omelet',
            //     calories: 600
            // }
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    // Add a return to make data accessible
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Generate auto-incremented ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },

        getTotalCalories: function () {
            let total = 0;

            // Loop through items and add calories
            data.items.forEach(function (item) {
                total += item.calories;
            });

            // Set total calories in data structure
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
        },

        logData: function () {
            return data;
        }
    }
})();


// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    // Public methods
    return {
        populateItemList: function (items) {
            let html = '';

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}}">
                <strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit item material-icons blue-grey-text">create</i>
                </a>
            </li>`;
            })

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `
            <strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit item material-icons blue-grey-text">create</i>
            </a>
            `;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        getSelectors: function () {
            return UISelectors;
        }

    }
})();


// App Controller
const App = (function (ItemCtrl, UICtrl) {

    // Load event listeners
    const loadEventListeners = function () {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    }

    // Add item submit
    const itemAddSubmit = function (e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Show total calories in UI
            UICtrl.showTotalCalories(totalCalories);

            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }
    // Public methods
    return {
        init: function () {
            // Fetch items from Data Structure
            const items = ItemCtrl.getItems();

            // Check if any items exist
            if (items.length === 0) {
                // Hide <ul> beneath Total Calories if list is empty
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Show total calories in UI
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

// Initialize  app
App.init();