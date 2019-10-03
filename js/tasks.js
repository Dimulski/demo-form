axios.get('https://jsonplaceholder.typicode.com/todos')
.then(response => {
    const taskField = document.getElementById("task-field");
    response.data.filter(task => task.id > 0 && task.id < 10).forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = task.completed ? "card completed" : "card in-progress";
        taskCard.innerHTML =
        `<div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text ${task.completed ? "text-success" : "text-danger"}">
            ${task.completed ? "Completed" : "In progress"}</p>
        </div>`;
        taskField.appendChild(taskCard);
    });
});
