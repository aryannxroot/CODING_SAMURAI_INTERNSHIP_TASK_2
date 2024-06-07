document.addEventListener('DOMContentLoaded',() => {
    
    const taskNameInput = document.getElementById('task-input-field');
    const dueDateInput = document.getElementById('task-input-date');
    const priorityInput = document.getElementById('priority-select');
    const addTaskButton = document.querySelector('.add-task-button');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function renderTaskList()
    {
        let taskListHTML = '';
        tasks.forEach(task => {
            console.log(task); 
            const taskHTML = `
                <li class="task-item" data-id="${task.id}">
                <span class="checkbox" ><input type="checkbox" ${task.completed ? 'checked' : ''}></span>
                <span class="task-title ${task.completed?'completed':''}">${task.taskName}</span>
                <span class="task-due-date ${task.completed?'completed':''}">${task.dueDate}</span>
                <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                </li>
            `
            taskListHTML += taskHTML;
        });
    
        taskList.innerHTML = taskListHTML;
    
    };

    function anotherRenderTaskList(anotherlist)
    {
        let taskListHTML = '';
        anotherlist.forEach(task => {
            console.log(task);
            const taskHTML = `
                <li class="task-item" data-id="${task.id}">
                <span class="checkbox" ><input type="checkbox" ${task.completed ? 'checked' : ''}></span>
                <span class="task-title ${task.completed?'completed':''}" autofill="off">${task.taskName}</span>
                <span class="task-due-date ${task.completed?'completed':''}">${task.dueDate}</span>
                <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                </li>
            `
            taskListHTML += taskHTML;
        });
    
        taskList.innerHTML = taskListHTML;
    
    };

    function deleteTask(taskId)
    {
        tasks = tasks.filter(task => task.id !== parseInt(taskId));
        localStorage.setItem('tasks',JSON.stringify(tasks));
        renderTaskList();
    };

    function editTask(taskId)
    {
        const index = tasks.findIndex(task => task.id === parseInt(taskId));
        const taskToEdit = tasks[index];

        taskNameInput.value = taskToEdit.taskName;
        dueDateInput.value = taskToEdit.dueDate;
        priorityInput.value = taskToEdit.priority;

        deleteTask(taskId);
    };

    
    addTaskButton.addEventListener('click',() => {

        const taskName = taskNameInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

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

    });


    taskList.addEventListener('click',(e) => {
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
                // console.log('You got in!!!!');
                const task = tasks.find(task => task.id === parseInt(taskId));
                task.completed = e.target.checked;
                localStorage.setItem('tasks',JSON.stringify(tasks));
                renderTaskList();
            }

    });

    filterButtons.forEach(button => {
        button.addEventListener('click',() => {
            const filter = button.dataset.filter;
            if(filter === 'all')
                renderTaskList();
            else {
                const filteredTasks = tasks.filter(task => task.completed === (filter === 'completed'));
                anotherRenderTaskList(filteredTasks);
            }
        })
    })

    sortButtons.forEach(button => {
        button.addEventListener('click',() => {
            const tasks2 = tasks.filter(task => task.taskName !== '' );
            console.log(tasks2);
            const criteria = button.dataset.filter;
            if(criteria === 'priority')
                {
                    tasks2.sort((a,b) => a.priority.localeCompare(b.priority));
                    anotherRenderTaskList(tasks2);
                }
            else{
                    tasks2.sort((a,b)=> Date.parse(a.dueDate) - Date.parse(b.dueDate));
                    anotherRenderTaskList(tasks2);
            }
        })
    })


renderTaskList();

});

