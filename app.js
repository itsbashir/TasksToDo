// define ui variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners

loadEventListeners();


// load all event listeners function created 
function loadEventListeners() {
  // add task event/form
  form.addEventListener('submit', addTask);

  // remove task event 
  taskList.addEventListener('click', removeTask);

  // clear all task btn event 
  clearBtn.addEventListener('click', clearTasks);

  // filter through task list  event 
  filter.addEventListener('keyup', filterTasks)

  // DOM load event listener
  document.addEventListener('DOMContentLoaded', getTasks);
};
// Add task 
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');    
  }; // check for space to be added 


  // creat li element 
  const li = document.createElement('li');
  li.className = 'collection-item';
  // create text node and append 
  li.appendChild(document.createTextNode(taskInput.value)); // we want whatever was passed into the input to be added as text node 

  // creat new link element linkn
  const link = document.createElement('a');
  // Add class 
  link.className = 'delete-item secondary-content'; // 

  // Add icon html 
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li 
  li.appendChild(link); 

  // Append the li to UI 
  console.log(li); // check if the new task work 
  taskList.appendChild(li);

  // store in local storage 
  storeTaskInLocalStorage(taskInput.value); // we want to store the task that was added to the list so we can store it 

  // clear the input 
  taskInput.value = '';
  
  e.preventDefault();
  
};

// store task 
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //convert it back 
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));


  // localStorage.clear();

}

// Get task from local storage

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //convert it back 
  }; // initilisze tasks , check to see if there's anything, if there isnt set to an empty array. if there is set to whats alrady there

  tasks.forEach(function (task) {
    // loop throgh each element and then display it on the dom 
      // creat li element 
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append 
    li.appendChild(document.createTextNode(task)); // we want whatever was passed into the input to be added as text node 

    // creat new link element linkn
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item secondary-content'; // 

    // Add icon html 
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li 
    li.appendChild(link); 

    // Append the li to UI 
    console.log(li); // check if the new task work 
    taskList.appendChild(li);

  })
}

// remove task function   
function removeTask(e) {
  // target to the x font awomse link 
  // look for specific delete item class event 
  if (e.target.parentElement.classList.contains('delete-item')) {
    // confirm for deletion 
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove(); // we want to go back two generations to remove a task
      
      // remove from local storage 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); // you can pass it id or value all we can do is pass the event target
    }
    // console.log(e.target);
  }
};
// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  // check local storage and then check of its null and set it in the viable . then loop through it. with if statement with text content if that match's or equal the current iteration and delete it with index 1 
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //convert it back 
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  // set local storage 
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

// clear tasks function 
// two ways to do it innerHtml or with while loop
function clearTasks(e) {
  // taskList.innerHTML = '';  // remove the whole list with one click of the button 

  // using a while loop
  // first child will get the first child of the task list. while (if) there is a something in the list 
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild); // remove the first child 

  };

  // clear from local storage 
  clearTasksFromLocalStorage();
};

function clearTasksFromLocalStorage() {
  localStorage.clear(); 
}
// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase(); // returns the value of the input type in the filter search 
  
  // take all list items from the DOM 
  document.querySelectorAll('.collection-item').forEach(function (task) {
    // we want the first child text content so we can compate to text filter
    const item = task.firstChild.textContent;
    // check with if statement same as the search value we want the index of what's being searched  and no match will -1. want the task to show 
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block' // it will show 
    } else {
      task.style.display = 'none' // if no match hide  
    }
  }); // reason for query selector is returns a node list 
  // console.log(text); 

}