
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//To load event listener
loadEventListener();

//The function defination
function loadEventListener(){

    //To Load DOM
    document.addEventListener('DOMContentLoaded' , getTasks);

    //To add Task
    form.addEventListener('submit', addTask);

    //To remove Task
    taskList.addEventListener('click' , removeTask);

    //To clear task
    clearBtn.addEventListener('click', clearTask);

    //To Filter Task
    filter.addEventListener('keyup' , filterTask);
}


//Add Task
function addTask(e){

    e.preventDefault();

    if(taskInput.value === ''){
        alert('Add a task');
    }else{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = 'Remove';
        link.setAttribute('href' , '#');
        li.appendChild(link);
        taskList.appendChild(li);
        storeToLocal(taskInput.value);
        taskInput.value = '';
    }

}


// Local Storage
function storeToLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


//Get Tasks
function getTasks(e){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = 'Remove';
        link.setAttribute('href', '#');
        li.appendChild(link);
        taskList.appendChild(li);
    });
}


//Remove Task
function removeTask(e){
    if(e.target.classList.contains('delete-item'))
    {
        if(confirm('Are You Sure?'))
        {
            e.target.parentElement.remove();

            removeFromLocal(e.target.parentElement);
        }
    }
}


//Remove from Local storage
function removeFromLocal(taskItem){
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task , index){
        if (taskItem.firstChild.textContent === task)
        {
            tasks.splice(index , 1);
        }
    });

    localStorage.setItem('tasks' , JSON.stringify(tasks));
}



//Clear Task
function clearTask(e){

   if(confirm('Are You Sure?'))
   {
       while (taskList.firstChild) {
           taskList.removeChild(taskList.firstChild);
       }

       clearFromLocal();
   }
}


//Clear from Local
function clearFromLocal(){

    localStorage.clear();

}


//Filter Task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none';
        }
    })
}




