document.addEventListener('DOMContentLoaded',() => {
    
    const taskNameInput = document.getElementById('task-input-field');
    const dueDateInput = document.getElementById('task-input-date');
    const priorityInput = document.getElementById('priority-select');
    const addTaskButton = document.querySelector('.add-task-button');
    const taskList = document.getElementById('task-list');
    const deleteTaskButton = document.querySelector('.delete-btn');
    
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function renderTaskList()
    {
        let taskListHTML = '';
        tasks.forEach(task => {
            console.log(task);
            // const li = document.createElement('li');
            // li.classList.add('task-item');
            // li.innerHTML 
            const taskHTML = `
                <li class="task-item" data-id="${task.id}">
                <span class="checkbox" ><input type="checkbox" ${task.completed ? 'checked' : ''}></span>
                <span class="task-title${task.completed?'completed':''}">${task.taskName}</span>
                <span class="task-due-date">${task.dueDate}</span>
                <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                </li>
            `
            taskListHTML += taskHTML;
        })
    
        taskList.innerHTML = taskListHTML;
        // console.log(tasks);
    
    }

    function deleteTask(taskId)
    {
        tasks = tasks.filter(task => task.id !== parseInt(taskId));
        localStorage.setItem('tasks',JSON.stringify(tasks));
        renderTaskList();
    }

    function editTask(taskId)
    {
        const index = tasks.findIndex(task => task.id === parseInt(taskId));
        const taskToEdit = tasks[index];

        taskNameInput.value = taskToEdit.taskName;
        dueDateInput.value = taskToEdit.dueDate;
        priorityInput.value = taskToEdit.priority;

        deleteTask(taskId);
    }

    
    addTaskButton.addEventListener('click',() => {

        const taskName = taskNameInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        
        // console.log('clicked');

        if((taskName === '' || dueDate === ''))
            {
                alert('Task-name and Due-date fields are mandatory');
                return;
            }
        else if(Date.parse(dueDate) < Date.now()){

            alert('Trying to sneak in older date you lazy :/');
            return ;

        }

        const newTask = {
            id : Date.now(),
            taskName , 
            dueDate ,
            priority ,
            completed : false       
        }
        tasks.push(newTask);

        taskNameInput.value = '';
        dueDateInput.value = '';
        priority.value = '';

        localStorage.setItem('tasks',JSON.stringify(tasks));
        renderTaskList();

    })

    taskList.addEventListener('click',(e) => {
        // const parentli = e.target.closest('li');
        // const taskid = parentli.getAttribute('data-id');
        const targetli = e.target;
        const taskId = targetli.closest('li').dataset.id;

        if(e.target.classList.contains('delete-btn'))
            {
                deleteTask(taskId);
            }
        else if(e.target.classList.contains('edit-btn'))
            {
                editTask(taskId);    
            }
        else if(e.target.type ==='checkbox')
            {
                console.log('You got in!!!!');
                const task = tasks.find(task => task.id === parseInt(taskId));
                task.completed = e.target.checked;
                localStorage.setItem('tasks',JSON.stringify(tasks));
                renderTaskList();
            }

    })


renderTaskList();

});

