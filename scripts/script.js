// document.addEventListener('DOMContentLoaded',() => {

    const taskNameInput = document.getElementById('task-input-field');
    const dueDateInput = document.getElementById('task-input-date');
    const priorityInput = document.getElementById('priority-select');
    const addTaskButton = document.querySelector('.add-task-button');
    const taskList = document.getElementById('task-list');


    let tasks = [];

    
    addTaskButton.addEventListener('click',() => {

        const taskName = taskNameInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
    
        console.log('clicked');
        tasks.push({
            taskName , 
            dueDate ,
            priority ,
            completed : false       
        });

        renderTaskList();
    })

function renderTaskList()
{
    let taskListHTML = '';
    tasks.forEach(task => {
        console.log(task);
        // const li = document.createElement('li');
        // li.classList.add('task-item');
        // li.innerHTML 
        const taskHTML = `
            <li class="task-item">
            <span class="task-title">${task.taskName}</span>
            <span class="task-due-date">${task.dueDate}</span>
            <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            </li>
        `
        taskListHTML += taskHTML;
    })

    taskList.innerHTML = taskListHTML;

}



// });

