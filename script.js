document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas do Local Storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    };

    // Salvar tarefas no Local Storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Criar o elemento da tarefa na lista
    const createTaskElement = (taskText, isCompleted = false) => {
        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);

        // Evento para marcar como concluída
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Evento para excluir a tarefa
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o evento de clique na li seja acionado
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    };

    // Adicionar uma nova tarefa
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});