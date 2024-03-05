// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
  ref,
  getDatabase,
  push,
  set,
  onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHZHI821LAYe-PWTPXtsPl_KiBuKniDo8",
    authDomain: "todoapp-firebase-databas-6dd7b.firebaseapp.com",
    databaseURL: "https://todoapp-firebase-databas-6dd7b-default-rtdb.firebaseio.com",
    projectId: "todoapp-firebase-databas-6dd7b",
    storageBucket: "todoapp-firebase-databas-6dd7b.appspot.com",
    messagingSenderId: "371215656614",
    appId: "1:371215656614:web:b3b28f4fbf2d63420b7667"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to add a new item
window.Addbtn = function () {
  // Get the value of the input field
  let input = document.getElementById('input').value;
  // Create an object with input value and assign a unique ID
  let newItem = {
    input: input
  };

 let itemref = push(ref(database ,'Todo app'));

 let itemkey = itemref.key;
 set(ref(database , `Todo app/${itemkey}`), newItem);
 input.value = " ";


}

// Function to retrieve data
window.GetData = function () {
    const todoRef = ref(database, 'Todo app');
    // Reference to the "Todo app" node
    
    // Attach an asynchronous callback to read the data at the "Todo app" reference
    onValue(todoRef, (snapshot) => {
        // Get the data snapshot
        const data = snapshot.val();
        // Select the element where you want to display the data
        const displayElement = document.getElementById('display');

        // Clear previous content
        displayElement.innerHTML = '';

        // Loop through the data and display it
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];

                // Create a new container div for each item
                const itemContainer = document.createElement('div');

                // Display the item's input value
                const itemValue = document.createElement('span');
                itemValue.textContent = item.input;
                itemContainer.appendChild(itemValue);

                // Create a delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.setAttribute('class', 'deletebtn btn btn-danger p-2 pe-4 ps-4 ms-4 me-1 mb-4 mt-4');
                // Add event listener to delete the item from database and UI
                deleteButton.addEventListener('click', function () {
                    // Remove the item from the database
                    remove(ref(database, `Todo app/${key}`));
                    // Remove the item from the UI
                    itemContainer.remove();
                });
                itemContainer.appendChild(deleteButton);

                // Create an edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.setAttribute('class', 'editbtn btn btn-primary p-2 pe-4 ps-4 ms-auto mb-4 mt-4');

                // Add event listener to edit the item
                editButton.addEventListener('click', function () {
                    // Prompt the user to edit the item
                    const newValue = prompt('Enter the new value:');
                    if (newValue !== null && newValue !== '') {
                        // Update the value in the database
                        update(ref(database, `Todo app/${key}`), { input: newValue });
                        // Update the value in the UI
                        itemValue.textContent = newValue;
                    }
                });
                itemContainer.appendChild(editButton);

                // Append the container to the display element
                displayElement.appendChild(itemContainer);
            }
        }
    });
}
GetData()
  
// Function to delete all items
window.DeleteAll = function () {
    // Reference to the "Todo app" node
    const todoRef = ref(database, 'Todo app');

    // Attach an asynchronous callback to read the data at the "Todo app" reference
    onValue(todoRef, (snapshot) => {
        // Get the data snapshot
        const data = snapshot.val();

        // Loop through the data and delete each item from the database
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                // Remove the item from the database
                remove(ref(database, `Todo app/${key}`));
            }
        }

        // Clear the display element
        document.getElementById('display').innerHTML = '';
    });
}
